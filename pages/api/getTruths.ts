import { pool } from '@/app/utils/postgres'
import { shuffle } from '@/app/utils/shuffle'
import type { NextApiResponse } from 'next'

export interface Truth {
  id: number
  is_true: string
  sentence: string
}

const getTruths = async (res: NextApiResponse<Truth[]>) => {
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

export default getTruths
