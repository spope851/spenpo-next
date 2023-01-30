import { Box, styled, Typography } from "@mui/material"
import { useRouter } from "next/router"
import React, { useState } from "react"
import { OneThingLayout } from "@/components/oneThingLayout"
import { RobotError } from "@/components/robotError"
import { GetBlogPostsQuery, GetBlogPostsWithTagQuery } from "@/generated/graphql"
import { TagList } from "./tagList"

const Wrapper = styled(Box)`
  width: 60%;
  margin: 0 auto;
  ${({ theme }) => theme.breakpoints.down("md")} {
    width: 85%;
  }
  ${({ theme }) => theme.breakpoints.down("sm")} {
    width: 100%;
  }
`

const Post: React.FC<{ children: React.ReactNode; href: string }> = ({
  children,
  href,
}) => {
  const router = useRouter()
  const [bg, setBg] = useState<string>()

  const StyledBox = styled(Box)`
    display: flex;
    flex-direction: column;
    border: solid #999;
    border-radius: 5px;
    padding: 20px;
    margin: 50px;
    text-align: center;
    justify-content: space-between;
    flex: 1 1 0px;
    background-color: ${bg};
    cursor: ${bg && "pointer"};
    ${({ theme }) => theme.breakpoints.down("md")} {
      margin: 20px;
    }
  `
  return (
    <StyledBox
      onMouseOver={() => setBg("#ddd")}
      onMouseOut={() => setBg(undefined)}
      onClick={() => router.push(`/blog/${href}`)}
    >
      {children}
    </StyledBox>
  )
}

const NumberPosts = styled(Typography)`
  ${({ theme }) => theme.breakpoints.down("md")} {
    margin-right: 10px;
  }
`

export const PostList: React.FC<{
  posts?: GetBlogPostsQuery | GetBlogPostsWithTagQuery
  loading: boolean
}> = ({ posts, loading }) => {
  if (loading) return <OneThingLayout>...Loading</OneThingLayout>

  const found = posts?.allPosts.found

  return posts ? (
    <Wrapper>
      {posts.allPosts.posts.map(({ ID, title, date, excerpt, tags }) => (
        <Post key={ID} href={ID}>
          <Typography variant="caption" align="right">
            {new Date(date).toLocaleDateString()}
          </Typography>
          <Typography variant="h6">{title}</Typography>
          <Typography dangerouslySetInnerHTML={{ __html: excerpt }} />
          <TagList tags={tags} />
        </Post>
      ))}
      <NumberPosts textAlign="right" mb="50px">
        {`showing ${found} post${found && found > 1 ? "s" : ""} of ${found}`}
      </NumberPosts>
    </Wrapper>
  ) : (
    <RobotError>
      <Typography component="p">deepest apologies,</Typography>
      <Typography component="p">somethings wrong with our server</Typography>
    </RobotError>
  )
}
