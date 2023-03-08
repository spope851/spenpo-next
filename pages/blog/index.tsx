import { PostList } from "../../components/blog/postList"
import { graphql } from "@/generated"
import { Typography } from "@mui/material"
import Head from "next/head"
import { GetBlogPostsQuery } from "@/generated/graphql"
import { initializeApollo } from "@/graphql/ssgClient"

export default function Blog({ data }: { data: GetBlogPostsQuery }) {
  return (
    <>
      <Head>
        <title>spencer pope</title>
      </Head>
      <Typography variant="h4" mt={5} textAlign="center" fontStyle="italic">
        spenpo.blog
      </Typography>
      <PostList posts={data} />
    </>
  )
}

export async function getStaticProps() {
  const client = initializeApollo()
  const { data } = await client.query({
    query: graphql(`
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
    `),
  })
  return {
    props: { data },
  }
}
