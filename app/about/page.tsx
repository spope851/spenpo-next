import React from 'react'
import { Stack, Typography } from '@mui/material'
import Link from 'next/link'

export default async function About() {
  return (
    <Stack p={{ sm: 5, xs: 2 }} gap={5} mx="auto" maxWidth="50em">
      <Typography component="h1" display="flex" alignItems="baseline" gap={5}>
        About
      </Typography>
      <Typography variant="body2">
        I&apos;m a 26-year-old man who enjoys travel, dining, and programming. I live
        in northern Colorado where everybody loves the great outdoors. I like a good
        hike but don&apos;t really identify with the stereotype. I don&apos;t ski or
        snowboard much either. I have, I know it&apos;s great, and I just prefer to
        abstain. What I love is working and traveling, both independently and
        combined. I tried out the extreme combination of the two known as{' '}
        <Link
          target="_blank"
          referrerPolicy="no-referrer"
          href="https://www.reddit.com/r/digitalnomad/"
        >
          digital nomading
        </Link>{' '}
        back in 2021. I loved it, but I&apos;ve grown to appreciate the utility of a
        semi-permanent home base. Back then I was calling it a search for the best
        place to live, and I concluded my search in Fort Collins where I&apos;ve been
        ever since. That was also when I reconnected with and started dating an old
        friend from high school.
      </Typography>
      <Typography component="h1">Early life</Typography>
      <Typography variant="body2">
        I had a pretty normal upbringing in New England where I went to school and
        played sports. I had no idea what to do with a life back then and don&apos;t
        think I even understood I would have to do something with mine. I went to
        college in New Hampshire which felt a world away from my hometown in
        Connecticut. I realized the real world was around the corner just before
        turning 21 in the summer following my junior year. I read{' '}
        <Link
          target="_blank"
          referrerPolicy="no-referrer"
          href="https://www.amazon.com/Rich-Dad-Poor-Teach-Middle/dp/1612680194"
          style={{ fontStyle: 'italic' }}
        >
          Rich Dad Poor Dad
        </Link>{' '}
        that summer and got pretty pumped about adulthood while simultaneously
        denying its legitimacy. During graduation, as all my peers were posting on
        Instagram about entering &quot;the real world&quot; I was commenting
        &quot;There is no real world&quot;. I don&apos;t know what I thought was
        going to happen next, but I still refer to that as the time as when I
        &quot;came online&quot;.
      </Typography>
      <Typography component="h1">Reformed business student</Typography>
      <Typography variant="body2">
        I studied business in college. Didn&apos;t even know what that meant when I
        signed up. The business school at my university was{' '}
        <Link
          target="_blank"
          referrerPolicy="no-referrer"
          href="https://www.unh.edu/unhtoday/media-gallery/lightbox/7234/10244"
        >
          nice
        </Link>
        , so I just went with it. I quickly realized I had no interest in becoming a
        salesman, accountant, or financial professional. Then I took a class where we
        built a website for the final project, and the rest is history. I finished
        business school and did fine but focused most of my education on technology.
        The real joke is now that I built a career on technical skills I study
        business in my free time.
      </Typography>
      <Typography component="h1">Professional?</Typography>
      <Typography variant="body2">
        I still do not know what I want to be when I grow up. I&apos;m fine with that
        and still live every day pretty grateful I woke the heck up that last summer
        of college. I don&apos;t want to attribute it to a cliche book like{' '}
        <Typography fontStyle="italic" component="span" variant="body2">
          Rich Dad Poor Dad
        </Typography>
        , but something changed in me that year. It probably wouldn&apos;t have the
        same effect if I reread it now. My first years of young professional life
        taught me a lot about what I did and didn&apos;t want, and now, four and a
        half years after graduation, I continue to wonder what those things are and
        be critical of what I think they are.
      </Typography>
      <Typography component="h1">Interests</Typography>
      <Typography variant="body2">
        I am fascinated by economies and how humans use their creativity to keep this
        civilized game going. One of the most amazing business tools that I&apos;m
        endlessly interested in is the Internet. The very reason we&apos;re talking
        right now. The fact that you&apos;re accessing this website over a wire that
        any computer in the world can connect to is beyond me. I&apos;m in awe just
        thinking about it, and those are the things I love most. When I look at New
        York City and think about how a bunch of people built that while they were
        going about their lives a couple hundred years ago, I&apos;m just in awe. How
        the heck did they pull that off? I also like cooking.
      </Typography>
      <Typography component="h1">My ideal vacation?</Typography>
      <Typography variant="body2">
        I love Asia. I&apos;ve only been to a few countries, but the contrast between
        Eastern and Western cultures is amazing to me. As an American, traveling to
        an Asian country is shocking to me. I like that. I don&apos;t like beaches or
        any of the mainstream excuses to party that masquerade as urban tourism. I
        actually don&apos;t even really like sightseeing. I just like getting to know
        a new city no matter how big or small. I always make a lot of time to not
        have plans and just wander with my head up and eyes open. Sometimes even the
        least impressive new places can be marvelous in unique ways.
      </Typography>
      <Typography component="h1">Anything else?</Typography>
      <Typography variant="body2">
        I think that&apos;s enough. I like reflecting in public, but there&apos;s
        usually more of a point to it. I always try to convey what I learned from
        whatever experience I describe in my blog posts. Well, I hope you learned
        something about me here. If you want to keep up with me, everything I&apos;m
        doing can be found on this website. If you want to know what I&apos;m doing
        now, check out my &quot;<Link href="/now">now</Link>&quot; page. I don&apos;t
        use social media much, but will occasionally{' '}
        <Link
          target="_blank"
          referrerPolicy="no-referrer"
          href="https://twitter.com/s_pop3"
        >
          tweet
        </Link>{' '}
        something I think is neat. Even Twitter, I don&apos;t check weekly or even
        monthly. If you want to get ahold of me,{' '}
        <Link href="/contact">email me</Link>. Otherwise, I hope to see you out
        there.
      </Typography>
    </Stack>
  )
}
