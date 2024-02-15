import redis from '@/app/utils/redis'
import { NextResponse, type NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const BODY = await req.json()
  await redis.hmset(BODY.id, BODY.cache)
  await redis.expire(BODY.id, 300)
  return NextResponse.json({ status: 200, message: 'cached successfully' })
}
