import { useRouter } from "next/router"
import { RobotError } from "@/components/robotError"
import { Tabs } from "@mui/material"
import Head from "next/head"
import { Projects as ProjectsType } from "@/types"
import projects, { TabBtn } from "@/components/projects"

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
          value={Object.keys(projects).indexOf(project || "two-truths")}
        >
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
