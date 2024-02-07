import React from 'react'
import { Stack } from '@mui/material'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import { Breadcrumbs } from '@/app/components/breadcrumbs'
import prisma from '@/app/utils/prisma'
import { Prisma } from '@prisma/client'
import { PageProps } from '@/app/types/app'
import { redirect } from 'next/navigation'

export default async function Buy({ params }: PageProps) {
  const session = await getServerSession(authOptions)
  // let domains
  if (session) {
    const projects = await prisma.order
      .findMany({
        where: { userId: session.user.id, complete: true },
      })
      .then((res) =>
        res.map(
          (order) =>
            ((order.metadata as Prisma.JsonObject).projectName as Prisma.JsonObject)
              .vercelApp
        )
      )
    if (projects.includes(params?.appName)) {
      // const domainsReq = await getProjectDomains(params?.appName)
      // domains = await domainsReq.json()
    } else redirect(`/products/landing-page`)
  } else redirect(`/products/landing-page`)

  return (
    <Stack rowGap={3} m={{ xs: 2, sm: 5 }} gap={3}>
      <Breadcrumbs />
      buy
    </Stack>
  )
}
