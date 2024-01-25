import { getProjectDeployments } from '@/app/services/vercel'
import type { NextApiRequest, NextApiResponse } from 'next'

const getVercelProjectDeployments = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  // console.log('GET project deployments ', req.query)

  const projectDeploymentsReq = await getProjectDeployments(
    String(req.query.appName)
  )
  const projectDeployments = await projectDeploymentsReq.json()

  return res.status(200).send(projectDeployments)
}

export default getVercelProjectDeployments
