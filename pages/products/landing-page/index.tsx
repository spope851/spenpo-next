import { MySites } from "@/components/products/landing-page/mySites"
import { LandingPageOverview } from "@/components/products/landing-page/overview"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { Stack, Tab, Tabs } from "@mui/material"
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next"
import { getServerSession } from "next-auth"
import { useRouter } from "next/router"
import React, { ReactNode } from "react"
import prisma from "@/utils/prisma"

const LandingPageProductPage: React.FC<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ ssrOrders }) => {
  const router = useRouter()
  const tabs: Record<number, ReactNode> = {
    0: <LandingPageOverview />,
    1: ssrOrders && <MySites ssrOrders={ssrOrders} />,
  }
  const mysites = Number(router.query.mysites) || 0

  return (
    <Stack m={{ xs: 2, sm: 5 }} rowGap={1}>
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
            }}
          >
            <Tab label="overview" />
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
