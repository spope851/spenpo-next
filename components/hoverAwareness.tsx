import { Dispatch, ReactNode, SetStateAction } from "react"
import { Box } from "@mui/material"

export const HoverAwareness: React.FC<{
  setHovering: Dispatch<SetStateAction<boolean>>
  children: ReactNode
}> = ({ setHovering, children }) => (
  <Box
    id="spenpo-hover-awareness"
    onMouseOver={() => setHovering(true)}
    onMouseOut={() => setHovering(false)}
  >
    {children}
  </Box>
)
