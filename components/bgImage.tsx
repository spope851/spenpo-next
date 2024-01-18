import { LINK_PREVIEW_FALLBACK } from '@/constants/image'
import { Box, SxProps } from '@mui/material'
import React, { ReactNode, useEffect, useState } from 'react'

export const BgImage: React.FC<{
  src: string
  opacity?: number
  sx?: SxProps
  fallback?: string
  children?: ReactNode
}> = ({ src, opacity = 1, sx, fallback, children }) => {
  const [bgImage, setBgImage] = useState(src)

  useEffect(() => {
    ;(async () => {
      try {
        const checkImg = await fetch(src, { method: 'get' })
        if (checkImg.ok) setBgImage(URL.createObjectURL(await checkImg.blob()))
      } catch {
        setBgImage(fallback || LINK_PREVIEW_FALLBACK)
      }
    })()
  }, [src, fallback])

  const SX = {
    ...sx,
    backgroundImage: `url(${bgImage})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    opacity,
  }

  return children ? <Box sx={SX}>{children}</Box> : <Box sx={SX} />
}
