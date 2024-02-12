'use client'
import { Stack, Typography, Button, SxProps } from '@mui/material'
import React, { useState } from 'react'
import { ReadyState } from '../../components/readyState'
import { NewTabLink } from '../../components/newTabLink'
import TimeAgo from 'react-timeago'
import { useRouter } from 'next/navigation'
import CachedIcon from '@mui/icons-material/Cached'
import { HoverAwareness } from '../../components/hoverAwareness'
import { BgImage } from '../../components/bgImage'
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

export const SiteCardClient: React.FC<{
  project: Project
  linkPreview: string
  fallback?: string
  revalidate: () => Promise<void>
}> = ({ fallback, linkPreview, project, revalidate }) => {
  const router = useRouter()
  const [actionHover, setActionHover] = useState(false)

  return (
    <Stack
      id="spenpo-site-card"
      onClick={async () => {
        if (!actionHover) {
          if (project.targets?.production)
            router.push(`/products/landing-page/${project.name}`)
          else await revalidate()
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
          src={linkPreview}
          sx={{
            borderRadius: 25,
            height: 50,
            width: 50,
            border: 'solid 1px #555',
            m: '2px',
          }}
          fallback={fallback}
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
            onClick={async () => revalidate()}
            sx={{ ml: 'auto', minWidth: 40, p: 1 }}
          >
            <CachedIcon />
          </Button>
        </HoverAwareness>
      )}
    </Stack>
  )
}
