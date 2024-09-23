import React from 'react'
import { Stack, Typography } from '@mui/material'
import { WORDPRESS_ROOT } from '../constants/blog'
import Link from 'next/link'

import { LinkPreview } from '../components/LinkPreview'

const LINK_PREV_PROPS = {
  backgroundColor: '#555',
  borderColor: '#555',
  primaryTextColor: '#fff',
  secondaryTextColor: '#fff',
  borderRadius: 4,
  width: 400,
}

const getPost = async () =>
  fetch(`${WORDPRESS_ROOT}/pages?slug=welcome`).then((res) => res.json())

export default async function Home() {
  const post = await getPost().then((res) => res?.[0])

  const html = post.content.rendered

  return (
    <Stack p={{ sm: 5, xs: 2 }} gap={5} mx="auto" maxWidth="50em">
      <Typography
        component="h1"
        alignItems="baseline"
        display="flex"
        gap={5}
        justifyContent="space-between"
      >
        Welcome
        <Typography display="flex" gap={5}>
          {post?.modified && new Date(post.modified)?.toLocaleDateString()}
        </Typography>
      </Typography>
      {post ? (
        <Stack>
          {html.split('\n').map((content: string, i: string) => {
            if (content.length < 8) return <React.Fragment key={i}></React.Fragment>

            if (content.indexOf('zwt-wp-lnk-prev') > -1) {
              const href = content.split('href="')[1].split('"')[0]
              return <LinkPreview key={i} {...LINK_PREV_PROPS} url={href} />
            }

            return (
              <Typography
                key={i}
                variant="body2"
                dangerouslySetInnerHTML={{ __html: content }}
                component="div"
              />
            )
          })}
        </Stack>
      ) : (
        <Typography variant="body2">
          Hold up... wait a minute... somethin ain&apos;t right
        </Typography>
      )}
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
      <Typography component="h1">Privacy Policy</Typography>
      <Typography variant="body2">
        Now that I have enabled third-party login features so that I can identify
        users who make purchases on my site, I am required to have a privacy policy.
        You can find it <Link href="/privacy">here</Link>.
      </Typography>
    </Stack>
  )
}
