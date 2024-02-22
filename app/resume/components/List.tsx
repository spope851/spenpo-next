import { List as MuiList } from '@mui/material'
import React from 'react'

export const List: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <MuiList sx={{ py: 0 }}>{children}</MuiList>
}
