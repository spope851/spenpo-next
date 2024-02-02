'use client'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import React from 'react'
import { useRouter } from 'next/navigation'
import { Button, ButtonProps } from '@mui/material'

export const BackButton: React.FC<{ href?: string } & ButtonProps> = ({
  href,
  sx,
}) => {
  const router = useRouter()
  return (
    <Button
      sx={sx}
      onClick={() => {
        if (!href) {
          router.back()
        } else router.push(href)
      }}
      variant="outlined"
      color="primary"
    >
      <ChevronLeftIcon />
      back
    </Button>
  )
}
