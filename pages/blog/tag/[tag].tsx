import { useQuery } from "@apollo/client"
import { useRouter } from "next/router"
import { PostList } from "../components/postList"
import { graphql } from "../../../generated"
import { BackButton } from "../../../components/backButton"
import { Box } from "@mui/material"
import { OneThingLayout } from "../../../components/oneThingLayout"
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined"

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
      <Box ml={"15%"} mt={5}>
        <BackButton href="/blog" />
      </Box>
      <PostList posts={data} loading={loading} />
    </>
  ) : (
    <OneThingLayout>
      <SmartToyOutlinedIcon />
      this tag doesn't exist
    </OneThingLayout>
  )
}
