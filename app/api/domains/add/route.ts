import { addDomainToProject } from '@/app/services/vercel'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const BODY = await req.json()
  const add = await addDomainToProject(BODY.project, BODY.entry)
  const res = await add.json()

  return NextResponse.json({ ...res })
}
