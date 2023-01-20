import { useRouter } from "next/router"
import { ButtonHTMLAttributes, DetailedHTMLProps, useState } from "react"
import CubeDemo from "./demos/cubeSolverDemo"
import LanguageFlashDemo from "./demos/languageFlashDemo"
import ReactTimeclockDemo from "./demos/reactTimeclockDemo"
import TwoTruthsDemo from "./demos/twoTruthsDemo"
import CubeDes from "./descriptions/cubeSolverDes"
import LanguageFlashDes from "./descriptions/languageFlashDes"
import ReactTimeclockDes from "./descriptions/reactTimeclockDes"
import TwoTruthsDes from "./descriptions/twoTruthsDes"

type Projects = "two-truths" | "language-flash" | "3x3-cube" | "react-timeclock"

const projects: Record<Projects, JSX.Element> = {
  "two-truths": (
    <tr id="two-truths" className="projects-row">
      <TwoTruthsDes />
      <td className="projects-table-data">
        <div id="two-truths-demo" className="app-demo">
          <TwoTruthsDemo />
        </div>
      </td>
    </tr>
  ),
  "language-flash": (
    <tr id="language-flash" className="projects-row">
      <LanguageFlashDes />
      <td className="projects-table-data">
        <div id="lang-flash" className="app-demo">
          <LanguageFlashDemo />
        </div>
      </td>
    </tr>
  ),
  "3x3-cube": (
    <tr id="3x3-cube" className="projects-row">
      <CubeDes />
      <CubeDemo />
    </tr>
  ),
  "react-timeclock": (
    <tr id="react-timeclock" className="projects-row">
      <ReactTimeclockDes />
      <ReactTimeclockDemo />
    </tr>
  ),
}

const TabBtn: React.FC<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
    active: Projects
    id: Projects
  }
> = ({ id, onClick, active }) => {
  const [btnClass, setBtnClass] = useState<string>()

  return (
    <button
      onClick={onClick}
      onMouseOver={() => setBtnClass("tweet-hover")}
      onMouseOut={() => setBtnClass("")}
      id={`${id}-btn`}
      className={`tab ${btnClass} ${active === id && "active"}`}
    >
      {id}
    </button>
  )
}

export default function Projects() {
  // const demoRef: LegacyRef<HTMLDivElement> = useRef(null)

  // useEffect(() => {
  //   LanguageFlashDemo()
  // }, [demoRef])
  const router = useRouter()
  const project = router.query.id as Projects

  return (
    <div className="content">
      <div className="tabs">
        <TabBtn
          onClick={() => router.push("/projects/two-truths")}
          id="two-truths"
          active={project}
        />
        <TabBtn
          onClick={() => router.push("/projects/language-flash")}
          id="language-flash"
          active={project}
        />
        <TabBtn
          onClick={() => router.push("/projects/3x3-cube")}
          id="3x3-cube"
          active={project}
        />
        <TabBtn
          onClick={() => router.push("/projects/react-timeclock")}
          id="react-timeclock"
          active={project}
        />
      </div>
      <table border={2}>
        <thead>
          <tr id="thead">
            <th className="projects-table-head" style={{ width: "25%" }}>
              info
            </th>
            <th className="projects-table-head" style={{ width: "75%" }}>
              demo
            </th>
          </tr>
        </thead>
        <tbody>{projects[project]}</tbody>
      </table>
    </div>
  )
}
