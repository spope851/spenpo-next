import Cube from 'cubejs'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const facelets = req.nextUrl.searchParams.get('facelets')
  // console.log("GET cube  ", req.query)
  const myCube = new Cube(Cube.fromString(facelets))
  Cube.initSolver()
  const solution = myCube.solve()
  return NextResponse.json(solution.split(' '))
}
