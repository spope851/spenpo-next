import Image from "next/image"
import { Tabs } from "../types"
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import MenuIcon from "@mui/icons-material/Menu"
import { useState } from "react"
import { useRouter } from "next/router"
import AvatarMenu from "./avatarMenu"

interface NavbarProps {
  active: Tabs
}

const TABS: Tabs[] = ["products", "projects", "blog", "resume", "contact"]

const Burger = styled(Button)(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}))

const Tab = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}))

const Route = styled(Button)`
  color: white;
  padding: 10px 20px;
  :hover {
    background-color: #999;
  }
`

export default function Navbar({ active }: NavbarProps) {
  const tabState = (a: boolean) => (a ? "active" : "")
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const route = (r: string): void => {
    setOpen(false)
    router.push(r)
  }
  console.log(active)

  return (
    <AppBar position="static" sx={{ bgcolor: "#555" }}>
      <Container maxWidth="xl" sx={{ p: "0px !important" }}>
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between", pr: 1 }}
        >
          <Box
            bgcolor={(theme) =>
              active === "home" ? theme.palette.primary.main : ""
            }
            p={2}
          >
            <Typography
              variant="h6"
              component="a"
              href="/home"
              sx={{ textDecoration: "none" }}
              color="secondary"
              display={{ xs: "none", sm: "block" }}
              noWrap
            >
              spencer pope
            </Typography>
            <IconButton
              href="/home"
              sx={{
                display: { xs: "block", sm: "none" },
                borderRadius: 1,
                p: 0,
                height: 32,
                width: 32,
              }}
            >
              <Image src="/favicon.ico" height={32} width={32} alt="favicon" />
            </IconButton>
          </Box>
          <Stack direction="row" gap={1}>
            {TABS.map((tab) => (
              <Tab
                variant={active === tab ? "contained" : "text"}
                color={active === tab ? "primary" : "secondary"}
                key={tab}
                href={`/${tab}`}
                className={tabState(active === tab)}
              >
                {tab}
              </Tab>
            ))}
            <AvatarMenu />
            <Burger
              sx={{ height: 51, color: "white" }}
              onClick={() => setOpen(true)}
            >
              <MenuIcon />
            </Burger>
          </Stack>
          <Drawer
            PaperProps={{ sx: { backgroundColor: "transparent", pt: 7, px: 1 } }}
            anchor="right"
            open={open}
            onClose={() => setOpen(false)}
          >
            {TABS.map((tab) => (
              <Route
                variant={active === tab ? "contained" : "text"}
                key={tab}
                onClick={() => route(`/${tab}`)}
              >
                {tab}
              </Route>
            ))}
          </Drawer>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
