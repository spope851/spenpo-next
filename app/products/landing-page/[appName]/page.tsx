import React from 'react'
import { Stack } from '@mui/material'
import { authOptions } from '../../../../pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import { Breadcrumbs } from '../../../components/breadcrumbs'
import prisma from '../../../utils/prisma'
import { Prisma } from '@prisma/client'
import { redirect } from 'next/navigation'
import { PageProps } from '@/app/types/app'
import { Project } from './components/Project'

export default async function SitePage({ params }: PageProps) {
  const session = await getServerSession(authOptions)
  if (!!session) {
    const project = await prisma.order
      .findMany({
        where: { userId: session.user.id, complete: true },
      })
      .then((res) =>
        res.find(
          (order) =>
            ((order.metadata as Prisma.JsonObject).projectName as Prisma.JsonObject)
              .vercelApp === params?.appName
        )
      )
    if (!project) {
      redirect(`/products/landing-page`)
    }
  } else redirect(`/products/landing-page`)

  return (
    <Stack rowGap={3} m={{ xs: 2, sm: 5 }}>
      <Breadcrumbs />
      <Stack rowGap={5} sx={{ '& .Mui-expanded': { m: '0px !important' } }}>
        <Project name={params.appName} />
      </Stack>
    </Stack>
  )
}
