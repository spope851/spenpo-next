import parser from "html-metadata-parser"
import type { NextApiRequest, NextApiResponse } from "next"

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
  console.log("GET link preview  ", req.query)
  const url = String(req.query.url)

  await parser(url, {
    method: "get",
    headers: {
      "Accept-Encoding": "gzip,deflate,br",
    },
  }).then(async ({ meta, og, images }) => {
    console.log(meta, og, images)

    const { hostname } = new URL(url)
    let image = og.image
      ? og.image
      : images?.length && images.length > 0
      ? (images[0] as unknown as { src: string }).src
      : ""
    const description = og.description
      ? og.description
      : meta.description
      ? meta.description
      : ""
    const title = (og.title ? og.title : meta.title) || ""
    const siteName = og.site_name || ""

    res.send({
      title,
      description,
      image,
      siteName,
      hostname,
    })
  })
  // .then(async (tweets) => {
  //   await redis.setex(`tweets/${count}`, 60, JSON.stringify(tweets))
  //   return res.send(tweets)
  // })
}

export default getLinkPreview
