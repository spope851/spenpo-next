import React from 'react'
import { Divider, Link, Stack, Typography } from '@mui/material'
import { Stepper } from '../components/Stepper'
import redis from '@/app/utils/redis'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { redirect } from 'next/navigation'
import { LandingSummary } from './components/LandingSummary'
import { IncludedWithYourPurchase } from './components/IncludedWithYourPurchase'
import { StripeCheckout } from './components/StripeCheckout'

export default async function Checkout() {
  const session = await getServerSession(authOptions)

  if (!session) redirect('/products/landing-page/design')

  const cache = await redis.hgetall(String(session.user.email))

  if (Object.keys(cache).length > 0)
    await redis.expire(String(session.user.email), 300)
  else redirect('/products/landing-page/design')

  return (
    <Stack rowGap={1} m={{ xs: 2, sm: 5 }}>
      <Stepper activeStep={3} />
      <Stack
        direction={{ xl: 'row', lg: 'row', md: 'row' }}
        justifyContent="space-around"
        mt={5}
      >
        <Stack gap={3}>
          <Typography variant="h4">Checkout</Typography>
          <Stack gap={1}>
            <Typography variant="h5">Order summary</Typography>
            <LandingSummary />
          </Stack>
          <Stack gap={1}>
            <Typography variant="h5">Contact information</Typography>
            <Typography>{session.user.name}</Typography>
            <Typography>{session.user.email}</Typography>
          </Stack>
        </Stack>
        <Divider
          sx={{ display: { md: 'block', sm: 'none' } }}
          orientation="vertical"
          flexItem
        />
        <Stack gap={3} my={5}>
          <IncludedWithYourPurchase />
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
          <StripeCheckout />
        </Stack>
      </Stack>
    </Stack>
  )
}
