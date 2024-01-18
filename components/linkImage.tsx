import React from 'react'
import { SxProps } from '@mui/material/styles'
import { Box } from '@mui/material'
import Link from 'next/link'
import { BgImage } from './bgImage'

type NumStr = number | string

type Dimension =
  | NumStr
  | Partial<{ xs: NumStr; sm: NumStr; md: NumStr; lg: NumStr; xl: NumStr }>

interface LinkImageProps {
  sx?: SxProps & Partial<{ height: Dimension; width: Dimension }>
  href: string
  src: string
}

export const LinkImage: React.FC<LinkImageProps> = ({ sx, href, src }) => (
  <Box>
    <Link href={href} target="_blank" referrerPolicy="no-referrer">
      <BgImage
        src={src}
        sx={{
          ...sx,
          height: sx?.height || 400,
          width: sx?.width || 550,
          '&:hover': {
            opacity: 0.6,
          },
          transition: 'opacity .2s ease',
          borderRadius: 1,
        }}
      />
    </Link>
  </Box>
)
