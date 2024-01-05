import { LinkImage } from '@/components/linkImage'
import { Stack } from '@mui/material'
import React from 'react'

const StarterKitNextDemo: React.FC = () => (
  <Stack flex={1} alignItems="center" justifyContent="center" my={2}>
    <LinkImage
      href="https://starter-kit-next-kappa.vercel.app"
      src="/images/starter-kit-next.png"
    />
  </Stack>
)

export default StarterKitNextDemo
