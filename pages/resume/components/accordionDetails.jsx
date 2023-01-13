import { AccordionDetails as MuiAccordionDetails } from "@mui/material"
import React from "react"

const AccordionDetails = ({ children }) => {
  return <MuiAccordionDetails sx={{ pt: 0 }}>{children}</MuiAccordionDetails>
}

export default AccordionDetails
