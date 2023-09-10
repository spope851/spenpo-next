import { MySites } from "@/components/products/landing-page/mySites"
import { LandingPageOverview } from "@/components/products/landing-page/overview"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { Stack, Tab, Tabs, useTheme } from "@mui/material"
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next"
import { getServerSession } from "next-auth"
import { useRouter } from "next/router"
import React, { ReactNode } from "react"

const LandingPageProductPage: React.FC<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ ssrOrders }) => {
  const theme = useTheme()
  const router = useRouter()
  const tabs: Record<number, ReactNode> = {
    0: <LandingPageOverview />,
    1: ssrOrders && <MySites ssrOrders={ssrOrders} />,
  }
  const mysites = Number(router.query.mysites) || 0

  return (
    <Stack m={5} rowGap={5}>
      {ssrOrders ? (
        <>
          <Tabs
            value={mysites}
            onChange={(_, value) =>
              router.replace(
                { pathname: router.pathname, query: { mysites: value } },
                router.pathname
              )
            }
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              width: "100%",
              "& .Mui-selected": {
                bgcolor: theme.palette.primary.main,
                color: "#fff !important",
              },
            }}
          >
            <Tab label="product overview" />
            <Tab label="my sites" />
          </Tabs>
          {tabs[mysites]}
        </>
      ) : (
        tabs[0]
      )}
    </Stack>
  )
}

export default LandingPageProductPage

export async function getServerSideProps({ req, res }: GetServerSidePropsContext) {
  const session = await getServerSession(req, res, authOptions)
  if (session) {
    const ssrOrders = await prisma.order.findMany({
      where: { userId: session.user.id, complete: true },
    })

    return { props: { ssrOrders } }
  } else {
    return {
      props: {},
    }
  }
}
