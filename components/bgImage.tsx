import { Box, SxProps } from "@mui/material"
import React from "react"

export const BgImage: React.FC<{
  src: string
  opacity?: number
  sx?: SxProps
}> = ({ src, opacity = 1, sx }) => {
  return (
    <Box
      m="2px"
      sx={{
        ...sx,
        backgroundImage: `url(${src})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        opacity,
      }}
      borderRadius={2}
      border="solid 1px #555"
    />
  )
}
