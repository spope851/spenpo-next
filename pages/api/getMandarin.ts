import { pool } from "../../utils/postgres"

export default async (req, res) => {
  console.log("GET mandarin  ", req.query)
  const data = await pool.query(`SELECT * FROM mandarin;`)
  res.status(200).send(data.rows)
}
