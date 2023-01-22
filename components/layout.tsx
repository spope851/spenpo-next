import Navbar from "./navbar"
import Footer from "./footer"
import { useRouter } from "next/router"
import { Tabs } from "../types"
import { Box } from "@mui/material"
import React from "react"

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pathname } = useRouter()

  const active = (pathname.split("/")[1] as Tabs) || "root"

  return (
    <Box
      id="wrapper"
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
        minHeight: "100vh",
      }}
      display="flex"
      flexDirection="column"
    >
      <Navbar active={active} />
      {children}
      <Footer />
    </Box>
  )
}

export default Layout
