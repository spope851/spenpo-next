'use client'
import React from 'react'
import {
  LinkPreviewProps,
  LinkPreview as ReactLinkPreview,
} from '@dhaiwat10/react-link-preview'
import { LINK_PREVIEW_FALLBACK } from '@/app/constants/image'
import { useMediaQuery, useTheme } from '@mui/material'

export const LinkPreview: React.FC<LinkPreviewProps> = ({ url, width, ...rest }) => {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  return (
    <ReactLinkPreview
      className="spenpo-link-preview"
      {...rest}
      url={url}
      fetcher={async (url: string) => {
        const req = await fetch(`/api/getLinkPreview?url=${url}`, {
          method: 'get',
        })
        const json = await req.json()
        return json
      }}
      fallbackImageSrc={LINK_PREVIEW_FALLBACK}
      width={isSmallScreen ? 'unset' : width}
    />
  )
}
