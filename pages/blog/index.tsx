import { useQuery } from "@apollo/client"
import { PostList } from "./components/postList"
import { graphql } from "@/generated"
import { Typography } from "@mui/material"

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

  return (
    <>
      <Typography variant="h4" mt={5} textAlign="center" fontStyle="italic">
        spenpo.blog
      </Typography>
      <PostList posts={data} loading={loading} />
    </>
  )
}
