/* eslint-disable @typescript-eslint/no-explicit-any */
import { getDeploymentEvents } from '@/app/services/vercel'
import { NextApiRequest } from 'next'

export const config = {
  runtime: 'edge',
}

const getVercelDeploymentEvents = async (req: NextApiRequest) => {
  const uid = new URL(req.url!).searchParams.get('uid')
  // console.log('GET deployment events ', uid)

  const response = await getDeploymentEvents(String(uid))

  const stream = new ReadableStream({
    async start(controller) {
      for await (const chunk of response.body as any) {
        try {
          controller.enqueue(chunk)
        } catch (e) {
          controller.error(e)
        }
      }
      controller.close()
    },
  })

  return new Response(stream)
}

export default getVercelDeploymentEvents
