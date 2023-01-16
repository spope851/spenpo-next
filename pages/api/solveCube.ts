import Cube from "cubejs"

export default async (req, res) => {
  console.log("GET cube  ", req.query)
  const myCube = new Cube(Cube.fromString(req.query.facelets))
  Cube.initSolver()
  const solution = myCube.solve()
  res.status(200).send(solution.split(" "))
}
