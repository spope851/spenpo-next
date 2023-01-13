import React, { useState, useMemo } from "react"
import { createTheme, ThemeProvider as MuiProvider } from "@mui/material"
import { ColorModeContext } from "./toggleTheme"

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState("light")
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"))
      },
    }),
    []
  )

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
        components: {
          MuiAccordion: {
            styleOverrides: {
              root: {
                border: "solid",
              },
            },
          },
        },
      }),
    [mode]
  )

  return (
    <ColorModeContext.Provider value={colorMode}>
      <MuiProvider theme={theme}>
        <>{children}</>
      </MuiProvider>
    </ColorModeContext.Provider>
  )
}
