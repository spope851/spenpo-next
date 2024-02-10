import React, { Suspense } from 'react'
import { CircularProgress, Stack } from '@mui/material'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import { Breadcrumbs } from '@/app/components/breadcrumbs'
import prisma from '@/app/utils/prisma'
import { Prisma } from '@prisma/client'
import { PageProps } from '@/app/types/app'
import { redirect } from 'next/navigation'
import { getProjectDomains } from '@/app/services/vercel'
import { Add } from './components/Add'
import { Domain, type DomainProps } from './components/Domain'
import { revalidatePath } from 'next/cache'

export default async function Domains({ params }: PageProps) {
  const session = await getServerSession(authOptions)
  let domains
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
      const domainsReq = await getProjectDomains(params?.appName)
      domains = await domainsReq.json()
    } else redirect(`/products/landing-page`)
  } else redirect(`/products/landing-page`)

  return (
    <Stack rowGap={3} m={{ xs: 2, sm: 5 }} gap={3}>
      <Breadcrumbs />
      <Add
        revalidate={async () => {
          'use server'
          revalidatePath(`/products/landing-page/${params?.appName}/domains`)
        }}
      />
      {!domains && <CircularProgress />}
      {domains?.domains.map((domain: DomainProps, _: number, a: DomainProps[]) => (
        <Suspense key={domain.name}>
          <Domain
            {...domain}
            domains={a.map((d) => d.name)}
            project={params?.appName}
          />
        </Suspense>
      ))}
    </Stack>
  )
}
