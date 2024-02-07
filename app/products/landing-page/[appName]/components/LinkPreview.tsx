'use client'
import React from 'react'
import { LinkPreview as MyLinkPreview } from '@/app/components/linkPreview'
import { Box } from '@mui/material'

export const LinkPreview: React.FC<{ url: string }> = ({ url }) => {
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
      <MyLinkPreview url={url} />
    </Box>
  )
}
