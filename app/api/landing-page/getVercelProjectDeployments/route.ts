import { getProjectDeployments } from '@/app/services/vercel'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const appName = req.nextUrl.searchParams.get('appName')
  // console.log('GET project deployments ', req.query)

  const projectDeploymentsReq = await getProjectDeployments(String(appName))
  const projectDeployments = await projectDeploymentsReq.json()

  return NextResponse.json(projectDeployments)
}
