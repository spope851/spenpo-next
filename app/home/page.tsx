import React from 'react'
import { Stack, Typography } from '@mui/material'
import { LinkPreview } from '../components/linkPreview'
import { PROJECTS } from '../constants/projects'
import { previewImages } from '../constants/blog'
import Link from 'next/link'

const LINK_PREV_PROPS = {
  backgroundColor: '#555',
  borderColor: '#555',
  primaryTextColor: '#fff',
  secondaryTextColor: '#fff',
  borderRadius: 4,
  width: 400,
}

export default async function Home() {
  const latestPost = Math.max(...Object.keys(previewImages).map((id) => Number(id)))

  return (
    <Stack p={{ sm: 5, xs: 2 }} gap={5} mx="auto" maxWidth="50em">
      <Typography component="h1">Welcome</Typography>
      <Typography variant="body2">
        I&apos;m a hard working 20-something, and if you haven&apos;t noticed, this
        is a homemade website. Handcrafted, artisan, and non-GMO. This is what I do
        most of the time. I build custom software solutions and help others ideate on
        theirs. I love a good product, and I love it when an internet thing just
        works. There&apos;s lots of fun to be had here like{' '}
        <Link href="/blog">reading</Link>, <Link href="/products">shopping</Link>,
        and <Link href="/projects/two-truths">playing games</Link>. Thanks for paying
        me a visit.
      </Typography>
      <Typography component="h1">The latest thing I&apos;ve done</Typography>
      <Typography variant="body2">
        I created a product that allows anyone to get their face on the web for dirt
        cheap.
      </Typography>
      <LinkPreview
        {...LINK_PREV_PROPS}
        url="https://www.spenpo.com/products/landing-page"
      />
      <Typography component="h1">The latest thing I&apos;ve written</Typography>
      <Typography variant="body2">
        I tried to buy a small business. My reasoning was a combination of
        entrepreneurial thirst and wanting to get to work in my community instead of
        on the interwebs for once. Here&apos;s how that went.
      </Typography>
      <LinkPreview
        {...LINK_PREV_PROPS}
        url={'https://www.spenpo.com/blog/' + latestPost}
      />
      <Typography component="h1">The latest thing I&apos;ve posted</Typography>
      <Typography variant="body2">
        I recorded this video on how I integrated Vercel&apos;s &quot;buy a
        domain&quot; functionality with my website. There were a couple key tricks
        that leverages some of the newest Next.js features.
      </Typography>
      <LinkPreview
        {...LINK_PREV_PROPS}
        url={'https://www.youtube.com/watch?v=t-THJgafWuM'}
      />
      <Typography component="h1">What I&apos;ve been tinkering with</Typography>
      <Typography variant="body2">
        I&apos;m looking for some freelance work on the side, so I picked a nice HTML
        template and converted it into a React app that I could easily spin up a copy
        of for a client.
      </Typography>
      <LinkPreview
        {...LINK_PREV_PROPS}
        url={'https://www.spenpo.com/projects/' + PROJECTS[0]}
      />
      <Typography component="h1">More about me</Typography>
      <Stack>
        <Typography variant="body2">
          See my &quot;<Link href="/about">about</Link>&quot; page for a lot more
          about me.
        </Typography>
        <Typography variant="body2">
          See my &quot;<Link href="/now">now</Link>&quot; page for what&apos;s going
          on now.
        </Typography>
      </Stack>
      <Typography component="h1">Contact me</Typography>
      <Typography variant="body2">
        Please <Link href="/contact">reach out</Link> for anything at all. I respond
        to email and I&apos;m always glad to e-meet someone new.
      </Typography>
    </Stack>
  )
}
