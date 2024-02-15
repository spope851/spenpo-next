import { LinkImage } from '@/app/components/LinkImage'
import { Stack } from '@mui/material'
import React from 'react'

export const StarterKitNextDemo: React.FC = () => (
  <Stack flex={1} alignItems="center" justifyContent="center" my={2}>
    <LinkImage
      href="https://starter-kit-next-kappa.vercel.app"
      src="/images/starter-kit-next.png"
      sx={{
        width: { xs: 'calc(100vw - 64px)', md: 'calc(75vw - 64px)' },
        maxWidth: 550,
      }}
    />
  </Stack>
)
