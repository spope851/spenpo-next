import React from "react"
import { Deployment } from "@/components/deployment/deployment"
import { useRouter } from "next/router"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Box } from "@mui/material"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { GetServerSidePropsContext } from "next"
import { getServerSession } from "next-auth"
import prisma from "@/utils/prisma"
import { Prisma } from "@prisma/client"

export default function Deployments() {
  const router = useRouter()
  const id = router.query.deploymentId as string

  const createdAt = router.query.createdAt as number | undefined

  return (
    <>
      <Box sx={{ mt: { xs: 2, sm: 5 }, ml: { xs: 2, sm: 5 } }}>
        <Breadcrumbs />
      </Box>
      <Deployment id={id} createdAt={createdAt} />
    </>
  )
}

export async function getServerSideProps({
  req,
  res,
  params,
}: GetServerSidePropsContext) {
  const session = await getServerSession(req, res, authOptions)
  const projects = await prisma.order
    .findMany({
      where: { userId: session.user.id, complete: true },
    })
    .then((res) =>
      res.map(
        (order) =>
          ((order.metadata as Prisma.JsonObject).projectName as Prisma.JsonObject)
            .vercelApp
      )
    )
  if (!!session && projects.includes(params?.appName)) {
    return { props: {} }
  } else {
    return {
      redirect: {
        permanent: false,
        destination: `/products/landing-page`,
      },
    }
  }
}
