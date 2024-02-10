import React from 'react'
import { Stack, Typography } from '@mui/material'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import { Breadcrumbs } from '@/app/components/breadcrumbs'
import prisma from '@/app/utils/prisma'
import { PageProps } from '@/app/types/app'
import { SelectDomain } from '@/app/products/components/SelectDomain'
import { CheckoutBtn } from './components/CheckoutBtn'
import { AppSelect } from './components/AppSelect'

export default async function Buy({ searchParams }: PageProps) {
  const session = await getServerSession(authOptions)
  let orders = []
  orders = await prisma.order.findMany({
    where: { userId: session.user.id, complete: true },
  })

  const d = searchParams.d ? String(searchParams.d) : ''

  return (
    <Stack m={{ xs: 2, sm: 5 }} gap={5} flex={1} justifyContent="flex-start">
      <Breadcrumbs />
      <Stack
        justifyContent="space-between"
        direction={{ xs: 'column', sm: 'row' }}
        gap={1}
      >
        <Stack gap={1}>
          <Typography variant="h5">
            Choose the URL you want your site published to
          </Typography>
          <Typography variant="caption" maxWidth="75%">
            domains can be purchased for <strong>one year</strong> with optional
            renewal
          </Typography>
        </Stack>
        <CheckoutBtn />
      </Stack>
      {d && <AppSelect orders={orders} />}
      <SelectDomain searchParams={searchParams} />
    </Stack>
  )
}
