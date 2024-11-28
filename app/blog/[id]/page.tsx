import { Box, Stack, Typography } from '@mui/material'
import { TagList } from '@/app/blog/components/TagList'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { MetadataProps, PageProps } from '@/app/types/app'
import { Metadata } from 'next'
import { WP_REST_URI, previewImages } from '@/app/constants/blog'

const getPost = async (id: string) =>
  fetch(`${WP_REST_URI}/posts/${id}`).then((res) => res.json())

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const post = await getPost(params.id)
  if (!post || !post.title || post.code === 'rest_post_invalid_id') {
    return {}
  }

  const title = post.title.rendered
  const description = post.excerpt.rendered.slice(3).slice(0, 200)
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

export default async function Post({ params }: PageProps) {
  const post = await getPost(params.id)
  if (!post || !post.title || post.code === 'rest_post_invalid_id') {
    redirect('/blog')
  }

  const padding = { sm: 5, xs: 2 }

  return (
    <Stack p={padding} gap={{ sm: 5, xs: 2 }} mx="auto" maxWidth="50em">
      <Stack gap={1}>
        <Box display="flex" justifyContent="space-between" alignItems="end">
          <Typography
            component="h1"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
          <Typography component="span">
            {post.date && new Date(post.date).toLocaleDateString()}
          </Typography>
        </Box>
        <TagList tags={post.tags} />
      </Stack>
      <Typography
        variant="body2"
        component="div"
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        sx={{
          'figure.wp-block-image': {
            margin: 0,
            img: {
              maxWidth: '100%',
              height: 'auto',
            },
          },
          'pre.wp-block-code': {
            borderRadius: 1,
            maxWidth: {
              xs: `calc(100vw - ${padding.xs * 8 * 2}px)`,
              sm: `calc(100vw - ${padding.sm * 8 * 2}px)`,
            },
          },
        }}
      />
      <Typography variant="body2">
        Please visit{' '}
        <Link
          href={`https://introspective20s.com/?p=${params.id}`}
          target="_blank"
          rel="noreferrer"
        >
          my Wordpress site
        </Link>{' '}
        to leave a comment on this post.
      </Typography>
      {post.tags.includes(28) && (
        <Typography variant="body2">
          You&apos;re reading this on my blog where all &quot;now&quot; posts are
          archived. Check out my &quot;<Link href="/now">now</Link>&quot; page for
          the latest update.
        </Typography>
      )}
      <TagList tags={post.tags} />
    </Stack>
  )
}
