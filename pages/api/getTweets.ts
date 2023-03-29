import redis from "@/utils/redis"
import type { NextApiRequest, NextApiResponse } from "next"

const getTweets = async (
  req: NextApiRequest,
  res: NextApiResponse<Record<string, any>>
) => {
  console.log("GET tweets  ", req.query)
  const count = req.query.count
  const cachedTweets = await redis.get(`tweets/${count}`)
  if (cachedTweets) return res.send(JSON.parse(cachedTweets))
  return await fetch(
    `https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=s_pop3&count=${count}&tweet_mode=extended`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TWITTER_BEARER}`,
      },
    }
  )
    .then((data) => data.json())
    .then(async (tweets) => {
      await redis.setex(`tweets/${count}`, 60, JSON.stringify(tweets))
      return res.send(tweets)
    })
}

export default getTweets
