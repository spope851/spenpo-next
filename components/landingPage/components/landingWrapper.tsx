import { Box } from "@mui/material"
import React, { ReactNode, useContext } from "react"
import { LandingPageContext } from "@/context/landingPage"

export const LandingWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { BACKGROUND_COLOR, BACKGROUND_IMAGE, TopComponents } =
    useContext(LandingPageContext)

  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: BACKGROUND_COLOR,
        backgroundImage: `url('${BACKGROUND_IMAGE}')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      {TopComponents}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          columnGap: 10,
          padding: "4rem 0",
        }}
      >
        {children}
      </Box>
    </Box>
  )
}
