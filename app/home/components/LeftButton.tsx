'use client'
import { Typography, Button } from '@mui/material'
import { SxProps } from '@mui/material'
import { useRouter } from 'next/navigation'
import React from 'react'
import { HomeComponentWrapper } from './HomeComponentWraper'

export const LeftButton: React.FC<{ sx?: SxProps }> = ({ sx }) => {
  const router = useRouter()

  return (
    <HomeComponentWrapper>
      <Typography variant="h6" fontWeight="bold">
        explore my new products
      </Typography>
      <Button variant="outlined" onClick={() => router.push('/products')} sx={sx}>
        click here!
      </Button>
    </HomeComponentWrapper>
  )
}
