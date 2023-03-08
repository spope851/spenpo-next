import { Box, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"
import { BackButton } from "@/components/backButton"
import { RobotError } from "@/components/robotError"
import { graphql } from "@/generated"
import { TagList } from "@/components/blog/tagList"
import Head from "next/head"
import Link from "next/link"
import { previewImages } from "@/constants"
import { GetPostQuery } from "@/generated/graphql"
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client"

const StyledBox = styled(Box)(({ theme }) => ({
  marginRight: "15%",
  marginLeft: "15%",
  [theme.breakpoints.down("md")]: {
    marginRight: "5%",
    marginLeft: "5%",
  },
}))

export default function Post({
  id,
  data,
}: {
  id: string
  data: GetPostQuery | null
}) {
  const description = data?.post.excerpt.slice(3).slice(0, 200)
  return (
    <>
      <Head>
        <title>spencer pope</title>
        <meta name="description" content={description} key="desc" />
        <meta property="og:title" content={data?.post.title} />
        <meta property="og:description" content={description} />
        <meta
          property="og:image"
          content={previewImages[id] || previewImages.default}
        />
        <meta property="twitter:title" content={data?.post.title} />
        <meta property="twitter:description" content={description} />
        <meta
          property="twitter:image"
          content={previewImages[id] || previewImages.default}
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@s_pop3" />
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
  const url = process.env.VERCEL_URL
  const client = new ApolloClient({
    // Provide required constructor fields
    cache: new InMemoryCache(),
    link: createHttpLink({
      uri: `http${url ? `s://${url}` : "://localhost:3000"}/api/graphql`,
    }),
    ssrMode: true,
    // Provide some optional constructor fields
    name: "react-web-client",
    version: "1.3",
    queryDeduplication: false,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "cache-and-network",
      },
    },
  })
  const { data } = await client.query({
    query: graphql(`
      query getBlogIds {
        allPosts {
          posts {
            ID
          }
        }
      }
    `),
  })
  const paths = data.allPosts.posts.map((post) => ({ params: { id: post.ID } }))
  return { paths, fallback: true }
}

export async function getStaticProps({
  params: { id },
}: {
  params: { id: string }
}) {
  const url = process.env.VERCEL_URL
  const client = new ApolloClient({
    // Provide required constructor fields
    cache: new InMemoryCache(),
    link: createHttpLink({
      uri: `http${url ? `s://${url}` : "://localhost:3000"}/api/graphql`,
    }),
    ssrMode: true,
    // Provide some optional constructor fields
    name: "react-web-client",
    version: "1.3",
    queryDeduplication: false,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "cache-and-network",
      },
    },
  })
  try {
    const { data } = await client.query({
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
      variables: { id },
    })
    return { props: { data } }
  } catch {
    return { notFound: true }
  }
}
