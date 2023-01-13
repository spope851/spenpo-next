import { useQuery } from "@apollo/client"
import { useRouter } from "next/router"
import { graphql } from "../../generated"

export default function Post() {
  const router = useRouter()
  const pid = router.query.id as string
  const { loading, data } = useQuery(
    graphql(`
      query getPost($id: String!) {
        post(id: $id) {
          title
          content
        }
      }
    `),
    { variables: { id: pid } }
  )

  if (loading) return <>...Loading</>
  return (
    <>
      <h2>{data?.post.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: data?.post.content! }} />
    </>
  )
}
