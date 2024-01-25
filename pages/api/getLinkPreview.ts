import { LINK_PREVIEW_FALLBACK } from '@/app/constants/image'
import parser from 'html-metadata-parser'
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

  try {
    const { meta, og, images } = await parser(url)
    const { hostname } = new URL(url)
    const image = og.image
      ? og.image
      : images?.length && images.length > 0
      ? (images[0] as unknown as { src: string }).src
      : ''
    const description = og.description
      ? og.description
      : meta.description
      ? meta.description
      : ''
    const title = (og.title ? og.title : meta.title) || ''
    const siteName = og.site_name || ''

    res.send({
      title,
      description,
      image,
      siteName,
      hostname,
    })
  } catch {
    res.send({
      title: 'Unavailable',
      description: 'deployment in progress...',
      image: LINK_PREVIEW_FALLBACK,
      siteName: '',
      hostname: url,
    })
  }
}

export default getLinkPreview
