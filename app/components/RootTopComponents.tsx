'use client'
import { useRouter } from 'next/navigation'
import Close from '@mui/icons-material/Close'
import Arrow from '@mui/icons-material/ArrowForward'
import { IconButton, Tooltip, Typography } from '@mui/material'
import React, { useState } from 'react'
import Package from '../../package.json'

export const RootTopComponents: React.FC = () => {
  const router = useRouter()
  const [hover, setHover] = useState(false)

  return (
    <>
      <Tooltip title="Continue to spenpo.com" placement="left">
        <IconButton
          onClick={() => router.push('/home')}
          sx={{ position: 'absolute', right: 0, top: 0, transition: 'ease' }}
          onMouseOver={() => setHover(true)}
          onMouseOut={() => setHover(false)}
          size="large"
        >
          {hover ? <Arrow fontSize="large" /> : <Close fontSize="large" />}
        </IconButton>
      </Tooltip>
      <Typography variant="caption" sx={{ position: 'absolute', bottom: 0 }}>
        v{Package.version}
      </Typography>
    </>
  )
}
