import React, { Suspense } from 'react'
import { CircularProgress, Stack } from '@mui/material'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import { Breadcrumbs } from '@/app/components/breadcrumbs'
import prisma from '@/app/utils/prisma'
import { Prisma } from '@prisma/client'
import { PageProps } from '@/app/types/app'
import { redirect } from 'next/navigation'
import { getProjectDeployments } from '@/app/services/vercel'
import { DeploymentCard } from '@/app/components/deploymentCard'

export default async function Deployments({ params }: PageProps) {
  const session = await getServerSession(authOptions)
  let projectDeployments
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
    if (projects.includes(params?.appName)) {
      const projectDeploymentsReq = await getProjectDeployments(params?.appName)
      projectDeployments = await projectDeploymentsReq.json()
    } else redirect(`/products/landing-page`)
  } else redirect(`/products/landing-page`)

  return (
    <Stack rowGap={3} m={{ xs: 2, sm: 5 }}>
      <Breadcrumbs />
      <Stack direction="row" justifyContent="space-around">
        <Stack rowGap={1} width="100%">
          {projectDeployments?.deployments.map((deployment: { uid: string }) => (
            <Suspense
              key={deployment.uid}
              fallback={
                <Stack border="solid 2px #aaa" p={2} borderRadius={1}>
                  ...loading
                </Stack>
              }
            >
              <DeploymentCard uid={deployment.uid} />
            </Suspense>
          ))}
          {!projectDeployments && <CircularProgress sx={{ alignSelf: 'center' }} />}
        </Stack>
      </Stack>
    </Stack>
  )
}
