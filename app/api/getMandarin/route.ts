import prisma from '@/app/utils/prisma'
import redis from '@/app/utils/redis'
import { NextResponse } from 'next/server'

export async function GET() {
  const cachedWords = await redis.get('mandarin')
  if (cachedWords) return NextResponse.json(JSON.parse(cachedWords))
  const data = await prisma.mandarin.findMany()
  await redis.setex('mandarin', 60 * 60, JSON.stringify(data))

  return NextResponse.json(data)
}
