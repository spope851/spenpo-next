import { PostList } from "@/components/blog/postList"
import { graphql } from "@/generated"
import { BackButton } from "@/components/backButton"
import { Box, Chip } from "@mui/material"
import { RobotError } from "@/components/robotError"
import Head from "next/head"
import { GetBlogPostsWithTagQuery } from "@/generated/graphql"
import { initializeApollo } from "@/graphql/ssgClient"

export default function Blog({
  data,
  name,
}: {
  data: GetBlogPostsWithTagQuery
  name: string | null
}) {
  return (
    <>
      <Head>
        <title>spencer pope</title>
      </Head>
      {data?.allPosts.posts && data.allPosts.posts.length > 0 ? (
        <>
          <Box
            mt={5}
            display="grid"
            gridTemplateColumns="1fr 1fr 1fr"
            flexWrap="wrap-reverse"
            alignItems="flex-end"
          >
            <BackButton sx={{ gridColumn: 1, m: "auto" }} />
            <Chip
              color="primary"
              label={name}
              sx={{
                mx: "auto",
                fontSize: 16,
                gridColumn: 2,
              }}
            />
          </Box>
          <PostList posts={data} />
        </>
      ) : (
        <RobotError>this tag doesn&apos;t exist</RobotError>
      )}
    </>
  )
}

export async function getStaticPaths() {
  const client = initializeApollo()
  const { data } = await client.query({
    query: graphql(`
      query getAllTags {
        allTags {
          tags {
            slug
          }
        }
      }
    `),
  })
  const paths = data.allTags.tags.map((tag) => ({
    params: { tag: tag.slug },
  }))
  return { paths, fallback: true }
}

export async function getStaticProps({
  params: { tag },
}: {
  params: { tag: string }
}) {
  const client = initializeApollo()
  const { data } = await client.query({
    query: graphql(`
      query getBlogPostsWithTag($tag: String) {
        allPosts(tag: $tag) {
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
    `),
    variables: { tag },
  })

  // removes spaces, dashes, forward slashes, and makes lower case
  const lettersOnly = (slugOrName: string) =>
    slugOrName.replace(/[- /]/g, "").toLowerCase()
  const actualName = data.allPosts.posts[0]?.tags.find(
    (postTag) => lettersOnly(postTag.name) === lettersOnly(tag)
  )
  const name = actualName?.name || null

  return {
    props: { data, name },
  }
}
