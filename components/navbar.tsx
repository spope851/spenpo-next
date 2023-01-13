import Image from "next/image"
import Link from "next/link"
import { Tabs } from "../types"
import fav from "../public/favicon.ico"
// import { ToggleTheme } from "./toggleTheme"

interface NavbarProps {
  active: Tabs
}

export default function Navbar({ active }: NavbarProps) {
  const tabState = (a: boolean) => (a ? "active" : "")
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link href="/" className={tabState(active === "root")}>
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
          <li>
            <Link href="/resume" className={tabState(active === "resume")}>
              resume
            </Link>
          </li>
          <li>
            <Link href="/blog" className={tabState(active === "blog")}>
              blog
            </Link>
          </li>
          <li>
            <Link href="/projects" className={tabState(active === "projects")}>
              projects
            </Link>
          </li>
          {/* <li><ToggleTheme /></li> */}
        </ul>
      </nav>
    </header>
  )
}
