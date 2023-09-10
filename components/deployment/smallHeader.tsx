import React, { ReactNode } from "react"
import { Typography } from "@mui/material"

export const SmallHeader: React.FC<{ children: ReactNode }> = ({ children }) => (
  <Typography component="span" sx={{ fontSize: 12, color: "#555" }}>
    {children}
  </Typography>
)
