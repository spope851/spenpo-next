import React, { useContext, useEffect, useState } from "react"
import {
  Button,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
} from "@mui/material"
import { useRouter } from "next/router"
import CachedIcon from "@mui/icons-material/Cached"
import { SiteCard } from "@/components/siteCard"
import { SnackbarContext } from "@/context/snackbar"
import { Prisma } from "@prisma/client"
import ChevronRight from "@mui/icons-material/ChevronRight"
import { Snackbar } from "@/components/snackbar"

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
  const [newOrder, setNewOrder] = useState(false)

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
          setNewOrder(true)
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
  })

  return (
    <>
      <Stack direction="row" position="absolute" right={0} mr={5}>
        <Button
          variant="contained"
          onClick={refreshOrders}
          sx={{ ml: "auto", minWidth: 36, p: 1 }}
        >
          <CachedIcon />
        </Button>
      </Stack>
      <Stack direction="row" justifyContent="space-around" mx={5}>
        <Stack rowGap={1} width="100%">
          {orders.length > 0 ? (
            orders.map((order, idx) => (
              <>
                <SiteCard
                  key={order.id}
                  name={order.metadata.projectName.vercelApp}
                />
                {newOrder && idx === orders.length - 1 && (
                  <Snackbar
                    open={newOrder}
                    autoHideDuration={6000}
                    message="new site being deployed! click here to track its progress"
                    action={
                      <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        onClick={() =>
                          router.push(
                            `${router.pathname}/${
                              orders.at(-1)?.metadata.projectName.vercelApp
                            }`
                          )
                        }
                      >
                        <ChevronRight fontSize="small" />
                      </IconButton>
                    }
                  />
                )}
              </>
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
