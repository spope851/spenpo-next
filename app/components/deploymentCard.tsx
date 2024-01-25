import { Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { ReadyState } from './readyState'
import { NewTabLink } from './newTabLink'
import TimeAgo from 'react-timeago'
import { usePathname, useRouter } from 'next/navigation'
import { HoverAwareness } from './hoverAwareness'
import { VercelReadyState } from '@/app/products/landing-page/[appName]/deployments/components/useDeployment'

const getDeployment = async (uid: string) =>
  fetch(`/api/landing-page/getVercelDeployment?uid=${uid}`)

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

export const DeploymentCard: React.FC<{ uid: string }> = ({ uid }) => {
  const [data, setData] = useState<Deployment>()
  const router = useRouter()
  const pathname = usePathname()
  const [linkHover, setLinkHover] = useState(false)

  useEffect(() => {
    ;(async () =>
      getDeployment(uid).then(async (res) => {
        const data = await res.json()
        setData(data)
      }))()
  }, [uid])

  if (!data)
    return (
      <Stack border="solid 2px #aaa" p={2} borderRadius={1}>
        ...loading
      </Stack>
    )

  return (
    <Stack
      id="spenpo-deployment-card"
      onClick={() => {
        if (linkHover) return
        const pushtoPathname = `${pathname}${
          pathname?.split('/').at(-1) === 'deployments' ? '' : '/deployments'
        }/${data.id}`
        router.push(`${pushtoPathname}?createdAt=${data.createdAt}`)
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
      <TimeAgo date={data.ready || data.createdAt} />
      <Stack direction="row" alignItems="center" mb="auto">
        {data.alias && (
          <HoverAwareness
            setHovering={setLinkHover}
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '40vw',
            }}
          >
            <NewTabLink url={data.url} />
          </HoverAwareness>
        )}
        <ReadyState readyState={data.readyState} />
      </Stack>
    </Stack>
  )
}
