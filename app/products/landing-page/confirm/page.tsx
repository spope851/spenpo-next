import React from 'react'
import { Stack, Typography } from '@mui/material'
import { redirect } from 'next/navigation'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import prisma from '@/app/utils/prisma'
import Stripe from 'stripe'
import Link from 'next/link'
import { PageProps } from '@/app/types/app'
import { Prisma } from '@prisma/client'
import { ViewYourSitesBtn } from './components/ViewYourSitesBtn'
import { Order } from './components/Order'

export type SSROrder = {
  id: string
  userId: string
  productId: string
  metadata: Prisma.JsonValue
  complete: boolean
  error: Prisma.JsonValue
  environment: string
}

export default async function Confirm({ searchParams }: PageProps) {
  let ssrOrder: SSROrder = {} as SSROrder
  let s3 = ''
  const session = await getServerSession(authOptions)
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
        where: { userId: session.user.id, id: orderId },
      })
      if (order) {
        ssrOrder = order
        s3 = process.env.AWS_LANDING_S3 || ''
      } else redirect(`/products/landing-page`)
    } else redirect(`/products/landing-page`)
  } else redirect(`/products/landing-page`)

  return (
    <Stack rowGap={3} m="auto">
      <Order ssrOrder={ssrOrder} s3={s3} />
      <ViewYourSitesBtn />
      <Typography textAlign="center">
        Need help? Please <Link href="/contact">contact us</Link> for support
      </Typography>
    </Stack>
  )
}
