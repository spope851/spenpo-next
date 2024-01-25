'use client'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  CircularProgress,
  Link,
  Stack,
  Typography,
} from '@mui/material'
import { usePathname } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'
import { Project as ProjectType } from '../../../../components/siteCard'
import { DeploymentCard } from '@/app/components/deploymentCard'
import { HoverAwareness } from '@/app/components/hoverAwareness'
import ReactTimeago from 'react-timeago'
import { LinkPreview } from '@/app/components/linkPreview'
import { Domains } from '../deployments/components/domains'
import { Status } from '../deployments/components/status'
import { SmallHeader } from '../deployments/components/smallHeader'

const getProject = async (name: string) =>
  fetch(`/api/landing-page/getVercelProject?name=${name}`)

export const Project: React.FC<{ name: string }> = ({ name }) => {
  const pathname = usePathname()
  const [data, setData] = useState<ProjectType>()
  const [loading, setLoading] = useState(false)
  const [linkHover, setLinkHover] = useState(false)
  const [accordionExpanded, setAccordionExpanded] = useState(true)

  const refreshProject = async () => {
    setLoading(true)
    const projectReq = await getProject(name)
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
    <>
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
            <Link href={`${pathname}/deployments`}>view all</Link>
          </HoverAwareness>
        </AccordionSummary>
        <AccordionDetails>
          <Stack rowGap={1}>
            {data?.latestDeployments?.map((deployment) => (
              <DeploymentCard key={deployment.id} uid={deployment.id} />
            ))}
            {loading && <CircularProgress sx={{ alignSelf: 'center' }} />}
          </Stack>
        </AccordionDetails>
      </Accordion>
    </>
  )
}
