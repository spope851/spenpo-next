import { pool } from "../../utils/postgres"

export default async (req, res) => {
  console.log("GET content  ", req.query)
  const data = await pool.query(`SELECT * FROM content ORDER BY id DESC LIMIT 1;`)
  res.status(200).send(data.rows[0])
}
