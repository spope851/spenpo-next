import { Box } from "@mui/material"
import React from "react"

export const OneThingLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <Box display="flex" flexDirection="column" alignItems="center" m="auto">
    {children}
  </Box>
)
