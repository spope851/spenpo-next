import { Dispatch, ReactNode, SetStateAction } from 'react'
import { Box, SxProps } from '@mui/material'

export const HoverAwareness: React.FC<{
  setHovering: Dispatch<SetStateAction<boolean>>
  children: ReactNode
  sx?: SxProps
}> = ({ setHovering, children, sx }) => (
  <Box
    sx={sx}
    id="spenpo-hover-awareness"
    onMouseOver={() => setHovering(true)}
    onMouseOut={() => setHovering(false)}
  >
    {children}
  </Box>
)
