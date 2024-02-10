'use client'
import { Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { LINK_PREVIEW_FALLBACK } from '@/app/constants/image'
import { BgImage } from '@/app/components/bgImage'

export type Project = {
  id: string
  name: string
  updatedAt: number
  createdAt: number
  targets: {
    production?: {
      alias?: string[]
    }
  }
  latestDeployments: { id: string }[]
}

const getProject = async (name: string) =>
  fetch(`/api/landing-page/getVercelProject?name=${name}`)

export const AppPreviewImg: React.FC<{ name: string }> = ({ name }) => {
  const [project, setProject] = useState<Project>()

  const fetchProject = async () =>
    getProject(name).then(async (res) => {
      const data = await res.json()
      setProject(data)
    })

  useEffect(() => {
    ;(async () => fetchProject())()
  }, [name]) // eslint-disable-line react-hooks/exhaustive-deps

  const [linkPreview, setLinkPreview] = useState(LINK_PREVIEW_FALLBACK)

  useEffect(() => {
    if (!!project?.targets?.production?.alias?.[0]) {
      ;(async () => {
        const previewReq = await fetch(
          `/api/getLinkPreview?url=https://${project?.targets?.production?.alias?.[0]}`
        )
        if (previewReq.ok) {
          const preview = await previewReq.json()
          setLinkPreview(preview.image)
        } else setLinkPreview(LINK_PREVIEW_FALLBACK)
      })()
    }
  }, [project])

  if (!project)
    return (
      <Stack
        border="solid 2px #aaa"
        height={40}
        width={40}
        borderRadius={24}
        alignItems="center"
        color="#aaa"
        justifyContent="center"
      >
        ...
      </Stack>
    )

  return (
    <BgImage
      src={linkPreview}
      sx={{
        borderRadius: 25,
        height: 40,
        width: 40,
        border: 'solid 1px #555',
        m: '2px',
      }}
    />
  )
}
