import { Stack, Typography, Button } from '@mui/material'
import { CSSProperties, useEffect, useState } from 'react'
import { VercelReadyState } from './deployment/useDeployment'
import { ReadyState } from './readyState'
import { NewTabLink } from './newTabLink'
import TimeAgo from 'react-timeago'
import { useRouter } from 'next/router'
import CachedIcon from '@mui/icons-material/Cached'
import { HoverAwareness } from './hoverAwareness'
import { BgImage } from './bgImage'
import { LINK_PREVIEW_FALLBACK } from '@/constants/image'

const MIN_WIDTH: CSSProperties = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: '25vw',
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
      onClick={() =>
        !actionHover && router.push(`/products/landing-page/${project.name}`)
      }
      border="solid 2px #aaa"
      p={2}
      borderRadius={1}
      direction={{ lg: 'column', xs: 'row' }}
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
        />
        <Stack>
          <Typography fontWeight="bold" sx={MIN_WIDTH}>
            {project.name}
          </Typography>
          {/* @ts-expect-error Server Component */}
          <TimeAgo date={project.updatedAt} style={MIN_WIDTH} />
        </Stack>
      </Stack>
      {project.targets?.production ? (
        <Stack direction="row" alignItems="center" mb="auto">
          {project.targets.production.alias && (
            <HoverAwareness setHovering={setActionHover} sx={MIN_WIDTH}>
              <NewTabLink
                url={project.targets.production.alias[0]}
                sx={{ ml: { lg: 8, xs: 0 } }}
              />
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
