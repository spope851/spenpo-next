import { Box } from "@mui/material"
import React from "react"

export const BgImage: React.FC<{
  src: string
  opacity?: number
  height?: number
  width?: number
}> = ({ src, opacity = 1, height = 200, width = 200 }) => {
  return (
    <Box
      height={height}
      width={width}
      m="2px"
      sx={{
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
