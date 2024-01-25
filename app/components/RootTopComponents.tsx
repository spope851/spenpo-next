'use client'
import { useRouter } from 'next/navigation'
import Close from '@mui/icons-material/Close'
import Arrow from '@mui/icons-material/ArrowForward'
import { IconButton } from '@mui/material'
import React, { useState } from 'react'

export const RootTopComponents: React.FC = () => {
  const router = useRouter()
  const [hover, setHover] = useState(false)

  return (
    <IconButton
      onClick={() => router.push('/home')}
      sx={{ position: 'absolute', right: 0, top: 0, transition: 'ease' }}
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
      size="large"
    >
      {hover ? <Arrow fontSize="large" /> : <Close fontSize="large" />}
    </IconButton>
  )
}
