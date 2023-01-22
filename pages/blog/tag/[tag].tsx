import { useQuery } from "@apollo/client"
import { useRouter } from "next/router"
import { PostList } from "../components/postList"
import { graphql } from "@/generated"
import { BackButton } from "@/components/backButton"
import { Box, Chip, Typography } from "@mui/material"
import { RobotError } from "@/components/robotError"
import { OneThingLayout } from "@/components/oneThingLayout"

export default function Blog() {
  const router = useRouter()
  const tag = router.query.tag as string
  const { loading, data } = useQuery(
    graphql(`
      query getBlogPostsWithTag($tag: String) {
        allPosts(tag: $tag) {
          found
          posts {
            ID
            content
            title
            date
            excerpt
            tags {
              name
              ID
              slug
              post_count
            }
          }
        }
      }
    `),
    { variables: { tag } }
  )

  if (loading) return <OneThingLayout>...Loading</OneThingLayout>

  return data?.allPosts.posts && data.allPosts.posts.length > 0 ? (
    <>
      <Box
        mt={5}
        display="grid"
        gridTemplateColumns="1fr 1fr 1fr"
        flexWrap="wrap-reverse"
        alignItems="flex-end"
      >
        <BackButton sx={{ gridColumn: 1, m: "auto" }} />
        <Chip
          color="primary"
          label={tag}
          sx={{
            mx: "auto",
            fontSize: 16,
            gridColumn: 2,
          }}
        />
      </Box>
      <PostList posts={data} loading={loading} />
    </>
  ) : (
    <RobotError>this tag doesn't exist</RobotError>
  )
}
