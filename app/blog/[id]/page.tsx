import { Box, Stack, Typography } from '@mui/material'
import { BackButton } from '@/app/components/BackButton'
import { TagList } from '@/app/blog/components/TagList'
import Link from 'next/link'
import { extractTagsFromPost } from '@/app/utils/extractTags'
import { redirect } from 'next/navigation'
import { MetadataProps, PageProps } from '@/app/types/app'
import { Metadata } from 'next'
import { WORDPRESS_ROOT, previewImages } from '@/app/constants/blog'

const getPost = async (id: string) =>
  fetch(`${WORDPRESS_ROOT}/posts/${id}`)
    .then((res) => res.json())
    .then(extractTagsFromPost)

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const post = await getPost(params.id)

  const title = post.title
  const description = post.excerpt.slice(3).slice(0, 200)
  const images = [previewImages[params.id] || '/images/headshot.jpeg']

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: process.env.VERCEL_URL,
      siteName: 'spenpo.com',
      locale: 'en_US',
      type: 'website',
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@s_pop3',
      images,
    },
  }
}

export type GetPostQuery = {
  __typename?: 'Query'
  post: {
    __typename?: 'BlogPost'
    title: string
    content: string
    date: string
    excerpt: string
    tags: Array<{
      __typename?: 'Tag'
      ID: string
      slug: string
      name: string
      post_count?: number | null
    }>
  }
}

export default async function Post({ params }: PageProps) {
  const post = await getPost(params.id)
  if (!post) {
    redirect('/blog')
  }

  const tags = post?.tags?.map((tag) => tag.name)

  return (
    <Stack>
      <Box m={{ xs: 2, sm: 5 }}>
        <BackButton href="/blog" />
      </Box>
      <Stack
        gap={5}
        pb={{ xs: 2, sm: 5 }}
        px={{ xs: 2, sm: 5 }}
        mx="auto"
        maxWidth="50rem"
      >
        <Box display="flex" justifyContent="space-between" alignItems="end">
          <Typography
            component="span"
            variant="h4"
            dangerouslySetInnerHTML={{ __html: post.title }}
          />
          <Typography component="span">
            {post.date && new Date(post.date).toLocaleDateString()}
          </Typography>
        </Box>
        <TagList tags={post.tags} />
        <Typography
          variant="body2"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        <Typography variant="body2">
          Please visit{' '}
          <Link
            href={`https://introspective20s.wordpress.com/?p=${params.id}`}
            target="_blank"
            rel="noreferrer"
          >
            my Wordpress site
          </Link>{' '}
          to leave a comment on this post.
        </Typography>
        {tags.includes('now') && (
          <Typography variant="body2">
            You&apos;re reading this on my blog where all &quot;now&quot; posts are
            archived. Check out my &quot;<Link href="/now">now</Link>&quot; page for
            the latest update.
          </Typography>
        )}
        <TagList tags={post.tags} />
      </Stack>
    </Stack>
  )
}
