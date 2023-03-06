import { useQuery } from "@apollo/client"
import { Box, styled, Typography } from "@mui/material"
import { BackButton } from "@/components/backButton"
import { OneThingLayout } from "@/components/oneThingLayout"
import { RobotError } from "@/components/robotError"
import { graphql } from "@/generated"
import { TagList } from "@/components/blog/tagList"
import Head from "next/head"
import Link from "next/link"
import { previewImages } from "@/constants"

const StyledBox = styled(Box)`
  margin-right: 15%;
  margin-left: 15%;
  ${({ theme }) => theme.breakpoints.down("md")} {
    margin-right: 5%;
    margin-left: 5%;
  }
`

export default function Post({ id }: { id: string }) {
  const { loading, data } = useQuery(
    graphql(`
      query getPost($id: String!) {
        post(id: $id) {
          title
          content
          date
          excerpt
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
  return (
    <>
      <Head>
        <title>spencer pope</title>
        <meta name="description" content={data?.post.excerpt} key="desc" />
        <meta property="og:title" content={"test"} />
        <meta property="og:description" content={"test"} />
        <meta
          property="og:image"
          content={previewImages[id] || previewImages.default}
        />
        <meta property="twitter:title" content={data?.post.title} />
        <meta property="twitter:description" content={data?.post.excerpt} />
        <meta
          property="twitter:image"
          content={previewImages[id] || previewImages.default}
        />
        <meta
          property="twitter:card"
          content={previewImages[id] || previewImages.default}
        />
      </Head>
      {data ? (
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
            <Link
              href={`https://introspective20s.wordpress.com/?p=${id}`}
              target="_blank"
              rel="noreferrer"
            >
              please visit my Wordpress site to leave a comment on this post
            </Link>
            <TagList tags={data.post.tags} />
          </StyledBox>
        </Box>
      ) : (
        <RobotError>this post doesn&apos;t exist yet</RobotError>
      )}
    </>
  )
}

export async function getStaticPaths() {
  const req = await fetch(
    `https://public-api.wordpress.com/rest/v1.1/sites/182626139/posts`
  ).then((res) => res.json())

  // Get the paths we want to pre-render based on posts
  const paths = req.posts.map((post: { ID: string }) => ({
    params: { id: post.ID.toString() },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

// This also gets called at build time
export async function getStaticProps({ params }: { params: { id: string } }) {
  return { props: { id: params.id } }
}
