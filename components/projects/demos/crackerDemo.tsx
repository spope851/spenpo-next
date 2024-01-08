import { LinkImage } from '@/components/linkImage'
import { Stack } from '@mui/material'
import React from 'react'

const CrackerDemo: React.FC = () => (
  <Stack flex={1} alignItems="center" justifyContent="center" my={2}>
    <LinkImage
      href="https://reflective-hour.vercel.app"
      src="/images/cracker.png"
      sx={{ width: 710 }}
    />
  </Stack>
)

export default CrackerDemo
