import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.formData()
  const file = body.get('file')!
  const blob = new Blob([file])
  const buffer = Buffer.from(await blob.arrayBuffer())
  const base64 = buffer.toString('base64')

  return NextResponse.json({ base64 })
}
