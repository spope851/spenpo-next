import { Projects } from "@/types"
import { Box } from "@mui/material"
import { ReactNode } from "react"
import CubeDemo from "./demos/cubeSolverDemo"
import LanguageFlashDemo from "./demos/languageFlashDemo"
import ReactTimeclockDemo from "./demos/reactTimeclockDemo"
import TwoTruthsDemo from "./demos/twoTruthsDemo"
import CubeDes from "./descriptions/cubeSolverDes"
import LanguageFlashDes from "./descriptions/languageFlashDes"
import ReactTimeclockDes from "./descriptions/reactTimeclockDes"
import TwoTruthsDes from "./descriptions/twoTruthsDes"
import { Description, Header, MobileDescription } from "./styled"
import SpenpoLandingDes from "./descriptions/spenpoLandingDes"
import SpenpoLandingDemo from "./demos/spenpoLandingDemo"

export * from "./styled"

const Project: React.FC<{
  description: ReactNode
  demo: ReactNode
  id: string
}> = ({ description, demo, id }) => (
  <Box component="tr" id={id} className="projects-row">
    <Description>
      <Box component="td" className="projects-table-data">
        {description}
      </Box>
    </Description>
    <Header>demo</Header>
    {demo}
    <Header>info</Header>
    <MobileDescription className="projects-table-data">
      {description}
    </MobileDescription>
  </Box>
)

const projects: Record<Projects, Record<"description" | "demo", JSX.Element>> = {
  "spenpo-landing": {
    description: <SpenpoLandingDes />,
    demo: <SpenpoLandingDemo />,
  },

  "two-truths": {
    description: <TwoTruthsDes />,
    demo: <TwoTruthsDemo />,
  },

  "language-flash": {
    description: <LanguageFlashDes />,
    demo: <LanguageFlashDemo />,
  },
  "3x3-cube": {
    description: <CubeDes />,
    demo: <CubeDemo />,
  },
  "react-timeclock": {
    description: <ReactTimeclockDes />,
    demo: <ReactTimeclockDemo />,
  },
}

export default projects
