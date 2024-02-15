import { getProviders } from 'next-auth/react'
import { getServerSession } from 'next-auth/next'
import { Stack, Typography, Divider } from '@mui/material'
import React from 'react'
import { PageProps } from '@/app/types/app'
import { redirect } from 'next/navigation'
import { ProviderBtn } from '../components/ProviderBtn'
import { authOptions } from '@/app/constants/api'

export default async function Signin({ searchParams }: PageProps) {
  const session = await getServerSession(authOptions)

  if (session) redirect('/home')

  const providers = (await getProviders()) || []
  const redirectPath = `${searchParams.redirect}?cache=${searchParams.redisId}`

  return (
    <Stack gap={1} m="auto" textAlign="center">
      <Typography variant="h5">Welcome</Typography>
      <Divider flexItem />
      {Object.values(providers).map((provider) => (
        <ProviderBtn key={provider.id} redirectPath={redirectPath} {...provider} />
      ))}
    </Stack>
  )
}
