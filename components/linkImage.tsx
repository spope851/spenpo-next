import React from "react"
import { styled } from "@mui/material/styles"
import Image from "next/image"
import { Box } from "@mui/material"
import Link from "next/link"

const StyledImage = styled(Image)({
  "&:hover": {
    opacity: 0.6,
  },
  transition: "opacity .2s ease",
  borderRadius: 8,
})

interface LinkImageProps {
  height: number
  width: number
  href: string
  src: string
  alt: string
}

export const LinkImage: React.FC<LinkImageProps> = ({
  height,
  width,
  href,
  src,
  alt,
}) => (
  <Box bgcolor="#000" height={height} width={width} borderRadius="8px">
    <Link href={href}>
      <StyledImage src={src} height={height} width={width} alt={alt} />
    </Link>
  </Box>
)
