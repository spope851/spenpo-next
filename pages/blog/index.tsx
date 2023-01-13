import { useQuery } from "@apollo/client"
import { graphql } from "../../generated"

export default function Blog() {
  const { loading, data } = useQuery(
    graphql(`
      query getBlogPosts {
        blogPosts {
          posts {
            ID
            URL
            content
            title
          }
        }
      }
    `)
  )

  if (loading) return <>...Loading</>

  return (
    <>
      {data?.blogPosts.posts.map((post) => (
        <p key={post.ID}>
          <a href={`/blog/${post.ID}`}>{post.title}</a>
        </p>
      ))}
    </>
  )
}
