import redis from '@/app/utils/redis'
import { authOptions } from '../../../constants/api'
import { getServerSession } from 'next-auth'
import { NextResponse, type NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const BODY = await req.json()
  const session = await getServerSession(authOptions)
  if (session?.user.id) await redis.hmset(session.user.id, BODY)
  if (session?.user.id) await redis.expire(session.user.id, 300)
  return NextResponse.json({ status: 200, message: 'cached successfully' })
}
