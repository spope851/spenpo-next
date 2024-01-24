'use client'
import { Typography, Button } from '@mui/material'
import { SxProps } from '@mui/material'
import { useRouter } from 'next/navigation'
import React from 'react'
import { DEFAULT_PROJECT } from '../../../constants/projects'
import { HomeComponentWrapper } from './HomeComponentWraper'

export const RightButton: React.FC<{ sx?: SxProps }> = ({ sx }) => {
  const router = useRouter()

  return (
    <HomeComponentWrapper>
      <Typography variant="h6" fontWeight="bold">
        see what else I&apos;m working on
      </Typography>
      <Button
        variant="outlined"
        onClick={() => router.push(`/projects/${DEFAULT_PROJECT}`)}
        sx={sx}
      >
        click here!
      </Button>
    </HomeComponentWrapper>
  )
}
