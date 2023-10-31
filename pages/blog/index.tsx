import { PostList } from "../../components/blog/postList"
import { extractTagsFromPosts } from "@/utils/extractTags"
import { Typography } from "@mui/material"
import Head from "next/head"

export type GetBlogPostsQuery = {
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
  const data = await fetch(
    `https://public-api.wordpress.com/rest/v1.1/sites/182626139/posts?fields=ID,title,excerpt,tags,date`
  )
    .then((res) => res.json())
    .then(extractTagsFromPosts)
  return {
    props: { data: { allPosts: data } },
  }
}
