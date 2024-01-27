'use client'
import { Grid, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { OneThingLayout } from '@/app/components/oneThingLayout'
import { RobotError } from '@/app/components/robotError'
import { TagList } from './tagList'
import { GetBlogPostsQuery } from '@/app/blog/page'
import { GetBlogPostsWithTagQuery } from '@/app/blog/tag/[tag]/page'

const Post: React.FC<{ children: React.ReactNode; href: string }> = ({
  children,
  href,
}) => {
  const router = useRouter()

  return (
    <Grid
      item
      xl={3}
      lg={4}
      md={6}
      sm={12}
      xs={12}
      display="flex"
      textAlign="center"
    >
      <Stack
        onClick={() => router.push(`/blog/${href}`)}
        border="solid #999"
        p={2}
        borderRadius={1}
        sx={{
          ':hover': {
            cursor: 'pointer',
            backgroundColor: '#ddd',
          },
        }}
      >
        {children}
      </Stack>
    </Grid>
  )
}

export const PostList: React.FC<{
  posts: GetBlogPostsQuery | GetBlogPostsWithTagQuery
}> = ({ posts }) => {
  const found = posts.allPosts.found
  const [dates, setDates] = useState<string[]>(
    posts.allPosts.posts.map((post) => new Date(post.date).toUTCString())
  )
  useEffect(() => {
    setDates(
      posts.allPosts.posts.map((post) => new Date(post.date).toLocaleDateString())
    )
  }, [posts.allPosts.posts])

  return posts ? (
    <Stack gap={3}>
      <Grid container spacing={3}>
        {posts.allPosts.posts.map(({ ID, title, excerpt, tags }, idx) => (
          <Post key={ID} href={ID}>
            <Typography variant="caption" align="right">
              {dates[idx]}
            </Typography>
            <Typography variant="h6">{title}</Typography>
            <Typography
              component="span"
              dangerouslySetInnerHTML={{ __html: excerpt.split(/[\[\]]/).join('') }}
            />
            <TagList tags={tags} />
          </Post>
        ))}
      </Grid>
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
  )
}
