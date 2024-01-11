import React, { useEffect, useMemo, useState } from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material'
import { useRouter } from 'next/router'
import { authOptions } from '../../../../pages/api/auth/[...nextauth]'
import { GetServerSidePropsContext } from 'next'
import { getServerSession } from 'next-auth'
import { DeploymentCard } from '../../../../components/deploymentCard'
import { LinkPreview } from '../../../../components/linkPreview'
import Link from 'next/link'
import { Breadcrumbs } from '../../../../components/breadcrumbs'
import { HoverAwareness } from '../../../../components/hoverAwareness'
import { Project } from '../../../../components/siteCard'
import { Domains } from '../../../../components/deployment/domains'
import { Status } from '../../../../components/deployment/status'
import { SmallHeader } from '../../../../components/deployment/smallHeader'
import ReactTimeago from 'react-timeago'
import prisma from '../../../../utils/prisma'
import { Prisma } from '@prisma/client'

const getProject = async (name: string) =>
  fetch(`/api/landing-page/getVercelProject?name=${name}`)

const SitePage: React.FC = () => {
  const router = useRouter()
  const [data, setData] = useState<Project>()
  const [loading, setLoading] = useState(false)
  const [linkHover, setLinkHover] = useState(false)
  const [accordionExpanded, setAccordionExpanded] = useState(true)

  const refreshProject = async () => {
    setLoading(true)
    const projectReq = await getProject(String(router.query.appName))
    const project = await projectReq.json()
    setData(project)
    setLoading(false)
  }

  useEffect(() => {
    ;(async () => refreshProject())()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const linkPreview = useMemo(() => {
    return (
      <Box
        display={{ xs: 'block', sm: 'flex' }}
        sx={{
          '& .Container': {
            height: 'unset',
          },
          '& .Image': {
            height: { sm: '-webkit-fill-available' },
          },
        }}
      >
        <LinkPreview url={`https://${data?.targets?.production?.alias?.[0]}`} />
      </Box>
    )
  }, [data])

  return (
    <Stack rowGap={3} m={{ xs: 2, sm: 5 }}>
      <Breadcrumbs />
      <Stack rowGap={5} sx={{ '& .Mui-expanded': { m: '0px !important' } }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-around"
          gap={5}
        >
          {linkPreview}
          <Stack flex={1} border="solid 2px #aaa" p={2} rowGap={3}>
            <Domains alias={data?.targets?.production?.alias} />
            <Status readyState={data?.targets?.production?.readyState} />
            <Stack>
              <SmallHeader>Created</SmallHeader>
              {data?.createdAt && <ReactTimeago date={data.createdAt} />}
            </Stack>
          </Stack>
        </Stack>
        <Accordion
          expanded={accordionExpanded}
          onChange={() => {
            if (linkHover) return
            setAccordionExpanded(!accordionExpanded)
          }}
        >
          <AccordionSummary
            sx={{
              '& .MuiAccordionSummary-content': {
                justifyContent: 'space-between',
              },
            }}
          >
            <Typography>Latest Deployments</Typography>
            <HoverAwareness setHovering={setLinkHover}>
              <Link href={`${router.asPath}/deployments`}>view all</Link>
            </HoverAwareness>
          </AccordionSummary>
          <AccordionDetails>
            <Stack rowGap={1}>
              {data?.latestDeployments.map((deployment) => (
                <DeploymentCard key={deployment.id} uid={deployment.id} />
              ))}
              {loading && <CircularProgress sx={{ alignSelf: 'center' }} />}
            </Stack>
          </AccordionDetails>
        </Accordion>
      </Stack>
    </Stack>
  )
}

export default SitePage

const redirect = {
  redirect: {
    permanent: false,
    destination: `/products/landing-page`,
  },
}

export async function getServerSideProps({
  req,
  res,
  params,
}: GetServerSidePropsContext) {
  const session = await getServerSession(req, res, authOptions)
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
    if (project) {
      return { props: { project } }
    } else return redirect
  } else {
    return redirect
  }
}
