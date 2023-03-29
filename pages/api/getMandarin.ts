import { pool } from "@/utils/postgres"
import redis from "@/utils/redis"
import type { NextApiRequest, NextApiResponse } from "next"

const getMandarin = async (
  req: NextApiRequest,
  res: NextApiResponse<
    {
      id: number
      meaning: string
      pinyin: string
      simplified: string
      traditional: string
    }[]
  >
) => {
  console.log("GET mandarin  ", req.query)
  const cachedWords = await redis.get("mandarin")
  if (cachedWords) return res.send(JSON.parse(cachedWords))
  const data = await pool.query(`SELECT * FROM mandarin;`)
  await redis.setex("mandarin", 60 * 60, JSON.stringify(data.rows))
  return res.status(200).send(data.rows)
}

export default getMandarin
