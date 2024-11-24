import { Stack, Typography } from '@mui/material'
import { WP_REST_URI } from '../constants/blog'
import { PostList } from './components/PostList'
import { OneThingLayout } from '../components/OneThingLayout'
import { RobotError } from '../components/RobotError'
import { PaginationControls } from './components/PaginationControls'

type BlogProps = {
  searchParams: { page?: string }
}

export default async function Blog({ searchParams }: BlogProps) {
  const page = Number(searchParams.page) || 1
  const postsPerPage = 10

  const res = await fetch(
    `${WP_REST_URI}/posts?per_page=${postsPerPage}&page=${page}`
  )
  const posts = await res.json()
  const totalPosts = parseInt(res.headers.get('X-WP-Total') || '0')
  const totalPages = Math.ceil(totalPosts / postsPerPage)

  return (
    <Stack p={{ sm: 5, xs: 2 }} gap={5} mx="auto" maxWidth="50em" flex={1}>
      <Typography component="h1">Blog</Typography>
      {posts ? (
        <Stack gap={{ sm: 5, xs: 2 }} flex={1} justifyContent="space-between">
          <PostList posts={posts} />
          <PaginationControls
            totalPages={totalPages}
            currentPage={page}
            totalPosts={totalPosts}
            displayedPosts={posts.length}
          />
        </Stack>
      ) : (
        <OneThingLayout>
          <RobotError>
            <Typography component="p">deepest apologies,</Typography>
            <Typography component="p">somethings wrong with our server</Typography>
          </RobotError>
        </OneThingLayout>
      )}
    </Stack>
  )
}
