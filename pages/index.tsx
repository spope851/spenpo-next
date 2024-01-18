import React from 'react'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { Button } from '@mui/material'
import { InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { SpenpoLanding } from 'spenpo-landing'

const Home: React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  s3,
}) => {
  const router = useRouter()
  const name = 'Spencer Pope'
  const title = 'Developer & Entrepreneur'
  const previewImage = `${s3}/headshot.jpeg`

  return (
    <>
      <Head>
        <title>{name}</title>
        <meta name="description" content={title} key="desc" />
        <meta property="og:title" content={name} />
        <meta property="og:description" content={title} />
        <meta property="og:image" content={previewImage} />
        <meta property="twitter:title" content={name} />
        <meta property="twitter:description" content={title} />
        <meta property="twitter:image" content={previewImage} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@s_pop3" />
      </Head>
      <SpenpoLanding
        title={title}
        name={name}
        subtitle="Striving to be useful"
        socialUrls={[
          'https://twitter.com/s_pop3',
          'https://github.com/spope851',
          'mailto:spenpo@spenpo.com',
          'https://www.youtube.com/@spope',
          'https://www.twitch.tv/spenpo',
        ]}
        headshotSrc="/images/headshot.jpeg"
        actionDestination="products/landing-page"
        actionStatement="let's build your website"
        topComponents={
          <Button
            endIcon={<ChevronRightIcon />}
            variant="contained"
            onClick={() => router.push('/home')}
            sx={{ ml: 'auto', mr: 5, mt: 5, textTransform: 'none' }}
          >
            Continue to spenpo.com
          </Button>
        }
      />
    </>
  )
}

export default Home

export async function getServerSideProps() {
  return {
    props: {
      s3: process.env.AWS_LANDING_S3,
    },
  }
}
