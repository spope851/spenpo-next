import { NextApiRequest, NextApiResponse } from "next"

const stripe = require("stripe")(
  process.env.NODE_ENV === "production"
    ? process.env.STRIPE_SECRET_KEY
    : "sk_test_51Njln3I7AtbqQ3LrfbzfcWBsW2TQgtmAT0niTPS8j3N07TnkIYmdseeWFx0zVz8KWPyO7TlSTIrhH8mGyIsNJyQk00qY3wI2mk"
)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price:
              process.env.NODE_ENV === "production"
                ? "price_1NjmN4I7AtbqQ3LrOGqyaXfB"
                : "price_1NjmRiI7AtbqQ3LreMig7CWB",
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
        automatic_tax: { enabled: true },
      })
      res.redirect(303, session.url)
    } catch (err: any) {
      res.status(err.statusCode || 500).json(err.message)
    }
  } else {
    res.setHeader("Allow", "POST")
    res.status(405).end("Method Not Allowed")
  }
}
