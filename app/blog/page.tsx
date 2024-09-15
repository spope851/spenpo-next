import { PostList } from './components/PostList'
import { extractTagsFromPosts } from '@/app/utils/extractTags'
import { Stack, Typography } from '@mui/material'
import { WORDPRESS_ROOT } from '../constants/blog'

export type Tag = {
  __typename?: 'Tag'
  name: string
  ID: string
  slug: string
  post_count?: number | null
}

export type Post = {
  __typename?: 'BlogPost'
  ID: string
  content: string
  title: string
  date: string
  excerpt: string
  tags: Array<Tag>
}

export type GetBlogPostsQuery = {
  __typename?: 'Query'
  allPosts: {
    __typename?: 'Posts'
    found: number
    posts: Array<Post>
  }
}

export default async function Blog() {
  const allPosts = await fetch(
    `${WORDPRESS_ROOT}/posts?fields=ID,title,excerpt,tags,date`
  )
    .then((res) => res.json())
    .then(extractTagsFromPosts)
  const data: GetBlogPostsQuery = { allPosts }
  return (
    <Stack m={{ xs: 2, sm: 5 }} gap={5}>
      <Typography component="h1" textAlign="center" fontStyle="italic">
        spenpo.blog
      </Typography>
      <PostList posts={data} />
    </Stack>
  )
}
