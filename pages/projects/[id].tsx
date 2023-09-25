import { useRouter } from "next/router"
import { RobotError } from "@/components/robotError"
import { Tabs } from "@mui/material"
import Head from "next/head"
import { Projects as ProjectsType } from "@/types"
import projects, { TabBtn } from "@/components/projects"

const PROJECTS: ProjectsType[] = [
  "spenpo-landing",
  "two-truths",
  "language-flash",
  "3x3-cube",
  "react-timeclock",
]

export default function Projects() {
  const router = useRouter()
  const project = router.query.id as ProjectsType

  return (
    <>
      <Head>
        <title>spencer pope</title>
      </Head>
      <div className="content">
        <Tabs
          scrollButtons
          allowScrollButtonsMobile
          variant="scrollable"
          className="tabs"
          value={Object.keys(projects).indexOf(project || "spenpo-landing")}
        >
          {PROJECTS.map((projectName) => (
            <TabBtn
              key={projectName}
              onClick={() => router.push(projectName)}
              id={projectName}
              active={project}
            />
          ))}
        </Tabs>
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
          <tbody>
            {projects[project] || (
              <tr className="projects-row">
                <td className="projects-table-data">
                  <ul className="app-description"></ul>
                </td>
                <td className="projects-table-data">
                  <div className="app-demo">
                    <RobotError>this project doesn&apos;t exist yet</RobotError>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}
