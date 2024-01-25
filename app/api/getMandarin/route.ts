import { pool } from '@/app/utils/postgres'
import redis from '@/app/utils/redis'
import { NextResponse } from 'next/server'

export async function GET() {
  const cachedWords = await redis.get('mandarin')
  if (cachedWords) return NextResponse.json(JSON.parse(cachedWords))
  const data = await pool.query(`SELECT * FROM mandarin;`)
  await redis.setex('mandarin', 60 * 60, JSON.stringify(data.rows))

  return NextResponse.json(data.rows)
}
