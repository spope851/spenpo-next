import { AccordionDetails as MuiAccordionDetails } from '@mui/material'
import React from 'react'

export const AccordionDetails: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <MuiAccordionDetails sx={{ pt: 0 }}>{children}</MuiAccordionDetails>
}
