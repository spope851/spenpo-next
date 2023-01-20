import { useQuery } from "@apollo/client"
import { Box, Typography } from "@mui/material"
import { useRouter } from "next/router"
import { BackButton } from "../../components/backButton"
import { OneThingLayout } from "../../components/oneThingLayout"
import { graphql } from "../../generated"
import { TagList } from "./components/tagList"
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined"

export default function Post() {
  const router = useRouter()
  const id = router.query.id as string
  const { loading, data } = useQuery(
    graphql(`
      query getPost($id: String!) {
        post(id: $id) {
          title
          content
          date
          tags {
            ID
            slug
            name
            post_count
          }
        }
      }
    `),
    { variables: { id } }
  )

  if (loading) return <OneThingLayout>...Loading</OneThingLayout>
  return data ? (
    <Box mx={"15%"} my={5}>
      <BackButton href="/blog" />
      <TagList tags={data.post.tags} />
      <Box display="flex" justifyContent="space-between" alignItems="end">
        <Typography component="span" variant="h4">
          {data.post.title}
        </Typography>
        <Typography component="span" variant="caption">
          {data.post.date && new Date(data.post.date).toLocaleDateString()}
        </Typography>
      </Box>
      <div dangerouslySetInnerHTML={{ __html: data.post.content }} />
      <TagList tags={data.post.tags} />
    </Box>
  ) : (
    <OneThingLayout>
      <SmartToyOutlinedIcon />
      this post doesn't exist yet
    </OneThingLayout>
  )
}
