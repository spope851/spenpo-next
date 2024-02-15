import React, { Suspense } from 'react'
import { Stack, Typography } from '@mui/material'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import { Breadcrumbs } from '@/app/components/Breadcrumbs'
import prisma from '@/app/utils/prisma'
import { PageProps } from '@/app/types/app'
import { SelectDomain } from '@/app/products/components/SelectDomain'
import { CheckoutBtn } from './components/CheckoutBtn'
import { AppSelect, Order } from './components/AppSelect'
import redis from '@/app/utils/redis'

export default async function Buy({ searchParams }: PageProps) {
  const session = await getServerSession(authOptions)
  let orders: Order[] = []

  if (session)
    orders = await prisma.order.findMany({
      where: { userId: session.user.id, complete: true, productId: 'landing-page' },
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
        <CheckoutBtn
          cache={async (
            domainName: string,
            projectName: string,
            price: number,
            renew: boolean
          ) => {
            'use server'
            await redis.hmset(session?.user.id, {
              domainName,
              projectName,
              price,
              renew,
            })
          }}
        />
      </Stack>
      {d && (
        <Suspense>
          <AppSelect orders={orders} />
        </Suspense>
      )}
      <SelectDomain searchParams={searchParams} />
    </Stack>
  )
}
