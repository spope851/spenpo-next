import { getDeployment } from "@/services/vercel"
import type { NextApiRequest, NextApiResponse } from "next"

const getVercelDeployment = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("GET deployment ", req.query)

  const deploymentReq = await getDeployment(String(req.query.uid))
  const deployment = await deploymentReq.json()

  return res.status(200).send(deployment)
}

export default getVercelDeployment
