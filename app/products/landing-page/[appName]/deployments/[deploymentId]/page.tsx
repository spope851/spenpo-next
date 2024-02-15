import React from 'react'
import { Deployment as SpenpoDeployment } from '../components/Deployment'
import { Breadcrumbs } from '@/app/components/Breadcrumbs'
import { Box } from '@mui/material'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import prisma from '@/app/utils/prisma'
import { redirect } from 'next/navigation'
import { PageProps } from '@/app/types/app'

export default async function Deployment({ params, searchParams }: PageProps) {
  const session = await getServerSession(authOptions)
  if (session) {
    const project = await prisma.order.findFirst({
      where: {
        userId: session.user.id,
        productId: 'landing-page',
        complete: true,
        metadata: {
          path: ['projectName', 'vercelApp'],
          equals: params?.appName,
        },
      },
    })
    if (!project) {
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
