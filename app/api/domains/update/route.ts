import { addDomainToProject } from '@/app/services/vercel'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const BODY = await req.json()
  if (BODY.newName) {
    // delete old domain and add new
  }

  if (BODY.redirect || BODY.redirectStatusCode) {
    // patch project domain
  }
  const add = await addDomainToProject(BODY.project, BODY.entry)
  const res = await add.json()

  return NextResponse.json({ ...res })
}
