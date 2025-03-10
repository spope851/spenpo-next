import prisma from '@/app/utils/prisma'
import { shuffle } from '@/app/utils/shuffle'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const truths: unknown[] =
    await prisma.$queryRaw`SELECT id, sentence, CASE when is_true then '1' else '0' end as is_true FROM wp_spenpo_truth WHERE is_true ORDER BY RAND() LIMIT 2;`
  const lie: unknown[] =
    await prisma.$queryRaw`SELECT id, sentence, CASE when is_true then '1' else '0' end as is_true FROM wp_spenpo_truth WHERE not is_true ORDER BY RAND() LIMIT 1;`

  return NextResponse.json(shuffle([...truths, ...lie]))
}
