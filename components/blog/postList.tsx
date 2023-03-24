import { Box, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { OneThingLayout } from "@/components/oneThingLayout"
import { RobotError } from "@/components/robotError"
import { GetBlogPostsQuery, GetBlogPostsWithTagQuery } from "@/generated/graphql"
import { TagList } from "./tagList"

const Wrapper = styled(Box)(({ theme }) => ({
  width: "60%",
  margin: "0 auto",
  [theme.breakpoints.down("md")]: {
    width: "85%",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}))

const Post: React.FC<{ children: React.ReactNode; href: string }> = ({
  children,
  href,
}) => {
  const router = useRouter()

  const StyledBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    border: "solid #999",
    borderRadius: "5px",
    padding: "20px",
    margin: "50px",
    textAlign: "center",
    justifyContent: "space-between",
    flex: "1 1 0px",
    [theme.breakpoints.down("md")]: {
      margin: "20px",
    },
    ":hover": {
      cursor: "pointer",
      backgroundColor: "#ddd",
    },
  }))

  return (
    <StyledBox onClick={() => router.push(`/blog/${href}`)}>{children}</StyledBox>
  )
}

const NumberPosts = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    marginRight: "10px",
  },
}))

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
    <Wrapper>
      {posts.allPosts.posts.map(({ ID, title, excerpt, tags }, idx) => (
        <Post key={ID} href={ID}>
          <Typography variant="caption" align="right">
            {dates[idx]}
          </Typography>
          <Typography variant="h6">{title}</Typography>
          <Typography
            component="span"
            dangerouslySetInnerHTML={{ __html: excerpt }}
          />
          <TagList tags={tags} />
        </Post>
      ))}
      <NumberPosts textAlign="right" mb="50px">
        {`showing ${found} post${found && found > 1 ? "s" : ""} of ${found}`}
      </NumberPosts>
    </Wrapper>
  ) : (
    <OneThingLayout>
      <RobotError>
        <Typography component="p">deepest apologies,</Typography>
        <Typography component="p">somethings wrong with our server</Typography>
      </RobotError>
    </OneThingLayout>
  )
}
