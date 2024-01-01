import { Stack, Tab, Tabs } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
import { useSession } from 'next-auth/react'
import dynamic from 'next/dynamic'

const Overview = dynamic(
  () =>
    import('@/components/products/landing-page/overview').then(
      (res) => res.LandingPageOverview
    ),
  { ssr: false }
)

const LandingPageProductPage: React.FC = () => {
  const router = useRouter()
  const auth = useSession().status === 'authenticated'

  return (
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
  )
}

export default LandingPageProductPage
