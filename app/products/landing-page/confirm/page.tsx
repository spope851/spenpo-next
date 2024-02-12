import React from 'react'
import { Box, CircularProgress, Stack, Typography } from '@mui/material'
import { redirect } from 'next/navigation'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import prisma from '@/app/utils/prisma'
import Stripe from 'stripe'
import Link from 'next/link'
import { PageProps } from '@/app/types/app'
import { Prisma } from '@prisma/client'
import { ViewYourSitesBtn } from '../../components/confirm/ViewYourSitesBtn'
import { OrderPreview } from '../../components/confirm/OrderPreview'
import redis from '@/app/utils/redis'
import { getProject } from '@/app/services/vercel'
import { revalidatePath } from 'next/cache'
import { RevalidateBtn } from '../../components/confirm/RevalidateBtn'

export type SSROrder = {
  id: string
  userId: string
  productId: string
  metadata: Prisma.JsonValue
  complete: boolean
  error: Prisma.JsonValue
  environment: string
}

type Metadata = {
  projectName: { vercelApp: string }
}

export default async function Confirm({ searchParams }: PageProps) {
  let ssrOrder: SSROrder = {} as SSROrder
  const session = await getServerSession(authOptions)
  let imageB64 = ''
  let domains: string[] = []
  if (session) {
    // This is your test secret API key.
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
      apiVersion: '2023-08-16',
    })
    if (!stripe) redirect(`/products/landing-page`)

    const paymentIntentId = searchParams.payment_intent?.toString()

    if (!paymentIntentId) redirect(`/products/landing-page`)

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)
    const orderId = paymentIntent.metadata.orderId

    if (orderId) {
      const order = await prisma.order.findFirst({
        where: { userId: session.user.id, productId: 'landing-page', id: orderId },
      })

      if (order) {
        ssrOrder = order
        const cache = await redis.hgetall(session.user.id)
        if (cache.HEADSHOT_FILE) {
          imageB64 = cache.HEADSHOT_FILE
        }
        const projectReq = await getProject(
          (order.metadata as unknown as Metadata).projectName.vercelApp
        )
        const project = await projectReq.json()

        domains = project?.targets?.production?.alias
      } else redirect(`/products/landing-page`)
    } else redirect(`/products/landing-page`)
  } else redirect(`/products/landing-page`)

  return (
    <Stack rowGap={3} m="auto">
      {!ssrOrder.error && !ssrOrder.complete && (
        <Stack m="auto">
          <CircularProgress />
        </Stack>
      )}
      {ssrOrder.error && (
        <Typography color="red" maxWidth={300}>
          Something went wrong. Please <Link href="/contact">contact support</Link>{' '}
          with your order number: #{ssrOrder.id}
        </Typography>
      )}
      {ssrOrder.complete && (
        <>
          <Typography variant="h4" textAlign="center">
            Congratulations
          </Typography>
          <Typography variant="h5" textAlign="center">
            Your website is being deployed and will be available shortly at the
            following URLs:
          </Typography>
          <Box mx="auto">
            {domains.length > 0 ? (
              <Box component="ul">
                {domains.map((domain) => (
                  <Typography key={domain} component="li" variant="subtitle2">
                    {domain}
                  </Typography>
                ))}
              </Box>
            ) : (
              <Stack gap={3} direction="row" alignItems="center">
                <Typography>Data is populating. Click here to refresh:</Typography>
                <RevalidateBtn
                  revalidate={async () => {
                    'use server'
                    revalidatePath('/products/landing-page/confirm')
                  }}
                />
              </Stack>
            )}
          </Box>
          <Typography textAlign="center">See below for details</Typography>
          <Box mx="auto">
            <OrderPreview
              ssrOrder={ssrOrder}
              imageB64={imageB64}
              revalidate={async () => {
                'use server'
              }}
            />
          </Box>
        </>
      )}
      <ViewYourSitesBtn />
      <Typography textAlign="center">
        Need help? Please <Link href="/contact">contact us</Link> for support
      </Typography>
    </Stack>
  )
}
