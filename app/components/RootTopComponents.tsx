'use client'
import { useRouter } from 'next/navigation'
import Arrow from '@mui/icons-material/ArrowForward'
import { IconButton, Tooltip } from '@mui/material'
import React, { SyntheticEvent, useEffect } from 'react'
import TouchRipple, {
  TouchRippleActions,
} from '@mui/material/ButtonBase/TouchRipple'

export const RootTopComponents: React.FC = () => {
  const router = useRouter()
  const rippleRef = React.useRef<TouchRippleActions | null>(null)

  const onFocus = (e: SyntheticEvent) =>
    rippleRef.current?.start(e, { center: true, pulsate: true })

  const onBlur = () => rippleRef.current?.stop()

  useEffect(() => {
    document.getElementById('mui-button-to-ripple')?.focus()
  }, [])

  return (
    <Tooltip title="Continue to spenpo.com" placement="left" open arrow>
      <IconButton
        id="mui-button-to-ripple"
        onFocus={onFocus}
        onBlur={onBlur}
        onClick={() => {
          router.push('/home')
        }}
        sx={{ position: 'absolute', right: 0, top: 0, transition: 'ease' }}
        size="large"
      >
        <Arrow fontSize="large" />
        <TouchRipple ref={rippleRef} />
      </IconButton>
    </Tooltip>
  )
}
