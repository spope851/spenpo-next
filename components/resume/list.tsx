import { List as MuiList } from "@mui/material"
import React from "react"

const List: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <MuiList sx={{ py: 0 }}>{children}</MuiList>
}

export default List
