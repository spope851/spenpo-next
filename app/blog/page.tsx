import { Stack, Typography } from '@mui/material'
import { WORDPRESS_ROOT } from '../constants/blog'
import { PostList } from './components/PostList'
import { OneThingLayout } from '../components/OneThingLayout'
import { RobotError } from '../components/RobotError'

export default async function Blog() {
  // TODO: add pagination and remove per_page query
  const posts = await fetch(`${WORDPRESS_ROOT}/posts?per_page=11`).then((res) =>
    res.json()
  )
  const found = posts.length

  return (
    <Stack p={{ sm: 5, xs: 2 }} gap={5} mx="auto" maxWidth="50em">
      <Typography component="h1">Blog</Typography>
      {posts ? (
        <Stack gap={{ sm: 5, xs: 2 }}>
          <PostList posts={posts} />
          <Typography textAlign="right">
            {`displaying ${found} post${found && found > 1 ? 's' : ''} of ${found}`}
          </Typography>
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
