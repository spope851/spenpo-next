import { CubeSolver, getFacelets } from "3x3-cube"

export default function CubeDemo() {
  return (
    <td className="projects-table-data">
      <div id="3x3-cube-demo" className="app-demo">
        cube demo
        {/* <CubeSolver
          solve={async () =>
            await fetch(`/api/solveCube?facelets=${getFacelets()}`).then((res) =>
              res.json()
            )
          }
        /> */}
      </div>
    </td>
  )
}
