import { pool } from "../../utils/postgres"
import { shuffle } from "../../utils/shuffle"

export default async (req, res) => {
  console.log("GET truths  ", req.query)
  const truths = await pool.query(
    `SELECT * FROM truths WHERE is_true = CAST(1 as BIT) ORDER BY random() LIMIT 2;`
  )
  const lie = await pool.query(
    `SELECT * FROM truths WHERE is_true != CAST(1 as BIT) ORDER BY random() LIMIT 1;`
  )
  const twoTruths = truths.rows
  twoTruths.push(lie.rows[0])
  res.status(200).send(shuffle(twoTruths))
}
