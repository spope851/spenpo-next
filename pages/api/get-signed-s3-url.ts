import { NextApiRequest, NextApiResponse } from "next"
import AWS from "aws-sdk"

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_SPENPO,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  signatureVersion: "v4",
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { filename, filetype } = req.query

  const signedUrl = s3.getSignedUrl("putObject", {
    Bucket: "spenpo-landing",
    Key: filename,
    Expires: 60,
    ContentType: filetype,
  })

  res.send({
    url: signedUrl,
  })
}
