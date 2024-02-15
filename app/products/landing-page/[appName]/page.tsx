import React, { Suspense } from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material'
import { authOptions } from '../../../../pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import { Breadcrumbs } from '../../../components/Breadcrumbs'
import prisma from '../../../utils/prisma'
import { redirect } from 'next/navigation'
import { PageProps } from '@/app/types/app'
import { LinkPreview } from './components/LinkPreview'
import { getProject } from '@/app/services/vercel'
import { Domains } from './deployments/components/Domains'
import { SmallHeader } from './deployments/components/SmallHeader'
import { Status } from './deployments/components/Status'
import { Timeago } from './components/Timeago'
import { DeploymentCard } from '../../../components/DeploymentCard'
import { NavBtns } from './components/NavBtns'

export default async function SitePage({ params }: PageProps) {
  const session = await getServerSession(authOptions)
  let projectData
  if (session) {
    const project = await prisma.order.findFirst({
      where: {
        userId: session.user.id,
        complete: true,
        productId: 'landing-page',
        metadata: {
          path: ['projectName', 'vercelApp'],
          equals: params?.appName,
        },
      },
    })
    if (project) {
      const projectReq = await getProject(String(params?.appName))
      projectData = await projectReq.json()
    } else redirect(`/products/landing-page`)
  } else redirect(`/products/landing-page`)

  return (
    <Stack rowGap={3} m={{ xs: 2, sm: 5 }}>
      <Breadcrumbs />
      <Stack rowGap={5} sx={{ '& .Mui-expanded': { m: '0px !important' } }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-around"
          gap={5}
        >
          <LinkPreview
            url={`https://${projectData?.targets?.production?.alias?.[0]}`}
          />
          <Stack
            flex={1}
            border="solid 2px #aaa"
            p={2}
            justifyContent="space-between"
            direction={{ xs: 'column-reverse', sm: 'row' }}
            gap={3}
          >
            <Stack rowGap={3}>
              <Domains alias={projectData?.targets?.production?.alias} />
              <Status readyState={projectData?.targets?.production?.readyState} />
              <Stack>
                <SmallHeader>Created</SmallHeader>
                {projectData?.createdAt && <Timeago date={projectData.createdAt} />}
              </Stack>
            </Stack>
            <NavBtns />
          </Stack>
        </Stack>
        <Accordion defaultExpanded>
          <AccordionSummary
            sx={{
              '& .MuiAccordionSummary-content': {
                justifyContent: 'space-between',
              },
            }}
          >
            <Typography>Latest Deployments</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack rowGap={1}>
              {projectData?.latestDeployments?.map(({ id }: { id: string }) => (
                <Suspense
                  key={id}
                  fallback={
                    <Stack border="solid 2px #aaa" p={2} borderRadius={1}>
                      ...loading
                    </Stack>
                  }
                >
                  <DeploymentCard uid={id} />
                </Suspense>
              ))}
              {!projectData && <CircularProgress sx={{ alignSelf: 'center' }} />}
            </Stack>
          </AccordionDetails>
        </Accordion>
      </Stack>
    </Stack>
  )
}
