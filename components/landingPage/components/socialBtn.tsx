import { Box } from "@mui/material"
import React, { forwardRef } from "react"
import { SocialIcon } from "react-social-icons"
import { SOCIAL_ICON_SX } from "../functions"

export const SocialBtn: React.FC<{ url: string; color: string }> = forwardRef(
  ({ url, color, ...rest }, ref) => {
    return (
      <Box
        {...rest}
        sx={{
          ":hover": {
            transform: "scale(1.06)",
            ...SOCIAL_ICON_SX(color),
          },
        }}
        ref={ref}
      >
        <SocialIcon
          url={url}
          onClick={(e) => {
            e.preventDefault()
            window.open(url, "_blank", "noopener,noreferrer")
          }}
        />
      </Box>
    )
  }
)
