/* eslint-disable @typescript-eslint/no-explicit-any */
import { removeDomainFromProject } from '@/app/services/vercel'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(req: NextRequest) {
  const BODY = await req.json()

  try {
    await removeDomainFromProject(BODY.project, BODY.name)
    return NextResponse.json({ status: 200, message: 'domain removed' })
  } catch (err: any) {
    return NextResponse.json({ status: 400, message: 'something went wrong' })
  }
}
