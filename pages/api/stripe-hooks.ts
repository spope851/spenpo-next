/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiRequest, NextApiResponse } from 'next'
import { buffer } from 'micro'
import { Prisma } from '@prisma/client'
import {
  ProjectEnvVariableInput,
  VercelProjectInput,
} from '@/app/context/shoppingCart'
import {
  cloneRepo,
  createBlob,
  createCommit,
  createTree,
  getMainTree,
  pushCommit,
} from '@/app/services/github'
import {
  addDomainToProject,
  createProject,
  purchaseDomain,
} from '@/app/services/vercel'
import prisma from '@/app/utils/prisma'
import Stripe from 'stripe'

// This is your test secret API key.
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-08-16',
})

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

const gitRepository = (projectName: string) => {
  return {
    repo: projectName,
    type: 'github',
  }
}

const framework = 'nextjs'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const sig = req.headers['stripe-signature']
    const reqBuffer = await buffer(req)

    let event

    try {
      if (sig) event = stripe.webhooks.constructEvent(reqBuffer, sig, endpointSecret)
    } catch (err: any) {
      res.status(400).send(`Webhook Error: ${err.message}`)
      return
    }

    switch (event?.type) {
      case 'payment_intent.succeeded':
        const paymentIntentSucceeded = event.data.object
        console.log('payment intent succeeded')
        console.log(paymentIntentSucceeded)

        break
      case 'charge.succeeded':
        const CHARGE_SUCCEEDED = event.data.object

        const orderId = CHARGE_SUCCEEDED.metadata.orderId

        const order = await prisma.order.findFirst({
          where: { id: orderId },
        })

        const METADATA = order?.metadata as Prisma.JsonObject

        const EXTENSION = String(METADATA?.headshotExtension)
        const CLIENT_NAME = String(METADATA?.clientName)
        const PROJECT_NAME = String(METADATA?.projectName)
        const DOMAIN_NAME = String(METADATA?.domainName)
        const DOMAIN_PRICE = Number(METADATA?.price) / 100
        const DOMAIN_RENEW = Boolean(METADATA?.renew)
        const ENVIRONMENT_VARIABLES =
          METADATA?.environmentVariables as Prisma.JsonArray as unknown as ProjectEnvVariableInput[]

        let vercelApp: string = PROJECT_NAME
        let githubProject: string = PROJECT_NAME

        const HEADSHOT_URL = `${process.env.AWS_LANDING_S3}/${order?.id}.${EXTENSION}`

        const IS_DOMAIN_PURCHASE = !DOMAIN_NAME.endsWith('.vercel.app')

        // 1. purchase domain
        if (IS_DOMAIN_PURCHASE) {
          try {
            await purchaseDomain(DOMAIN_NAME, DOMAIN_PRICE, DOMAIN_RENEW)
          } catch (err: any) {
            console.log(1, 'catch', err.error)
            await prisma.order.update({
              where: { id: orderId },
              data: {
                metadata: {
                  clientName: CLIENT_NAME,
                },
                error: {
                  step: 1,
                  ...err.error,
                },
              },
            })
            break
          }
        }

        // 2. clone landing repo
        let attempts = 0

        const clone = async (): Promise<any> => {
          try {
            return await cloneRepo(
              `${PROJECT_NAME}${attempts > 0 ? `-${attempts}` : ''}`,
              CLIENT_NAME
            )
          } catch (err: any) {
            console.log(2, 'catch', err.response.data)
            if (err.status === 422) {
              attempts += 1
              return await clone()
            } else return err
          }
        }
        let cloneRes

        try {
          cloneRes = await clone()
        } catch (err: any) {
          await prisma.order.update({
            where: { id: orderId },
            data: {
              metadata: {
                clientName: CLIENT_NAME,
              },
              error: {
                step: 2,
                ...err.response.data,
                body: err.request.body,
              },
            },
          })
          break
        }

        // 3. create new vercel project
        let createProjectRes
        githubProject = cloneRes.data.name

        const project: VercelProjectInput = {
          name: cloneRes.data.name,
          framework,
          gitRepository: gitRepository(cloneRes.data.full_name),
          environmentVariables: [
            ...ENVIRONMENT_VARIABLES,
            ...[
              'GH_TOKEN',
              'VERCEL_TOKEN',
              'VERCEL_TEAM',
              'AWS_ACCESS_KEY_ID',
              'AWS_SECRET_ACCESS_KEY',
              'AWS_LANDING_S3',
            ].map((v) => {
              return {
                key: v,
                target: 'production',
                type: 'encrypted',
                value: process.env[v],
              }
            }),
            {
              key: 'NEXT_PUBLIC_PROJECT_NAME',
              target: 'production',
              type: 'encrypted',
              value: cloneRes.data.name,
            },
          ],
        }

        try {
          createProjectRes = await createProject(project)
        } catch (err: any) {
          console.log(3, 'catch', err.error)
          await prisma.order.update({
            where: { id: orderId },
            data: {
              metadata: {
                ...(project as unknown as Prisma.JsonObject),
                projectName: { vercelApp, githubProject },
                clientName: CLIENT_NAME,
              },
              error: {
                step: 3,
                ...err.error,
              },
            },
          })
          break
        }

        const projectData = await createProjectRes.json()
        vercelApp = projectData.name

        // 4. add domain to project
        if (IS_DOMAIN_PURCHASE) {
          // add www domain
          try {
            await addDomainToProject(vercelApp, `www.${DOMAIN_NAME}`)
          } catch (err: any) {
            console.log(4, 'catch', err.response.data)
            await prisma.order.update({
              where: { id: orderId },
              data: {
                metadata: {
                  ...(project as unknown as Prisma.JsonObject),
                  projectName: { vercelApp, githubProject },
                  clientName: CLIENT_NAME,
                },
                error: {
                  step: 4,
                  ...err.error,
                },
              },
            })
            break
          }

          // add domain redirect
          try {
            await addDomainToProject(
              vercelApp,
              DOMAIN_NAME,
              `www.${DOMAIN_NAME}`,
              308
            )
          } catch (err: any) {
            console.log(4, 'catch', err.response.data)
            await prisma.order.update({
              where: { id: orderId },
              data: {
                metadata: {
                  ...(project as unknown as Prisma.JsonObject),
                  projectName: { vercelApp, githubProject },
                  clientName: CLIENT_NAME,
                },
                error: {
                  step: 4,
                  ...err.error,
                },
              },
            })
            break
          }
        }

        // fetch headshot from s3
        const headshotReq = await fetch(HEADSHOT_URL, { method: 'get' })
        const blob = await headshotReq.blob()
        const buffer = Buffer.from(await blob.arrayBuffer())
        const headshotBase64 = buffer.toString('base64')

        // 5. create blob of headshot
        let blobShaRes

        try {
          blobShaRes = await createBlob(githubProject, headshotBase64)
        } catch (err: any) {
          console.log(5, 'catch', err.response.data)
          await prisma.order.update({
            where: { id: orderId },
            data: {
              metadata: {
                ...(project as unknown as Prisma.JsonObject),
                projectName: { vercelApp, githubProject },
                clientName: CLIENT_NAME,
              },
              error: {
                step: 5,
                ...err.response.data,
                body: err.request.body,
              },
            },
          })
          break
        }

        // 6. get main tree sha
        const main = async (): Promise<any> => {
          try {
            return await getMainTree(githubProject)
          } catch (err: any) {
            console.log(6, 'catch', err.response.data)
            if (err.status === 404) {
              return await main()
            } else return err
          }
        }

        let mainTreeShaRes

        try {
          mainTreeShaRes = await main()
        } catch (err: any) {
          await prisma.order.update({
            where: { id: orderId },
            data: {
              metadata: {
                ...(project as unknown as Prisma.JsonObject),
                projectName: { vercelApp, githubProject },
                clientName: CLIENT_NAME,
              },
              error: {
                step: 6,
                ...err.response.data,
              },
            },
          })
          break
        }

        // 7. create tree with headshot file
        let newTreeShaRes

        try {
          newTreeShaRes = await createTree(
            githubProject,
            mainTreeShaRes.data.commit.sha,
            `headshot.${EXTENSION}`,
            blobShaRes.data.sha
          )
        } catch (err: any) {
          console.log(7, 'catch', err.response.data)
          await prisma.order.update({
            where: { id: orderId },
            data: {
              metadata: {
                ...(project as unknown as Prisma.JsonObject),
                projectName: { vercelApp, githubProject },
                clientName: CLIENT_NAME,
              },
              error: {
                step: 7,
                ...err.response.data,
                body: err.request.body,
              },
            },
          })
          break
        }

        // 8. create commit to new repo
        let newCommitShaRes

        try {
          newCommitShaRes = await createCommit(
            githubProject,
            mainTreeShaRes.data.commit.sha,
            newTreeShaRes.data.sha
          )
        } catch (err: any) {
          console.log(8, 'catch', err.response.data)
          await prisma.order.update({
            where: { id: orderId },
            data: {
              metadata: {
                ...(project as unknown as Prisma.JsonObject),
                projectName: { vercelApp, githubProject },
                clientName: CLIENT_NAME,
              },
              error: {
                step: 8,
                ...err.response.data,
                body: err.request.body,
              },
            },
          })
          break
        }

        // 9. push commit to deploy vercel project
        try {
          await pushCommit(githubProject, newCommitShaRes.data.sha)
        } catch (err: any) {
          console.log(9, 'catch', err.response.data)
          await prisma.order.update({
            where: { id: orderId },
            data: {
              metadata: {
                ...(project as unknown as Prisma.JsonObject),
                projectName: { vercelApp, githubProject },
                clientName: CLIENT_NAME,
              },
              error: {
                step: 9,
                ...err.response.data,
                body: err.request.body,
              },
            },
          })
          break
        }

        await prisma.order.update({
          where: { id: orderId },
          data: {
            metadata: {
              ...(project as unknown as Prisma.JsonObject),
              projectName: { vercelApp, githubProject },
              clientName: CLIENT_NAME,
            },
            complete: true,
          },
        })
        break

      case 'payment_intent.created':
        console.log('payment intent created')

        break
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event?.type}`)
    }

    res.status(200).send('event received')
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
}
