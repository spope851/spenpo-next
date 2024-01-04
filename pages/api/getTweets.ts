import redis from '@/utils/redis'
import type { NextApiRequest, NextApiResponse } from 'next'

const getTweets = async (
  req: NextApiRequest,
  res: NextApiResponse<Record<string, unknown>>
) => {
  console.log('GET tweets  ', req.query)
  const count = req.query.count
  const cachedTweets = await redis.get(`tweets/${count}`)
  if (cachedTweets) return res.send(JSON.parse(cachedTweets))
  return await fetch(`https://api.twitter.com/2/users/426987433/tweets`, {
    headers: {
      Authorization: `Bearer ${process.env.TWITTER_BEARER}`,
    },
  })
    .then((data) => data.json())
    .then(async (tweets) => {
      await redis.setex(`tweets/${count}`, 60, JSON.stringify(tweets))
      return res.send(tweets)
    })
}

export default getTweets
