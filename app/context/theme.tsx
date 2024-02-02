'use client'
import React, {
  useState,
  useMemo,
  createContext,
  Dispatch,
  SetStateAction,
} from 'react'
import {
  createTheme,
  CssBaseline,
  CSSInterpolation,
  ThemeProvider as MuiProvider,
} from '@mui/material'
const DARK_GREY = '#999'

type CustomizeThemeContextProps = {
  setMuiDrawerStyleOverrides: Dispatch<SetStateAction<CSSInterpolation>>
}

export const CustomizeThemeContext = createContext({} as CustomizeThemeContextProps)

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [muiDrawerStyleOverrides, setMuiDrawerStyleOverrides] =
    useState<CSSInterpolation>({})
  const colorMode = useMemo(() => {
    const ctxVal: CustomizeThemeContextProps = {
      setMuiDrawerStyleOverrides,
    }
    return ctxVal
  }, [])

  const PRIMARY = '#4f86f7'

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
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
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                overflowX: 'hidden',
              },
              h1: {
                '&.MuiTypography-root': {
                  fontSize: 30,
                },
              },
            },
          },
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
            styleOverrides: {
              body2: {
                fontSize: 20,
              },
            },
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
          MuiDrawer: {
            styleOverrides: {
              root: muiDrawerStyleOverrides,
            },
          },
        },
      }),
    [muiDrawerStyleOverrides]
  )

  return (
    <CustomizeThemeContext.Provider value={colorMode}>
      <MuiProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiProvider>
    </CustomizeThemeContext.Provider>
  )
}
