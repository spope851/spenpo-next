import { useQuery } from "@apollo/client"
import { Box, styled, Typography } from "@mui/material"
import { useRouter } from "next/router"
import { BackButton } from "@/components/backButton"
import { OneThingLayout } from "@/components/oneThingLayout"
import { RobotError } from "@/components/robotError"
import { graphql } from "@/generated"
import { TagList } from "@/components/blog/tagList"

const StyledBox = styled(Box)`
  margin-right: 15%;
  margin-left: 15%;
  ${({ theme }) => theme.breakpoints.down("md")} {
    margin-right: 5%;
    margin-left: 5%;
  }
`

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
    <Box overflow="auto">
      <Box mt={5} ml="5%">
        <BackButton href="/blog" />
      </Box>
      <StyledBox my={5}>
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
      </StyledBox>
    </Box>
  ) : (
    <RobotError>this post doesn&apos;t exist yet</RobotError>
  )
}
