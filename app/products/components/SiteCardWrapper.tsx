'use client'
import React, { ReactNode, useState } from 'react'
import { Stack, SxProps } from '@mui/material'
import { useRouter } from 'next/navigation'
import { HoverAwareness } from '@/app/components/hoverAwareness'
import { NewTabLink } from '@/app/components/newTabLink'
import { ReadyState } from '@/app/components/readyState'
import { Project } from './SiteCardClient'

export const SiteCardWrapper: React.FC<{
  children: ReactNode
  project: Project
  sx?: SxProps
}> = ({ children, project, sx }) => {
  const router = useRouter()
  const [actionHover, setActionHover] = useState(false)

  return (
    <Stack
      id="spenpo-site-card"
      onClick={async () => {
        if (!actionHover) {
          if (project.targets?.production)
            router.push(`/products/landing-page/${project.name}`)
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
      {children}
      {project.targets?.production && (
        <Stack direction="row" alignItems="center" mb="auto">
          {project.targets.production.alias && (
            <HoverAwareness setHovering={setActionHover} sx={sx}>
              <NewTabLink url={project.targets.production.alias[0]} sx={{ ml: 0 }} />
            </HoverAwareness>
          )}
          <ReadyState readyState={project.targets.production.readyState} />
        </Stack>
      )}
    </Stack>
  )
}
