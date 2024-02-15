import React from 'react'
import { Divider, Stack, Typography } from '@mui/material'
import { Stepper } from '../components/Stepper'
import redis from '@/app/utils/redis'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { redirect } from 'next/navigation'
import { LandingSummary } from './components/LandingSummary'
import { IncludedWithYourPurchase } from '../../components/IncludedWithYourPurchase'
import { StripeCheckout } from '../../components/checkout/StripeCheckout'

export default async function Checkout() {
  const s3 = process.env.AWS_LANDING_S3
  const session = await getServerSession(authOptions)

  if (!session) redirect('/products/landing-page/design')

  const cache = await redis.hgetall(session.user.id)

  if (cache.HEADSHOT_FILE) await redis.expire(session.user.id, 300)
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
            <LandingSummary s3={s3} />
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
          <StripeCheckout />
        </Stack>
      </Stack>
    </Stack>
  )
}
