export default async (req, res) => {
  console.log("GET tweets  ", req.query)
  return await fetch(
    `https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=s_pop3&count=${req.query.count}&tweet_mode=extended`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TWITTER_BEARER}`,
      },
    }
  )
    .then((data) => data.json())
    .then((r) => res.send(r))
}
