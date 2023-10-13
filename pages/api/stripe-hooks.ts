import { NextApiRequest, NextApiResponse } from "next"
import { buffer } from "micro"
import { Prisma } from "@prisma/client"
import { ProjectEnvVariableInput, VercelProjectInput } from "@/context/shoppingCart"
import {
  cloneRepo,
  createBlob,
  createCommit,
  createTree,
  getMainTree,
  pushCommit,
} from "@/services/github"
import { createProject } from "@/services/vercel"
import prisma from "@/utils/prisma"

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

const gitRepository = (projectName: string) => {
  return {
    repo: projectName,
    type: "github",
  }
}

const framework = "nextjs"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const sig = req.headers["stripe-signature"]
    const reqBuffer = await buffer(req)

    let event

    try {
      event = stripe.webhooks.constructEvent(reqBuffer, sig, endpointSecret)
    } catch (err: any) {
      res.status(400).send(`Webhook Error: ${err.message}`)
      return
    }

    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntentSucceeded = event.data.object
        console.log("payment intent succeeded")
        console.log(paymentIntentSucceeded)

        break
      case "charge.succeeded":
        const CHARGE_SUCCEEDED = event.data.object

        const orderId = CHARGE_SUCCEEDED.metadata.orderId

        const order = await prisma.order.findFirst({
          where: { id: orderId },
        })

        const METADATA = order?.metadata as Prisma.JsonObject

        const EXTENSION = String(METADATA?.headshotExtension)
        const CLIENT_NAME = String(METADATA?.clientName)
        const PROJECT_NAME = String(METADATA?.projectName)
        const ENVIRONMENT_VARIABLES =
          METADATA?.environmentVariables as Prisma.JsonArray as unknown as ProjectEnvVariableInput[]

        let vercelApp: string = PROJECT_NAME
        let githubProject: string = PROJECT_NAME

        const HEADSHOT_URL = `${process.env.AWS_LANDING_S3}/${order?.id}.${EXTENSION}`

        let attempts = 0

        const clone = async (): Promise<any> =>
          cloneRepo(
            `${PROJECT_NAME}${attempts > 0 ? `-${attempts}` : ""}`,
            CLIENT_NAME
          ).catch(async (err) => {
            console.log(1, "catch", err)
            if (err.status === 422) {
              attempts += 1
              return clone()
            } else return err
          })

        // 1. clone landing repo
        const cloneRes = await clone()

        let project: VercelProjectInput = {} as VercelProjectInput

        // 2. create new vercel project
        let createProjectRes
        if (cloneRes.status === 201) {
          githubProject = cloneRes.data.name

          project = {
            name: cloneRes.data.name,
            framework,
            gitRepository: gitRepository(cloneRes.data.full_name),
            environmentVariables: [
              ...ENVIRONMENT_VARIABLES,
              {
                key: "OG_IMAGE",
                target: "production",
                type: "encrypted",
                value: HEADSHOT_URL,
              },
              {
                key: "NEXT_PUBLIC_PROJECT_NAME",
                target: "production",
                type: "encrypted",
                value: cloneRes.data.name,
              },
            ],
          }

          createProjectRes = await createProject(project).catch((err) => {
            console.log(2, "catch", err)
            return err
          })
        } else console.log("else", 1, cloneRes)

        // fetch headshot from s3
        const headshotReq = await fetch(HEADSHOT_URL, { method: "get" })
        const blob = await headshotReq.blob()
        const buffer = Buffer.from(await blob.arrayBuffer())
        const headshotBase64 = buffer.toString("base64")

        // 3. create blob of headshot
        let blobShaRes
        if (createProjectRes.status === 200) {
          const projectData = await createProjectRes.json()
          vercelApp = projectData.name

          blobShaRes = await createBlob(githubProject, headshotBase64).catch(
            (err) => {
              console.log(3, "catch", err)
              return err
            }
          )
        } else console.log("else", 2, await createProjectRes.json())

        const main = async (): Promise<any> =>
          getMainTree(githubProject).catch(async (err) => {
            console.log(4, "catch", err)
            if (err.status === 404) {
              return main()
            } else return err
          })

        // 4. get main tree sha
        let mainTreeShaRes
        if (blobShaRes.status === 201)
          mainTreeShaRes = await main().catch((err) => {
            console.log(4, "catch", err)
            return err
          })
        else console.log("else", 3, blobShaRes)

        // 5. create tree with headshot file
        let newTreeShaRes
        if (mainTreeShaRes.status === 200)
          newTreeShaRes = await createTree(
            githubProject,
            mainTreeShaRes.data.commit.sha,
            `headshot.${EXTENSION}`,
            blobShaRes.data.sha
          ).catch((err) => {
            console.log(5, "catch", err)
            return err
          })
        else console.log("else", 4, mainTreeShaRes)

        // 6. create commit to new repo
        let newCommitShaRes
        if (newTreeShaRes.status === 201)
          newCommitShaRes = await createCommit(
            githubProject,
            mainTreeShaRes.data.commit.sha,
            newTreeShaRes.data.sha
          ).catch((err) => {
            console.log(6, "catch", err)
            return err
          })
        else console.log("else", 5, newTreeShaRes)

        // 7. push commit to deploy vercel project
        if (newCommitShaRes.status === 201)
          await pushCommit(githubProject, newCommitShaRes.data.sha).catch((err) => {
            console.log(7, "catch", err)
            return err
          })
        else console.log("else", 6, newCommitShaRes)

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
      case "payment_intent.created":
        const paymentIntentCreated = event.data.object
        console.log("payment intent created")

        break
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`)
    }

    res.status(200).send("event received")
  } else {
    res.setHeader("Allow", "POST")
    res.status(405).end("Method Not Allowed")
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
}
