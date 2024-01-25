'use client'
import React, { useContext, useEffect, useState } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { ShoppingCartContext } from '@/app/context/shoppingCart'
import { usePathname, useRouter } from 'next/navigation'
import { CheckoutForm } from './CheckoutForm'

const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export const StripeCheckout: React.FC = () => {
  const { paymentIntentMetadata, landingCms } = useContext(ShoppingCartContext)

  const [clientSecret, setClientSecret] = useState('')

  const router = useRouter()
  const pathname = usePathname()

  const file = landingCms?.headshotFile.getter()

  useEffect(() => {
    if (!clientSecret) {
      // Create PaymentIntent as soon as the page loads
      ;(async () => {
        const paymentIntent = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            productId: pathname?.split('/')[2],
            metadata: paymentIntentMetadata,
          }),
        })

        let paymentIntentRes

        if (paymentIntent.status === 200)
          paymentIntentRes = await paymentIntent.json()
        else router.replace('design')

        if (paymentIntentRes) {
          setClientSecret(paymentIntentRes.clientSecret)
          const signedS3Url = await fetch(
            `/api/get-signed-s3-url?filename=${paymentIntentRes.id}.${file?.name
              .split('.')
              .at(-1)}&filetype=${file?.type}`,
            {
              method: 'get',
            }
          )

          const signedS3UrlRes = await signedS3Url.json()

          await fetch(signedS3UrlRes.url, {
            method: 'put',
            headers: { 'Content-Type': file?.type || '' },
            body: file,
          })
        }
      })()
    }
  }, [clientSecret, file, paymentIntentMetadata, pathname]) //eslint-disable-line react-hooks/exhaustive-deps

  const appearance: { theme: 'stripe' | 'night' | 'flat' | undefined } = {
    theme: 'stripe',
  }
  const options = {
    clientSecret,
    appearance,
  }

  if (clientSecret)
    return (
      <Elements stripe={stripe} options={options}>
        <CheckoutForm />
      </Elements>
    )
}
