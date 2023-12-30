import React, { useContext, useEffect, useState } from 'react'
import { Divider, Stack } from '@mui/material'
import { ShoppingCartContext } from '@/context/shoppingCart'
import { LandingSummary } from '@/components/products/landing-page/checkout/landingSummary'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { CheckoutForm } from '@/components/products/landing-page/checkout/checkoutForm'
import { useSession } from 'next-auth/react'
import { LandingStepper } from '@/components/products/landing-page/stepper'
import { useRouter } from 'next/router'

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

const Checkout: React.FC = () => {
  const session = useSession()
  const {
    paymentIntentMetadata,
    file: [file],
  } = useContext(ShoppingCartContext)

  const [clientSecret, setClientSecret] = useState('')

  const router = useRouter()

  useEffect(() => {
    if (!clientSecret) {
      // Create PaymentIntent as soon as the page loads
      ;(async () =>
        fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            productId: router.pathname.split('/')[2],
            metadata: paymentIntentMetadata,
            userId: session.data?.user.id,
          }),
        })
          .then((res) => res.json())
          .then(async (data): Promise<void> => {
            setClientSecret(data.clientSecret)
            await fetch(
              `/api/get-signed-s3-url?filename=${data.id}.${file?.name
                .split('.')
                .at(-1)}&filetype=${file?.type}`,
              {
                method: 'get',
              }
            ).then(async (res) => {
              const data = await res.json()
              await fetch(data.url, {
                method: 'put',
                headers: { 'Content-Type': file?.type || '' },
                body: file,
              })
            })
          }))()
    }
  }, [clientSecret, file, paymentIntentMetadata, router.pathname, session.data])

  const appearance: { theme: 'stripe' | 'night' | 'flat' | undefined } = {
    theme: 'stripe',
  }
  const options = {
    clientSecret,
    appearance,
  }

  return (
    <Stack rowGap={1} m={5}>
      <LandingStepper activeStep={3} />
      <Stack
        direction={{ xl: 'row', lg: 'row', md: 'row' }}
        justifyContent="space-around"
        mt={5}
      >
        <LandingSummary />
        <Divider
          sx={{ display: { md: 'block', sm: 'none' } }}
          orientation="vertical"
          flexItem
        />
        <Stack rowGap={1} my={5}>
          {clientSecret && (
            <Elements stripe={stripe} options={options}>
              <CheckoutForm />
            </Elements>
          )}
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Checkout
