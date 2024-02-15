/* eslint-disable @typescript-eslint/no-explicit-any */
import { getDeploymentEvents } from '@/app/services/vercel'
import { type NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const uid = req.nextUrl.searchParams.get('uid')
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
