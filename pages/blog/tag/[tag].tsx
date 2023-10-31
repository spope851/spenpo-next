import { PostList } from "@/components/blog/postList"
import { BackButton } from "@/components/backButton"
import { Box, Chip } from "@mui/material"
import { RobotError } from "@/components/robotError"
import Head from "next/head"
import { extractTagsFromPosts } from "@/utils/extractTags"

export type GetBlogPostsWithTagQuery = {
  __typename?: "Query"
  allPosts: {
    __typename?: "Posts"
    found: number
    posts: Array<{
      __typename?: "BlogPost"
      ID: string
      content: string
      title: string
      date: string
      excerpt: string
      tags: Array<{
        __typename?: "Tag"
        name: string
        ID: string
        slug: string
        post_count?: number | null
      }>
    }>
  }
}

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
  const data = await fetch(
    `https://public-api.wordpress.com/rest/v1.1/sites/182626139/tags`
  ).then((res) => res.json())
  const paths = data.tags.map((tag: { slug: string }) => ({
    params: { tag: tag.slug },
  }))
  return { paths, fallback: true }
}

export async function getStaticProps({
  params: { tag },
}: {
  params: { tag: string }
}) {
  const data = await fetch(
    `https://public-api.wordpress.com/rest/v1.1/sites/182626139/posts${
      tag ? `?tag=${tag}` : "/"
    }`
  )
    .then((res) => res.json())
    .then(extractTagsFromPosts)

  // removes spaces, dashes, forward slashes, and makes lower case
  const lettersOnly = (slugOrName: string) =>
    slugOrName.replace(/[- /]/g, "").toLowerCase()
  const actualName = data.posts[0]?.tags.find(
    (postTag) => lettersOnly(postTag.name) === lettersOnly(tag)
  )
  const name = actualName?.name || null

  return {
    props: { data: { allPosts: data }, name },
  }
}
