import React from 'react'
import { Stack, Typography } from '@mui/material'
import { WP_REST_URI } from '../constants/blog'

const getPost = async () =>
  fetch(`${WP_REST_URI}/pages?slug=about`).then((res) => res.json())

export default async function About() {
  const post = await getPost().then((res) => res?.[0])

  return (
    <Stack p={{ sm: 5, xs: 2 }} gap={5} mx="auto" maxWidth="50em">
      <Typography
        component="h1"
        alignItems="baseline"
        display="flex"
        gap={5}
        justifyContent="space-between"
      >
        About
        <Typography display="flex" gap={5}>
          {post?.date && new Date(post.date).toLocaleDateString()}
        </Typography>
      </Typography>
      {post ? (
        <Typography
          variant="body2"
          component="div"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />
      ) : (
        <Typography variant="body2">
          Hold up... wait a minute... somethin ain&apos;t right
        </Typography>
      )}
    </Stack>
  )
}
