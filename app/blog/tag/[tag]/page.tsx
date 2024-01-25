import { PostList } from '@/app/blog/components/postList'
import { BackButton } from '@/app/components/backButton'
import { Box, Chip } from '@mui/material'
import { extractTagsFromPosts } from '@/app/utils/extractTags'
import { PageProps } from '@/app/types/app'
import { redirect } from 'next/navigation'

export type GetBlogPostsWithTagQuery = {
  __typename?: 'Query'
  allPosts: {
    __typename?: 'Posts'
    found: number
    posts: Array<{
      __typename?: 'BlogPost'
      ID: string
      content: string
      title: string
      date: string
      excerpt: string
      tags: Array<{
        __typename?: 'Tag'
        name: string
        ID: string
        slug: string
        post_count?: number | null
      }>
    }>
  }
}

export default async function Blog({ params }: PageProps) {
  const tag = params.tag
  const allPosts = await fetch(
    `https://public-api.wordpress.com/rest/v1.1/sites/182626139/posts${
      tag ? `?tag=${tag}` : '/'
    }`
  )
    .then((res) => res.json())
    .then(extractTagsFromPosts)

  // removes spaces, dashes, forward slashes, and makes lower case
  const lettersOnly = (slugOrName: string) =>
    slugOrName.replace(/[- /]/g, '').toLowerCase()
  const actualName = allPosts.posts[0]?.tags.find(
    (postTag: { name: string }) => lettersOnly(postTag.name) === lettersOnly(tag)
  )
  const name = actualName?.name || null

  if (allPosts.posts && allPosts.posts.length > 0)
    return (
      <>
        <Box
          mt={5}
          display="grid"
          gridTemplateColumns="1fr 1fr 1fr"
          flexWrap="wrap-reverse"
          alignItems="flex-end"
        >
          <BackButton sx={{ gridColumn: 1, m: 'auto' }} />
          <Chip
            color="primary"
            label={name}
            sx={{
              mx: 'auto',
              fontSize: 16,
              gridColumn: 2,
            }}
          />
        </Box>
        <PostList posts={{ allPosts }} />
      </>
    )
  else redirect('/blog')
}
