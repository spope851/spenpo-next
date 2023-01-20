import { useQuery } from "@apollo/client"
import { PostList } from "./components/postList"
import { graphql } from "@/generated"

export default function Blog() {
  const { loading, data } = useQuery(
    graphql(`
      query getBlogPosts {
        allPosts {
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
    `)
  )

  return <PostList posts={data} loading={loading} />
}
