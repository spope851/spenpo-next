import React from 'react'
import { Stack, SxProps, Typography } from '@mui/material'
import { ReadyState } from '../../../../../components/readyState'
import { SmallHeader } from './smallHeader'
import { VercelReadyState } from './useDeployment'

export const Status: React.FC<{ sx?: SxProps; readyState?: VercelReadyState }> = ({
  sx,
  readyState,
}) => (
  <Stack sx={sx}>
    <SmallHeader>Status</SmallHeader>
    <Typography component="span" sx={{ textTransform: 'capitalize' }}>
      {readyState && <ReadyState readyState={readyState} />}
      {readyState?.toLowerCase()}
    </Typography>
  </Stack>
)
