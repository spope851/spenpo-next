import parser from 'html-metadata-parser'
import { LINK_PREVIEW_FALLBACK } from '../constants/image'

export async function getLinkPreview(url: string) {
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

    return {
      title,
      description,
      image,
      siteName,
      hostname,
    }
  } catch {
    return {
      title: 'Unavailable',
      description: 'deployment in progress...',
      image: LINK_PREVIEW_FALLBACK,
      siteName: '',
      hostname: url,
    }
  }
}
