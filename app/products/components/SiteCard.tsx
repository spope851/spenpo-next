import React from 'react'
import { LINK_PREVIEW_FALLBACK } from '../../constants/image'
import { getLinkPreview } from '../../utils/getLinkPreview'
import { getProject } from '../../services/vercel'
import { SiteCardClient } from './SiteCardClient'

export async function SiteCard({
  name,
  fallback,
}: {
  name: string
  fallback?: string
}) {
  const projectReq = await getProject(name)
  const project = await projectReq.json()

  let linkPreview = fallback ? fallback : LINK_PREVIEW_FALLBACK

  if (project?.targets?.production?.alias?.[0]) {
    const previewReq = await getLinkPreview(
      `https://${project?.targets?.production?.alias?.[0]}`
    )
    if (previewReq.title !== 'Unavailable') linkPreview = previewReq.image
    else linkPreview = fallback ? fallback : previewReq.image
  }

  return (
    <SiteCardClient
      linkPreview={linkPreview}
      project={project}
      fallback={fallback}
      revalidate={async () => {
        'use server'
      }}
    />
  )
}
