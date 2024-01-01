import {
  Button,
  CircularProgress,
  Grid,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { getServerSession } from 'next-auth'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import prisma from '@/utils/prisma'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { SiteCard } from '@/components/siteCard'
import CachedIcon from '@mui/icons-material/Cached'
import ChevronRight from '@mui/icons-material/ChevronRight'

const getOrders = async (): Promise<{ orders: Order[] }> => {
  const orders = await fetch('/api/getOrders')
  return orders.json()
}

type Order = {
  id: string
  metadata: {
    projectName: { vercelApp: string }
  }
}

const MySites: React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  ssrOrders,
}) => {
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>(ssrOrders as unknown as Order[])
  const [loading, setLoading] = useState(false)

  const refreshOrders = async () => {
    setLoading(true)
    const newOrders = await getOrders()
    setOrders(newOrders.orders)
    setLoading(false)
  }

  useEffect(() => {
    router.replace(
      { pathname: router.pathname, query: { ...router.query } },
      router.pathname,
      {
        shallow: true,
      }
    )
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Stack m={{ xs: 2, sm: 5 }} rowGap={3}>
      <Tabs
        value={1}
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
      <Stack direction="row" position="absolute" right={0} mr={{ xs: 2, sm: 5 }}>
        <Button
          variant="contained"
          onClick={refreshOrders}
          sx={{ ml: 'auto', minWidth: 40, p: 1 }}
        >
          <CachedIcon />
        </Button>
      </Stack>
      <Grid container spacing={1}>
        {orders.length > 0 ? (
          orders.map((order) => (
            <Grid key={order.id} item lg={3} md={6} xs={12}>
              <SiteCard name={order.metadata.projectName.vercelApp} />
            </Grid>
          ))
        ) : (
          <Stack mx="auto" rowGap={5}>
            <Typography>
              You do not have any sites with us yet. Design one now!
            </Typography>
            <Button
              href={`${router.pathname}/design`}
              variant="contained"
              sx={{ mx: 'auto' }}
              endIcon={<ChevronRight />}
            >
              design
            </Button>
          </Stack>
        )}
        {loading && (
          <CircularProgress sx={{ alignSelf: 'center', my: 1, mx: 'auto' }} />
        )}
      </Grid>
    </Stack>
  )
}

export default MySites

export async function getServerSideProps({ req, res }: GetServerSidePropsContext) {
  const session = await getServerSession(req, res, authOptions)
  if (session) {
    const ssrOrders = await prisma.order.findMany({
      where: { userId: session.user.id, complete: true },
    })

    return { props: { ssrOrders } }
  } else {
    return {
      redirect: {
        permanent: false,
        destination: `/products/landing-page`,
      },
    }
  }
}
