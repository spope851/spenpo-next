import React, { useContext, useEffect, useState } from 'react'
import { Divider, Stack, Typography } from '@mui/material'
import { ShoppingCartContext } from '@/context/shoppingCart'
import { LandingSummary } from '@/components/products/landing-page/checkout/landingSummary'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { CheckoutForm } from '@/components/products/landing-page/checkout/checkoutForm'
import { useSession } from 'next-auth/react'
import { LandingStepper } from '@/components/products/landing-page/stepper'
import { useRouter } from 'next/router'
import CheckIcon from '@mui/icons-material/Check'
import Link from 'next/link'

const Check = () => <CheckIcon color="success" />

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
          }),
        })
          .then((res) => {
            if (res.status === 200) return res.json()
            else router.replace('design')
          })
          .then(async (data): Promise<void> => {
            if (data) {
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
            }
          }))()
    }
  }, [clientSecret, file, paymentIntentMetadata, router.pathname])

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
        <Stack gap={3}>
          <Typography variant="h2">Checkout</Typography>
          <Stack gap={1}>
            <Typography variant="h5">Order summary</Typography>
            <LandingSummary />
          </Stack>
          <Stack gap={1}>
            <Typography variant="h5">Contact information</Typography>
            <Typography>{session.data?.user.name}</Typography>
            <Typography>{session.data?.user.email}</Typography>
          </Stack>
        </Stack>
        <Divider
          sx={{ display: { md: 'block', sm: 'none' } }}
          orientation="vertical"
          flexItem
        />
        <Stack gap={3} my={5}>
          <Typography variant="h5">Included with your purchase</Typography>
          <Stack rowGap={1}>
            <Stack direction="row" justifyContent="space-between">
              <Check />
              <Typography variant="subtitle2">Support via email</Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Check />
              <Typography variant="subtitle2">Ad-free experience</Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Check />
              <Typography variant="subtitle2">
                14-day money back guarantee
              </Typography>
            </Stack>
            <Divider flexItem />
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="subtitle2">Domain</Typography>
              <Typography variant="subtitle2">Free</Typography>
            </Stack>
            <Divider flexItem />
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="subtitle2">Website</Typography>
              <Typography variant="subtitle2">$0.99</Typography>
            </Stack>
            <Divider flexItem />
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="subtitle2">Subtotal</Typography>
              <Typography variant="subtitle2">$0.99</Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="subtitle2">Tax</Typography>
              <Typography variant="subtitle2">$0</Typography>
            </Stack>
            <Divider flexItem />
            <Stack direction="row" justifyContent="space-between">
              <Typography>Total</Typography>
              <Typography>$0.99</Typography>
            </Stack>
          </Stack>
          <Typography variant="h5">Payment method</Typography>
          <Stack gap={1}>
            <Typography variant="h6">By checking out:</Typography>
            <Typography variant="subtitle2" maxWidth={{ xs: 'unset', md: 300 }}>
              You understand that there are currently no legal{' '}
              <Link href="/products/landing-page/tos">Terms of service</Link> for
              this version of the product, and that refunds will be issued upon
              request <Link href="/contact">via email</Link> within the 14-day
              guarantee period.
            </Typography>
          </Stack>
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
