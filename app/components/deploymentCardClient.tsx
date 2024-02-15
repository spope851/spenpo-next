'use client'
import { Stack } from '@mui/material'
import React, { useState } from 'react'
import { ReadyState } from './readyState'
import { NewTabLink } from './newTabLink'
import TimeAgo from 'react-timeago'
import { usePathname, useRouter } from 'next/navigation'
import { HoverAwareness } from './hoverAwareness'
import { VercelReadyState } from '@/app/products/landing-page/[appName]/deployments/components/useDeployment'

type Deployment = {
  id: string
  ready: number
  createdAt: number
  alias?: string[]
  url: string
  readyState: VercelReadyState
  meta: {
    githubCommitMessage: string
  }
}

export const DeploymentCardClient: React.FC<Deployment> = ({
  id,
  createdAt,
  ready,
  alias,
  url,
  readyState,
}) => {
  const router = useRouter()
  const pathname = usePathname()
  const [linkHover, setLinkHover] = useState(false)

  return (
    <Stack
      id="spenpo-deployment-card"
      onClick={() => {
        if (linkHover) return
        const pushtoPathname = `${pathname}${
          pathname?.split('/').at(-1) === 'deployments' ? '' : '/deployments'
        }/${id}`
        router.push(`${pushtoPathname}?createdAt=${createdAt}`)
      }}
      border="solid 2px #aaa"
      p={2}
      borderRadius={1}
      direction="row"
      justifyContent="space-between"
      sx={{
        ':hover': {
          bgcolor: '#aaa',
          cursor: 'pointer',
        },
      }}
      alignItems="center"
    >
      <TimeAgo date={ready || createdAt} />
      <Stack direction="row" alignItems="center" mb="auto">
        {alias && (
          <HoverAwareness
            setHovering={setLinkHover}
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '40vw',
            }}
          >
            <NewTabLink url={url} />
          </HoverAwareness>
        )}
        <ReadyState readyState={readyState} />
      </Stack>
    </Stack>
  )
}
