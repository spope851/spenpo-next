import { getLinkPreview as fetchData } from '@/app/utils/getLinkPreview'
import type { NextApiRequest, NextApiResponse } from 'next'

type LinkPreview = {
  title: string
  description: string
  image: string
  siteName: string
  hostname: string
}

const getLinkPreview = async (
  req: NextApiRequest,
  res: NextApiResponse<LinkPreview>
) => {
  // console.log('GET link preview  ', req.query)
  const url = String(req.query.url)

  const lp = await fetchData(url)

  res.send(lp)
}

export default getLinkPreview
