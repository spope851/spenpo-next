import { NextApiRequest, NextApiResponse } from "next"
import redis from "@/utils/redis"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const BODY = JSON.parse(req.body)
  await redis.hmset(BODY.id, BODY.cache)
  await redis.expire(BODY.id, 60)
  res.json({ [BODY.id]: BODY.cache })
}