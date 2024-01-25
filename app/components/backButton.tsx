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
      href={href}
      onClick={() => {
        if (!href) {
          router.back()
        }
      }}
      variant="outlined"
      color="primary"
    >
      <ChevronLeftIcon />
      back
    </Button>
  )
}
