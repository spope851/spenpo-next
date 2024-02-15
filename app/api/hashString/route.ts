import argon2 from 'argon2'
import { NextResponse, NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const BODY = await req.json()
  // console.log("GET hash  ", req.query)
  const hash = await argon2.hash(BODY.string)
  return NextResponse.json({ hash })
}
