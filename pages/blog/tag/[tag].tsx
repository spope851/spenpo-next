import { useQuery } from "@apollo/client"
import { useRouter } from "next/router"
import { PostList } from "../components/postList"
import { graphql } from "../../../generated"
import { BackButton } from "../../../components/backButton"

export default function Blog() {
  const router = useRouter()
  const tag = router.query.tag as string
  const { loading, data } = useQuery(
    graphql(`
      query getBlogPostsWithTag($tag: String) {
        allPosts(tag: $tag) {
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

  return (
    <>
      <BackButton href="/blog" />
      <PostList posts={data} loading={loading} />
    </>
  )
}
