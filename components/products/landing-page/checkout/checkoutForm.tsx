import React, { FormEvent } from 'react'
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { Layout, LayoutObject } from '@stripe/stripe-js'
import { Box, Button, Stack } from '@mui/material'
import { useSession } from 'next-auth/react'

export const CheckoutForm: React.FC = () => {
  const stripe = useStripe()
  const elements = useElements()

  const session = useSession()
  const [message, setMessage] = React.useState<string | null | undefined>(null)
  const [isLoading, setIsLoading] = React.useState(false)

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
        return_url: `${window?.location.origin}${
          window?.location.pathname.split('/checkout')[0]
        }/confirm`,
      },
    })

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message)
    } else {
      setMessage('An unexpected error occurred.')
    }

    setIsLoading(false)
  }

  const layout: Layout | LayoutObject | undefined = 'tabs'
  const paymentElementOptions = {
    layout,
  }

  return (
    <Stack component="form" id="payment-form" onSubmit={handleSubmit} rowGap={1}>
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <Button
        type="submit"
        id="submit"
        variant="contained"
        disabled={!!(session.status !== 'authenticated') || isLoading}
      >
        {isLoading ? '...processing' : 'checkout'}
      </Button>
      {/* Show any error or success messages */}
      {message && <Box id="payment-message">{message}</Box>}
      <Button variant="contained" href="design" disabled={isLoading}>
        cancel
      </Button>
    </Stack>
  )
}
