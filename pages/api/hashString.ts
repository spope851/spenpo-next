import type { NextApiRequest, NextApiResponse } from "next"
import argon2 from "argon2"

const hashString = async (
  req: NextApiRequest,
  res: NextApiResponse<Record<"hash", string>>
) => {
  console.log("GET tweets  ", req.query)
  const hash = await argon2.hash(JSON.parse(req.body).string)
  res.status(200).send({ hash })
}

export default hashString
