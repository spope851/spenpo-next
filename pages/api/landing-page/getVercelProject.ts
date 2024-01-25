import { getProject } from '@/app/services/vercel'
import type { NextApiRequest, NextApiResponse } from 'next'

const getVercelProject = async (req: NextApiRequest, res: NextApiResponse) => {
  // console.log('GET project ', req.query)

  const projectReq = await getProject(String(req.query.name))
  const project = await projectReq.json()

  return res.status(200).send(project)
}

export default getVercelProject
