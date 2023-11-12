import { CSSProperties, Dispatch, ReactNode, SetStateAction } from "react"
import { Box } from "@mui/material"

export const HoverAwareness: React.FC<{
  setHovering: Dispatch<SetStateAction<boolean>>
  children: ReactNode
  sx?: CSSProperties
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
