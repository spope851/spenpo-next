import { AccordionDetails as MuiAccordionDetails } from "@mui/material"
import React from "react"

const AccordionDetails: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <MuiAccordionDetails sx={{ pt: 0 }}>{children}</MuiAccordionDetails>
}

export default AccordionDetails
