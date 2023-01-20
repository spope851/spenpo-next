import Cube from "cubejs"
import type { NextApiRequest, NextApiResponse } from "next"

export default async (req: NextApiRequest, res: NextApiResponse<string[]>) => {
  console.log("GET cube  ", req.query)
  const myCube = new Cube(Cube.fromString(req.query.facelets))
  Cube.initSolver()
  const solution = myCube.solve()
  res.status(200).send(solution.split(" "))
}
