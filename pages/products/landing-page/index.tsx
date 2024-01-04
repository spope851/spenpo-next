import { Stack, Tab, Tabs } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
import { useSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { InferGetServerSidePropsType } from 'next'
import prisma from '@/utils/prisma'

const Overview = dynamic(
  () =>
    import('@/components/products/landing-page/overview').then(
      (res) => res.LandingPageOverview
    ),
  { ssr: false }
)

const LandingPageProductPage: React.FC<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ s3, product }) => {
  const router = useRouter()
  const auth = useSession().status === 'authenticated'

  const previewImage = `${s3}/landing-page-product.png`

  const title = `${product?.name} $0.${product?.price}`

  return (
    <>
      <Head>
        <title>spenpo.shop</title>
        <meta name="description" content={product?.description} key="desc" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={product?.description} />
        <meta property="og:image" content={previewImage} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={product?.description} />
        <meta property="twitter:image" content={previewImage} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@s_pop3" />
      </Head>
      <Stack m={{ xs: 2, sm: 5 }} rowGap={3}>
        {auth && (
          <Tabs
            value={0}
            onChange={(_, value) =>
              router.push(`/products/landing-page${['', '/my-sites'][value]}`)
            }
            sx={{
              borderBottom: 1,
            }}
          >
            <Tab label="overview" />
            <Tab label="my sites" />
          </Tabs>
        )}
        <Overview />
      </Stack>
    </>
  )
}

export default LandingPageProductPage

export async function getServerSideProps() {
  const product = await prisma.product.findFirst({
    where: {
      id: 'landing-page',
    },
  })
  console.log(product)

  return {
    props: {
      product,
      s3: process.env.AWS_LANDING_S3,
    },
  }
}
