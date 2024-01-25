'use client'
import { Stack, Typography, Button, SxProps } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { ReadyState } from './readyState'
import { NewTabLink } from './newTabLink'
import TimeAgo from 'react-timeago'
import { useRouter } from 'next/navigation'
import CachedIcon from '@mui/icons-material/Cached'
import { HoverAwareness } from './hoverAwareness'
import { BgImage } from './bgImage'
import { LINK_PREVIEW_FALLBACK } from '../constants/image'
import { VercelReadyState } from '@/app/products/landing-page/[appName]/deployments/components/useDeployment'

const MIN_WIDTH = (lg: number = 7, md: number = 15, xs: number = 40): SxProps => {
  const maxWidth = Object.entries({ lg, md, xs }).reduce(
    (p: { [key: string]: string }, c) => {
      p[c[0]] = `${c[1]}vw`
      return p
    },
    {}
  )
  return {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth,
  }
}

export type Project = {
  id: string
  name: string
  updatedAt: number
  createdAt: number
  targets: {
    production?: {
      alias?: string[]
      readyState: VercelReadyState
    }
  }
  latestDeployments: { id: string }[]
}

const getProject = async (name: string) =>
  fetch(`/api/landing-page/getVercelProject?name=${name}`)

export const SiteCard: React.FC<{ name: string; fallback?: string }> = ({
  name,
  fallback,
}) => {
  const [project, setProject] = useState<Project>()
  const router = useRouter()
  const [actionHover, setActionHover] = useState(false)

  const fetchProject = async () =>
    getProject(name).then(async (res) => {
      const data = await res.json()
      setProject(data)
    })

  useEffect(() => {
    ;(async () => fetchProject())()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const [linkPreview, setLinkPreview] = useState(
    fallback ? fallback : LINK_PREVIEW_FALLBACK
  )

  useEffect(() => {
    if (!!project?.targets?.production?.alias?.[0]) {
      ;(async () => {
        const previewReq = await fetch(
          `/api/getLinkPreview?url=https://${project?.targets?.production?.alias?.[0]}`,
          { method: 'get' }
        )
        if (previewReq.ok) {
          const preview = await previewReq.json()
          setLinkPreview(preview.image)
        } else setLinkPreview(fallback ? fallback : LINK_PREVIEW_FALLBACK)
      })()
    }
  }, [project, fallback])

  if (!project)
    return (
      <Stack border="solid 2px #aaa" p={2} borderRadius={1}>
        ...loading
      </Stack>
    )

  return (
    <Stack
      id="spenpo-site-card"
      onClick={async () => {
        if (!actionHover) {
          if (project.targets?.production)
            router.push(`/products/landing-page/${project.name}`)
          else await fetchProject()
        }
      }}
      border="solid 2px #aaa"
      p={2}
      borderRadius={1}
      direction="row"
      gap={1}
      justifyContent="space-between"
      sx={{
        ':hover': {
          bgcolor: '#aaa',
          cursor: 'pointer',
        },
      }}
    >
      <Stack direction="row" columnGap={1}>
        <BgImage
          src={
            fallback && linkPreview === LINK_PREVIEW_FALLBACK
              ? fallback
              : linkPreview
          }
          sx={{
            borderRadius: 25,
            height: 50,
            width: 50,
            border: 'solid 1px #555',
            m: '2px',
          }}
        />
        <Stack>
          <Typography fontWeight="bold" sx={MIN_WIDTH()}>
            {project.name}
          </Typography>
          <TimeAgo date={project.updatedAt} style={MIN_WIDTH()} />
        </Stack>
      </Stack>
      {project.targets?.production ? (
        <Stack direction="row" alignItems="center" mb="auto">
          {project.targets.production.alias && (
            <HoverAwareness setHovering={setActionHover} sx={MIN_WIDTH()}>
              <NewTabLink url={project.targets.production.alias[0]} sx={{ ml: 0 }} />
            </HoverAwareness>
          )}
          <ReadyState readyState={project.targets.production.readyState} />
        </Stack>
      ) : (
        <HoverAwareness setHovering={setActionHover}>
          <Button
            variant="contained"
            onClick={async () => fetchProject()}
            sx={{ ml: 'auto', minWidth: 40, p: 1 }}
          >
            <CachedIcon />
          </Button>
        </HoverAwareness>
      )}
    </Stack>
  )
}