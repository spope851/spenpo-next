import { NextApiRequest, NextApiResponse } from 'next'
import redis from '@/app/utils/redis'
import { authOptions } from '../auth/[...nextauth]'
import { getServerSession } from 'next-auth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)
  const BODY = JSON.parse(req.body)
  await redis.hmset(session.user.id, BODY)
  await redis.expire(session.user.id, 300)
  res.json({ status: 200, message: 'cached successfully' })
}
