import React, { FormEvent, useContext } from "react"
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js"
import { Layout, LayoutObject } from "@stripe/stripe-js"
import { Box, Button, Stack } from "@mui/material"
import { useSession } from "next-auth/react"
import { ShoppingCartContext } from "@/context/shoppingCart"

export const CheckoutForm: React.FC = () => {
  const stripe = useStripe()
  const elements = useElements()

  const [email, setEmail] = React.useState("")
  const [message, setMessage] = React.useState<string | null | undefined>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const session = useSession()
  const { passwordSet } = useContext(ShoppingCartContext)

  React.useEffect(() => {
    if (!stripe) {
      return
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    )

    if (!clientSecret) {
      return
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case "succeeded":
          setMessage("Payment succeeded!")
          break
        case "processing":
          setMessage("Your payment is processing.")
          break
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.")
          break
        default:
          setMessage("Something went wrong.")
          break
      }
    })
  }, [stripe])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return
    }

    setIsLoading(true)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${
          process.env.NODE_ENV === "production"
            ? "https://spenpo.com"
            : "http://localhost:3000"
        }/products/landing-page/my-sites`,
      },
    })

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message)
    } else {
      setMessage("An unexpected error occurred.")
    }

    setIsLoading(false)
  }

  const layout: Layout | LayoutObject | undefined = "tabs"
  const paymentElementOptions = {
    layout,
  }

  return (
    <Stack component="form" id="payment-form" onSubmit={handleSubmit} rowGap={1}>
      <LinkAuthenticationElement
        id="link-authentication-element"
        onChange={(e) => setEmail(e.value.email)}
      />
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <Button
        type="submit"
        id="submit"
        variant="contained"
        disabled={!!(session.status !== "authenticated") || !passwordSet}
      >
        {isLoading ? "...processing" : "checkout"}
      </Button>
      {/* Show any error or success messages */}
      {message && <Box id="payment-message">{message}</Box>}
    </Stack>
  )
}
