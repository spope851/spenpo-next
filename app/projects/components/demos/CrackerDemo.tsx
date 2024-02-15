import { LinkImage } from '../../../components/LinkImage'
import { Stack } from '@mui/material'
import React from 'react'

export const CrackerDemo: React.FC = () => (
  <Stack flex={1} alignItems="center" justifyContent="center" my={2}>
    <LinkImage
      href="https://reflective-hour.vercel.app"
      src="/images/cracker.png"
      sx={{
        width: { xs: 'calc(100vw - 64px)', md: 'calc(75vw - 64px)' },
        maxWidth: 710,
      }}
    />
  </Stack>
)
