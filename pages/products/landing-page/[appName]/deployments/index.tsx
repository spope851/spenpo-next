import React, { useEffect, useState } from "react"
import { Button, CircularProgress, Stack } from "@mui/material"
import { useRouter } from "next/router"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next"
import { getServerSession } from "next-auth"
import CachedIcon from "@mui/icons-material/Cached"
import { DeploymentCard } from "@/components/deploymentCard"
import { Breadcrumbs } from "@/components/breadcrumbs"
import prisma from "@/utils/prisma"
import { Prisma } from "@prisma/client"

const getProjectDeployments = async (appName: string) =>
  fetch(`/api/landing-page/getVercelProjectDeployments?appName=${appName}`)

const Deployments: React.FC<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = () => {
  const router = useRouter()
  const [data, setData] = useState<{ uid: string }[]>([])
  const [loading, setLoading] = useState(false)

  const refreshDeployments = async () => {
    setLoading(true)
    const deploymentsReq = await getProjectDeployments(String(router.query.appName))
    const { deployments } = await deploymentsReq.json()
    setData(deployments)
    setLoading(false)
  }

  useEffect(() => {
    ;(async () => refreshDeployments())()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Stack rowGap={3} m={{ xs: 2, sm: 5 }}>
      <Stack direction="row" justifyContent="space-between">
        <Breadcrumbs />
        <Button
          variant="contained"
          onClick={refreshDeployments}
          sx={{ minWidth: 36, p: 1 }}
        >
          <CachedIcon />
        </Button>
      </Stack>
      <Stack direction="row" justifyContent="space-around">
        <Stack rowGap={1} width="100%">
          {data.map((el) => (
            <DeploymentCard key={el.uid} uid={el.uid} />
          ))}
          {loading && <CircularProgress sx={{ alignSelf: "center" }} />}
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Deployments

const redirect = {
  redirect: {
    permanent: false,
    destination: `/products/landing-page`,
  },
}

export async function getServerSideProps({
  req,
  res,
  params,
}: GetServerSidePropsContext) {
  const session = await getServerSession(req, res, authOptions)
  if (!!session) {
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
    if (projects.includes(params?.appName)) {
      return { props: {} }
    } else return redirect
  } else {
    return redirect
  }
}
