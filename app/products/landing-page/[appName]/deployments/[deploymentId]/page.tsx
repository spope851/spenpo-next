import React from 'react'
import { Deployment as SpenpoDeployment } from '../components/deployment'
import { Breadcrumbs } from '@/app/components/breadcrumbs'
import { Box } from '@mui/material'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import prisma from '@/app/utils/prisma'
import { Prisma } from '@prisma/client'
import { redirect } from 'next/navigation'
import { PageProps } from '@/app/types/app'

export default async function Deployment({ params, searchParams }: PageProps) {
  const session = await getServerSession(authOptions)
  if (!!session) {
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
    if (!projects.includes(params?.appName)) {
      redirect(`/products/landing-page`)
    }
  } else redirect(`/products/landing-page`)

  const id = params.deploymentId as string

  const createdAt = searchParams.createdAt as number | undefined

  return (
    <>
      <Box sx={{ mt: { xs: 2, sm: 5 }, ml: { xs: 2, sm: 5 } }}>
        <Breadcrumbs />
      </Box>
      <SpenpoDeployment id={id} createdAt={createdAt} />
    </>
  )
}
