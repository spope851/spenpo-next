import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import React from "react"
import { useRouter } from "next/router"
import { Button } from "@mui/material"

export const BackButton: React.FC<{ href?: string }> = ({ href }) => {
  const router = useRouter()
  return (
    <Button
      href={href}
      onClick={() => {
        if (!href) {
          router.back()
        }
      }}
      variant="outlined"
      color="primary"
    >
      <ChevronLeftIcon />
      back
    </Button>
  )
}
