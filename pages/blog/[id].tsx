import { Box, styled, Typography } from "@mui/material"
import { BackButton } from "@/components/backButton"
import { RobotError } from "@/components/robotError"
import { graphql } from "@/generated"
import { TagList } from "@/components/blog/tagList"
import Head from "next/head"
import Link from "next/link"
import { previewImages } from "@/constants"
import client from "@/graphql/apolloClient"
import { GetPostQuery } from "@/generated/graphql"

const StyledBox = styled(Box)`
  margin-right: 15%;
  margin-left: 15%;
  ${({ theme }) => theme.breakpoints.down("md")} {
    margin-right: 5%;
    margin-left: 5%;
  }
`

export default function Post({ id, data }: { id: string; data: GetPostQuery }) {
  return (
    <>
      <Head>
        <title>spencer pope</title>
        <meta name="description" content={data.post.excerpt} key="desc" />
        <meta property="og:title" content={data.post.title} />
        <meta property="og:description" content={data.post.excerpt} />
        <meta
          property="og:image"
          content={previewImages[id] || previewImages.default}
        />
        <meta property="twitter:title" content={data.post.title} />
        <meta property="twitter:description" content={data.post.excerpt} />
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

export async function getServerSideProps({ params }: { params: { id: string } }) {
  const { data } = await client(true).query({
    query: graphql(`
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
    variables: { id: params.id },
  })
  return {
    props: { id: params.id, data },
  }
}
