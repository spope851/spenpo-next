import { Content } from "@/components/whats-new"
import { pool } from "@/utils/postgres"
import type { NextApiRequest, NextApiResponse } from "next"

const getContent = async (req: NextApiRequest, res: NextApiResponse<Content>) => {
  console.log("GET content  ", req.query)
  const data = await pool.query(`SELECT * FROM content ORDER BY id DESC LIMIT 1;`)
  res.status(200).send(data.rows[0])
}

export default getContent
