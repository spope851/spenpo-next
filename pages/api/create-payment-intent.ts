import prisma from '@/utils/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import Stripe from 'stripe'
import { authOptions } from './auth/[...nextauth]'

// This is your test secret API key.
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-08-16',
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { metadata, productId } = req.body
  const session = await getServerSession(req, res, authOptions)

  const product = await prisma.product.findUnique({ where: { id: productId } })

  const order = await prisma.order.create({
    data: {
      user: {
        connect: { id: session.user.id },
      },
      metadata,
      product: {
        connect: {
          id: productId,
        },
      },
      environment: process.env.NODE_ENV,
    },
  })

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: product!.price + Number(metadata.price),
    currency: 'usd',
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
    metadata: { orderId: order.id },
  })

  res.send({
    clientSecret: paymentIntent.client_secret,
    id: order.id,
  })
}
