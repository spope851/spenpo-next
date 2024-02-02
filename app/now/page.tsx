import React from 'react'
import { Stack, Typography } from '@mui/material'
import Link from 'next/link'

export default async function Now() {
  return (
    <Stack p={{ sm: 5, xs: 2 }} gap={5} mx="auto" maxWidth="50em">
      <Typography component="h1" display="flex" alignItems="baseline" gap={5}>
        Now
        <Typography>
          <Link
            href="https://nownownow.com/about"
            target="_blank"
            referrerPolicy="no-referrer"
          >
            inspired by Derek Sivers
          </Link>
        </Typography>
        <Typography>2/1/2024</Typography>
      </Typography>
      <Typography variant="body2">
        Still living in Fort Collins and loving it. Winter is always a great season
        for productivity and I&apos;m programming at least six days a week. Daily
        programming usually consists of adding features to my new client platform,
        small enhancements to other parts of this website, or trying some entirely
        new tech thing to keep life fresh. I&apos;ve been loving this style of work
        in the afternoon and late at night. On days that I don&apos;t have to leave
        the apartment, I&apos;ll start off drinking{' '}
        <Link
          target="_blank"
          referrerPolicy="no-referrer"
          href="https://www.youtube.com/watch?v=f87wvXMa-Rk"
        >
          yerba mate
        </Link>{' '}
        and reading{' '}
        <Link
          target="_blank"
          referrerPolicy="no-referrer"
          href="https://www.theonion.com/"
        >
          The Onion&apos;s
        </Link>{' '}
        <Link
          target="_blank"
          referrerPolicy="no-referrer"
          href="https://www.amazon.com/Our-Dumb-Century-Presents-Headlines/dp/0609804618"
          style={{ fontStyle: 'italic' }}
        >
          Our Dumb Century
        </Link>
        . It&apos;s absolute nonsense and puts me in a fun mood before sitting down
        to work. Also, if time permits, I&apos;ve been trying, (and failing
        constantly), to build a daily writing habit. Most days though, I&apos;ve been{' '}
        <Link href="#business">going out into the world</Link> and when I get back I
        just try to get something done. Anything, to make it a good day. I&apos;d
        love to be more active on <Link href="/blog">my blog</Link> and other
        channels this year.
      </Typography>
      <Typography component="h1">New client platform</Typography>
      <Typography variant="body2">
        You may have noticed this site has a little user component at the top right
        now. I&apos;ve added a suite of platform features that allow authenticated
        users to manage websites and other software they&apos;ve gotten through me.
        It&apos;s been fun to think about client collaboration and build features
        around it. The need stemmed from my{' '}
        <Link href="/products/landing-page">new product</Link>, which is a dead
        simple landing page that my users can customize and deploy right from this
        site, and blossomed into providing all these interesting project management
        functions that continue to grow. I have a couple of guinea pigs using it
        which is pretty motivating. And, I&apos;m constantly dreaming up new features
        to push out and working through whether they would be useful or not. Next up
        is all things DNS and domain management.
      </Typography>
      <Typography component="h1" id="business">
        Going out into the world
      </Typography>
      <Typography variant="body2">
        The rest of my productive hours have been going towards networking and
        business engagements. I&apos;ve been setting up 3-6 of these a week just to
        get to know my local business community. I&apos;m also newly unemployed, so
        I&apos;ve been using that opportunity to start putting myself out there as an
        independent software agency. Mostly I just have a lot of one-on-ones with
        local business owners to feed my business curiosity. It&apos;s fascinating,
        and developing the connections always puts me in a great mood. One of the
        reasons I&apos;ve become interested in{' '}
        <Link href="/blog/159">buying local businesses</Link> is this newfound urge
        to be known in my community. I like it here and want to participate all of a
        sudden, so loitering around small biz water coolers has been a nice way to
        start integrating.
      </Typography>
      <Typography component="h1">Additionally</Typography>
      <Typography variant="body2">
        I&apos;ve been on the caffeine grind, which is great, but tiring. Abstaining
        now and then is always a well-deserved break. I&apos;ve been taking it easy
        in the gym and sticking to full-body workouts 3-4 times a week. Cardio is
        just walking these days. Two things I&apos;ve taken a break from are{' '}
        <Link
          target="_blank"
          referrerPolicy="no-referrer"
          href="https://www.goruck.com/pages/what-is-rucking"
        >
          rucking
        </Link>{' '}
        and the{' '}
        <Link
          target="_blank"
          referrerPolicy="no-referrer"
          href="https://www.youtube.com/shorts/1K2GIpSd8ws"
        >
          assault bike
        </Link>
        , but they&apos;ll be back. I&apos;ve sort of taken a break from music too.
        Numbers were down on the Spotify wrapped last year. That, of course, will be
        back as well. I could never escape music, but I&apos;m loving silent work
        sessions right now so, it must be a natural downturn.
      </Typography>
    </Stack>
  )
}
