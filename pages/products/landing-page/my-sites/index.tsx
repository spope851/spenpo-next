import React, { useEffect, useState } from "react"
import { Button, CircularProgress, Stack, Typography } from "@mui/material"
import { useRouter } from "next/router"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next"
import { getServerSession } from "next-auth"
import prisma from "@/utils/prisma"
import CachedIcon from "@mui/icons-material/Cached"
import { SiteCard } from "@/components/siteCard"
import { Breadcrumbs } from "@/components/breadcrumbs"

const getOrders = async () => fetch("/api/getOrders")

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
  const [awaitingNewSite, setAwaitingNewSite] = useState(
    !!router.query.payment_intent
  )
  const [loading, setLoading] = useState(false)

  const refreshOrders = async () => {
    setLoading(true)
    const ordersReq = await getOrders()
    const newOrders = await ordersReq.json()
    setOrders(newOrders.orders)
    setLoading(false)
  }

  useEffect(() => {
    if (awaitingNewSite) {
      setLoading(true)
      const pollingId = window.setInterval(async () => {
        const ordersReq = await getOrders()
        const newOrders = await ordersReq.json()
        if (newOrders.orders.length > orders.length) {
          setOrders(newOrders.orders)
          setLoading(false)
          setAwaitingNewSite(false)
        }
      }, 1000)

      return () => {
        clearInterval(pollingId)
      }
    }
  }, [awaitingNewSite])

  useEffect(() => {
    router.replace(
      { pathname: "/products/landing-page/my-sites", query: { ...router.query } },
      "/products/landing-page/my-sites",
      {
        shallow: true,
      }
    )
  }, [])

  return (
    <>
      <Stack rowGap={1} m={5}>
        <Stack direction="row">
          <Breadcrumbs />
          <Button
            variant="contained"
            onClick={refreshOrders}
            sx={{ ml: "auto", minWidth: 36, p: 1 }}
          >
            <CachedIcon />
          </Button>
        </Stack>
        <Stack direction="row" justifyContent="space-around" m={5}>
          <Stack rowGap={1} width="100%">
            {orders.length > 0 ? (
              orders.map((order) => (
                <SiteCard
                  key={order.id}
                  name={order.metadata.projectName.vercelApp}
                />
              ))
            ) : (
              <Typography>you do not have any sites with us yet</Typography>
            )}
            {loading && <CircularProgress sx={{ alignSelf: "center" }} />}
          </Stack>
        </Stack>
      </Stack>
    </>
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
        destination: `/home`,
      },
    }
  }
}
