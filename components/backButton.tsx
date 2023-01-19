import Link from "next/link"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import React from "react"

export const BackButton: React.FC<{ href: string }> = ({ href }) => (
  <Link href={href} style={{ display: "flex" }}>
    <ChevronLeftIcon />
    back
  </Link>
)
