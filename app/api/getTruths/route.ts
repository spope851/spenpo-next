import { pool } from '@/app/utils/postgres'
import { shuffle } from '@/app/utils/shuffle'
import { NextResponse } from 'next/server'

export async function GET() {
  const truths = await pool.query(
    `SELECT * FROM truths WHERE is_true = CAST(1 as BIT) ORDER BY random() LIMIT 2;`
  )
  const lie = await pool.query(
    `SELECT * FROM truths WHERE is_true != CAST(1 as BIT) ORDER BY random() LIMIT 1;`
  )
  const twoTruths = truths.rows
  twoTruths.push(lie.rows[0])

  return NextResponse.json(shuffle(twoTruths))
}
