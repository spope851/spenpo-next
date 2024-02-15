import { getProject } from '@/app/services/vercel'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const name = req.nextUrl.searchParams.get('name')
  // console.log('GET project ', req.query)

  const projectReq = await getProject(String(name))
  const project = await projectReq.json()

  return NextResponse.json(project)
}
