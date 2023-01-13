import Navbar from "./navbar"
import Footer from "./footer"
import { useRouter } from "next/router"
import { Tabs } from "../types"
import { Box } from "@mui/material"

export default function Layout({ children }) {
  const { pathname } = useRouter()
  console.log()

  const active = (pathname.split("/")[1] as Tabs) || "root"

  return (
    <Box
      id="wrapper"
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      <Navbar active={active} />
      <Box className="content">{children}</Box>
      <Footer />
    </Box>
  )
}
