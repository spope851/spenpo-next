import { PostList } from '@/app/blog/components/PostList'
import { Box, Chip, Stack, Typography } from '@mui/material'
import { PageProps } from '@/app/types/app'
import { redirect } from 'next/navigation'
import { WP_REST_URI } from '@/app/constants/blog'

export default async function Tag({ params }: PageProps) {
  const tag = await fetch(`${WP_REST_URI}/tags/${params.tag}`).then((res) =>
    res.json()
  )

  if (!tag || !tag.name || tag.code === 'rest_term_invalid') {
    return redirect('/blog')
  }

  const allPosts = await fetch(
    `${WP_REST_URI}/posts${tag ? `?tags=${tag.id}` : '/'}`
  ).then((res) => res.json())

  // removes spaces, dashes, forward slashes, and makes lower case
  // const lettersOnly = (slugOrName: string) =>
  //   slugOrName.replace(/[- /]/g, '').toLowerCase()
  // const actualName = allPosts[0]?.tags.find(
  //   (postTag: { name: string }) => lettersOnly(postTag.name) === lettersOnly(tag)
  // )
  // const name = actualName?.name || null

  if (allPosts && allPosts.length > 0)
    return (
      <Stack p={{ sm: 5, xs: 2 }} gap={{ sm: 5, xs: 2 }} mx="auto" maxWidth="50em">
        <Box display="flex" gap={1} alignItems="center">
          <Typography component="h1">Tag:</Typography>
          <Chip
            color="primary"
            label={tag.name}
            size="medium"
            sx={{
              m: '1px',
            }}
          />
        </Box>
        <PostList posts={allPosts} />
      </Stack>
    )
  else redirect('/blog')
}
