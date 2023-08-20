import React from "react"
import { Typography } from "@mui/material"

export const DeploymentDate: React.FC<{ date: number }> = ({ date }) => (
  <Typography component="span">
    {new Date(date).getHours().toString().padStart(2, "0")}:
    {new Date(date).getMinutes().toString().padStart(2, "0")}:
    {new Date(date).getSeconds().toString().padStart(2, "0")}.
    {
      String(Number(new Date(date).getMilliseconds() / 1000).toFixed(3)).split(
        "."
      )[1]
    }
  </Typography>
)
