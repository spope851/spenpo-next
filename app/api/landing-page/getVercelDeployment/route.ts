import { getDeployment } from '@/app/services/vercel'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const uid = req.nextUrl.searchParams.get('uid')
  // console.log('GET deployment ', req.query)

  const deploymentReq = await getDeployment(String(uid))
  const deployment = await deploymentReq.json()

  return NextResponse.json(deployment)
}
