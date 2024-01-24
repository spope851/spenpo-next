import React from 'react'
import { Stack, Typography } from '@mui/material'
import { Stepper } from '@/app/products/landing-page/components/Stepper'
import redis from '@/utils/redis'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { redirect } from 'next/navigation'
import { CheckoutBtn } from './components/CheckoutBtn'
import { PasswordForm } from './components/PasswordForm'

export default async function Password() {
  const session = await getServerSession(authOptions)

  const cache = await redis.hgetall(String(session.user.email))

  if (Object.keys(cache).length > 0)
    await redis.expire(String(session?.user.email), 300)
  else redirect('/products/landing-page/design')

  return (
    <Stack gap={5} flex={1} justifyContent="flex-start" m={{ xs: 2, sm: 5 }}>
      <Stack>
        <Stepper activeStep={2} />
      </Stack>
      <Stack
        justifyContent="space-between"
        direction={{ xs: 'column', sm: 'row' }}
        gap={1}
      >
        <Typography variant="h5">
          Choose a secure password for accessing admin features on your site
        </Typography>
        <CheckoutBtn />
      </Stack>
      <Stack flex={1} justifyContent="flex-start" gap={1} alignItems="center">
        <PasswordForm />
      </Stack>
    </Stack>
  )
}
