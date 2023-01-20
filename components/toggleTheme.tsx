import React, { createContext, useContext } from "react"
import { useTheme } from "@mui/material/styles"
import { IconButton } from "@mui/material"
import Brightness4Icon from "@mui/icons-material/Brightness4"
import Brightness7Icon from "@mui/icons-material/Brightness7"

export const ColorModeContext = createContext({ toggleColorMode: () => {} })

export const ToggleTheme: React.FC = () => {
  const theme = useTheme()
  const colorMode = useContext(ColorModeContext)

  const sx = {
    color: "#fff",
  }

  return (
    <IconButton
      sx={{ mr: 1, my: "5.5px", alignSelf: "center" }}
      onClick={colorMode.toggleColorMode}
      color="inherit"
    >
      {theme.palette.mode === "dark" ? (
        <Brightness7Icon sx={sx} />
      ) : (
        <Brightness4Icon sx={sx} />
      )}
    </IconButton>
  )
}
