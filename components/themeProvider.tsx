import React, { useState, useMemo } from 'react'
import { createTheme, ThemeProvider as MuiProvider } from '@mui/material'
import { ColorModeContext } from './toggleTheme'

const DARK_GREY = '#999'

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light')
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
      },
    }),
    []
  )

  const PRIMARY = '#4f86f7'

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: PRIMARY,
          },
          secondary: {
            main: '#fff',
          },
        },
        breakpoints: {
          values: {
            xs: 0,
            sm: 650,
            md: 850,
            lg: 1200,
            xl: 1536,
          },
        },
        components: {
          MuiAppBar: {
            styleOverrides: {
              root: {
                '& .MuiButtonBase-root': {
                  textTransform: 'lowercase',
                },
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: 'capitalize',
              },
            },
          },
          MuiTypography: {
            variants: [
              {
                props: { id: 'deployment' },
                style: {
                  fontFamily: `Roboto Mono, Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace`,
                },
              },
            ],
          },
          MuiAccordion: {
            styleOverrides: {
              root: {
                border: `solid 2px ${DARK_GREY}`,
                '&:not(:first-of-type)': {
                  borderTop: `solid 1px ${DARK_GREY}`,
                },
                '&:not(:last-of-type)': {
                  borderBottom: `solid 1px ${DARK_GREY}`,
                },
                '&.Mui-expanded': {
                  border: `solid 2px ${DARK_GREY}`,
                },
              },
            },
          },
          MuiTab: {
            styleOverrides: {
              root: {
                textTransform: 'lowercase',
                borderRadius: '8px 8px 0px 0px',
                border: 'solid 2px',
              },
            },
          },
          MuiTabs: {
            styleOverrides: {
              scrollButtons: {
                '&.Mui-disabled': {
                  display: 'none',
                },
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
