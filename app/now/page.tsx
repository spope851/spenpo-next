import React from 'react'
import { Stack, Typography } from '@mui/material'
import Link from 'next/link'
import { WORDPRESS_ROOT } from '../constants/blog'

const getPost = async () =>
  fetch(`${WORDPRESS_ROOT}/posts?tag=now&number=1`).then((res) => res.json())

export default async function Now() {
  const post = await getPost().then((res) => res?.posts?.[0])

  return (
    <Stack p={{ sm: 5, xs: 2 }} gap={5} mx="auto" maxWidth="50em">
      <Typography
        component="h1"
        alignItems="baseline"
        display="flex"
        gap={5}
        justifyContent="space-between"
      >
        Now
        <Typography display="flex" gap={5}>
          <Link
            href="https://nownownow.com/about"
            target="_blank"
            referrerPolicy="no-referrer"
          >
            inspired by Derek Sivers
          </Link>
          {post?.date && new Date(post.date).toLocaleDateString()}
        </Typography>
      </Typography>
      {post ? (
        <Typography
          variant="body2"
          dangerouslySetInnerHTML={{ __html: post.content }}
          sx={{
            h3: {
              fontSize: 30,
              fontWeight: 400,
              my: 5,
            },
            'p:first-child': {
              mt: 0,
            },
          }}
        />
      ) : (
        <Typography variant="body2">
          Hold up... wait a minute... somethin ain&apos;t right
        </Typography>
      )}
      <Typography variant="body2">
        All updates to this page are archived <Link href="/blog/tag/now">here</Link>.
      </Typography>
    </Stack>
  )
}
