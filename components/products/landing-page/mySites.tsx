import React, { useContext, useEffect, useState } from "react"
import { Button, CircularProgress, Stack, Typography } from "@mui/material"
import { useRouter } from "next/router"
import CachedIcon from "@mui/icons-material/Cached"
import { SiteCard } from "@/components/siteCard"
import { SnackbarContext } from "@/context/snackbar"
import { Prisma } from "@prisma/client"
import ChevronRight from "@mui/icons-material/ChevronRight"

const getOrders = async (): Promise<{ orders: Order[] }> => {
  const orders = await fetch("/api/getOrders")
  return orders.json()
}

type Order = {
  id: string
  metadata: {
    projectName: { vercelApp: string }
  }
}

type SsrOrder = {
  id: string
  userId: string
  metadata: Prisma.JsonValue
  complete: boolean
}

export const MySites: React.FC<{ ssrOrders: SsrOrder[] }> = ({ ssrOrders }) => {
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>(ssrOrders as unknown as Order[])
  const [awaitingNewSite, setAwaitingNewSite] = useState(
    !!router.query.payment_intent
  )
  const [loading, setLoading] = useState(false)

  const { setSnackbarOpen, setSnackbarMessage } = useContext(SnackbarContext)

  const refreshOrders = async () => {
    setLoading(true)
    const newOrders = await getOrders()
    setOrders(newOrders.orders)
    setLoading(false)
  }

  useEffect(() => {
    if (awaitingNewSite) {
      setSnackbarOpen(true)
      setSnackbarMessage(
        "we are preparing your new site. it will appear here once the deployment has started."
      )
      setLoading(true)
      const pollingId = window.setInterval(async () => {
        const newOrders = await getOrders()
        if (newOrders.orders.length > orders.length) {
          setOrders(newOrders.orders)
          setLoading(false)
          setAwaitingNewSite(false)
          setSnackbarOpen(false)
        }
      }, 1000)

      return () => {
        clearInterval(pollingId)
      }
    }
  }, [awaitingNewSite, orders.length]) // eslint-disable-line react-hooks/exhaustive-deps

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
    <>
      <Stack direction="row" position="absolute" right={0} mr={{ xs: 2, sm: 5 }}>
        <Button
          variant="contained"
          onClick={refreshOrders}
          sx={{ ml: "auto", minWidth: 36, p: 1 }}
        >
          <CachedIcon />
        </Button>
      </Stack>
      <Stack direction="row" justifyContent="space-around">
        <Stack rowGap={1} width="100%">
          {orders.length > 0 ? (
            orders.map((order) => (
              <SiteCard key={order.id} name={order.metadata.projectName.vercelApp} />
            ))
          ) : (
            <Stack mx="auto" rowGap={5}>
              <Typography>
                You do not have any sites with us yet. Design one now!
              </Typography>
              <Button
                href={`${router.pathname}/design`}
                variant="contained"
                sx={{ mx: "auto" }}
                endIcon={<ChevronRight />}
              >
                design
              </Button>
            </Stack>
          )}
          {loading && <CircularProgress sx={{ alignSelf: "center" }} />}
        </Stack>
      </Stack>
    </>
  )
}
