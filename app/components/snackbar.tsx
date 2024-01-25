import { SnackbarProps, Snackbar as MuiSnackbar } from '@mui/material'
import React from 'react'

export const Snackbar: React.FC<SnackbarProps> = (props) => (
  <MuiSnackbar
    {...props}
    ContentProps={{ sx: { color: '#000', bgcolor: '#ddd' } }}
  />
)
