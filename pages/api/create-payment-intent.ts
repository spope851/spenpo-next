import prisma from "@/utils/prisma"
import { NextApiRequest, NextApiResponse } from "next"

// This is your test secret API key.
const stripe = require("stripe")(
  process.env.NODE_ENV === "production"
    ? process.env.STRIPE_SECRET_KEY
    : "sk_test_51Njln3I7AtbqQ3LrfbzfcWBsW2TQgtmAT0niTPS8j3N07TnkIYmdseeWFx0zVz8KWPyO7TlSTIrhH8mGyIsNJyQk00qY3wI2mk"
)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { metadata, userId, productId } = req.body

  const product = await prisma.product.findUnique({ where: { id: productId } })

  const order = await prisma.order.create({
    data: {
      user: {
        connect: { id: userId },
      },
      metadata,
      product: {
        connect: {
          id: productId,
        },
      },
    },
  })

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: product?.price,
    currency: "usd",
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
