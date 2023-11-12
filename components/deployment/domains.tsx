import React from "react"
import { Stack, SxProps, Typography } from "@mui/material"
import { SmallHeader } from "./smallHeader"
import { NewTabLink } from "../newTabLink"

export const Domains: React.FC<{ sx?: SxProps; alias?: string[] }> = ({
  sx,
  alias,
}) => (
  <Stack sx={sx}>
    <SmallHeader>Domains</SmallHeader>
    {alias?.map((a) => (
      <Typography key={a}>
        <NewTabLink url={a} />
      </Typography>
    ))}
  </Stack>
)
