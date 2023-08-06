import Image from "next/image"
import Link from "next/link"
import { Tabs } from "../types"
import fav from "../public/favicon.ico"
import { Button, Drawer } from "@mui/material"
import { styled } from "@mui/material/styles"
import MenuIcon from "@mui/icons-material/Menu"
import { useState } from "react"
import { useRouter } from "next/router"
// import { ToggleTheme } from "./toggleTheme"

interface NavbarProps {
  active: Tabs
}

const Burger = styled("li")(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}))

const Tab = styled("li")(({ theme }) => ({
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

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link href="/" className={tabState(active === "home")}>
              <h3 id="nav-header">spencer pope</h3>
              <Image
                src={fav}
                height={32}
                width={32}
                id="nav-fav"
                alt="favicon"
                style={{ margin: 5 }}
              />
            </Link>
          </li>
          <Tab>
            <Link href="/contact" className={tabState(active === "contact")}>
              contact
            </Link>
          </Tab>
          <Tab>
            <Link href="/resume" className={tabState(active === "resume")}>
              resume
            </Link>
          </Tab>
          <Tab>
            <Link href="/blog" className={tabState(active === "blog")}>
              blog
            </Link>
          </Tab>
          <Tab>
            <Link href="/projects" className={tabState(active === "projects")}>
              projects
            </Link>
          </Tab>
          <Burger>
            <Button
              sx={{ height: 51, color: "white" }}
              onClick={() => setOpen(true)}
            >
              <MenuIcon />
            </Button>
          </Burger>
          <Drawer
            PaperProps={{ sx: { backgroundColor: "transparent", pt: 7 } }}
            anchor="right"
            open={open}
            onClose={() => setOpen(false)}
          >
            <Route onClick={() => route("/projects")}>projects</Route>
            <Route onClick={() => route("/blog")}>blog</Route>
            <Route onClick={() => route("/resume")}>resume</Route>
            <Route onClick={() => route("/contact")}>contact</Route>
          </Drawer>
          {/* <li><ToggleTheme /></li> */}
        </ul>
      </nav>
    </header>
  )
}
