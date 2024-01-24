import { NextApiRequest, NextApiResponse } from 'next'
import redis from '@/utils/redis'
import { authOptions } from '../auth/[...nextauth]'
import { getServerSession } from 'next-auth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)
  const BODY = JSON.parse(req.body)
  await redis.hmset(String(session?.user.email), BODY)
  await redis.expire(String(session?.user.email), 300)
  res.json({ [String(session?.user.email)]: BODY })
}
