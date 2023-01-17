import styled from "@emotion/styled"
import { Box, Link } from "@mui/material"
import React from "react"
import { GetBlogPostsQuery, GetBlogPostsWithTagQuery } from "../generated/graphql"

const Post = styled(Box)`
  display: flex;
  flex-direction: column;
  border: solid #aaa;
  border-radius: 5px;
  padding: 20px;
  margin: 50px 25px 0px 50px;
  text-align: center;
  justify-content: space-between;
  flex: 1 1 0px;
`

export const PostList: React.FC<{
  posts?: GetBlogPostsQuery | GetBlogPostsWithTagQuery
  loading: boolean
}> = ({ posts, loading }) => {
  if (loading) return <>...Loading</>

  return (
    <Box
      style={{
        width: "50%",
        margin: "auto",
      }}
    >
      {posts?.allPosts.posts.map(({ ID, title, date, excerpt, tags }) => (
        <Post key={ID}>
          <p>{new Date(date).toLocaleDateString()}</p>
          <p>
            <Link href={`/blog/${ID}`}>{title}</Link>
          </p>
          <p dangerouslySetInnerHTML={{ __html: excerpt }} />
          <p>
            {tags.map((tag) => (
              <Link
                href={`/blog/tag/${tag.slug}`}
                key={tag.ID}
                style={{
                  margin: 3,
                }}
              >
                {tag.name}
              </Link>
            ))}
          </p>
        </Post>
      ))}
    </Box>
  )
}
