import { useQuery } from "@apollo/client"
import styled from "@emotion/styled"
import { Box } from "@mui/system"
import { graphql } from "../../generated"

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

export default function Blog() {
  const { loading, data } = useQuery(
    graphql(`
      query getBlogPosts {
        allPosts {
          posts {
            ID
            content
            title
            date
            excerpt
            tags {
              name
              ID
            }
          }
        }
      }
    `)
  )

  if (loading) return <>...Loading</>

  return (
    <Box
      style={{
        width: "50%",
        margin: "auto",
      }}
    >
      {data?.allPosts.posts.map(({ ID, title, date, excerpt, tags }) => (
        <Post key={ID}>
          <p>{new Date(date).toLocaleDateString()}</p>
          <p>
            <a href={`/blog/${ID}`}>{title}</a>
          </p>
          <p dangerouslySetInnerHTML={{ __html: excerpt }} />
          <p>
            {tags.map((tag) => (
              <span key={tag.ID}>{tag.name}</span>
            ))}
          </p>
        </Post>
      ))}
    </Box>
  )
}
