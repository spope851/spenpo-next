import { getDeploymentEvents } from "@/services/vercel"
import type { NextApiRequest, NextApiResponse } from "next"
import { Readable } from "stream"

const getVercelDeploymentEvents = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  console.log("GET deployment events ", req.query)

  const deploymentEvents = await getDeploymentEvents(String(req.query.uid))

  const stream = Readable.from(deploymentEvents.body as unknown as Iterable<any>)
  stream.pipe(res)
}

export default getVercelDeploymentEvents
