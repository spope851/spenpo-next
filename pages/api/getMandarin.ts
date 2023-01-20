import { pool } from "@/utils/postgres"
import type { NextApiRequest, NextApiResponse } from "next"

export default async (
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
  const data = await pool.query(`SELECT * FROM mandarin;`)
  res.status(200).send(data.rows)
}
