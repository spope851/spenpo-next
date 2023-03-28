import React, { useState, useMemo } from "react"
import { createTheme, ThemeProvider as MuiProvider } from "@mui/material"
import { ColorModeContext } from "./toggleTheme"

const DARK_GREY = "#999"

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mode, setMode] = useState<"light" | "dark">("light")
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
          primary: {
            main: "#4f86f7",
          },
        },
        breakpoints: {
          values: {
            xs: 0,
            sm: 600,
            md: 850,
            lg: 1200,
            xl: 1536,
          },
        },
        components: {
          MuiAccordion: {
            styleOverrides: {
              root: {
                border: `solid 2px ${DARK_GREY}`,
                "&:not(:first-child)": {
                  borderTop: `solid 1px ${DARK_GREY}`,
                },
                "&:not(:last-child)": {
                  borderBottom: `solid 1px ${DARK_GREY}`,
                },
                "&.Mui-expanded": {
                  border: `solid 2px ${DARK_GREY}`,
                },
              },
            },
          },
          MuiTabs: {
            styleOverrides: {
              scrollButtons: {
                "&.Mui-disabled": {
                  display: "none",
                },
              },
              root: {
                minHeight: "unset",
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
