import React, { useEffect, useState } from "react"
import { Button, CircularProgress, Stack } from "@mui/material"
import { useRouter } from "next/router"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next"
import { getServerSession } from "next-auth"
import CachedIcon from "@mui/icons-material/Cached"
import { getProjectDeployments } from "@/services/vercel"
import { DeploymentCard } from "@/components/deploymentCard"
import ChevronLeft from "@mui/icons-material/ChevronLeft"
import { Breadcrumbs } from "@/components/breadcrumbs"

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
    <Stack rowGap={1} m={{ xs: 2, sm: 5 }}>
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
      <Stack direction="row" justifyContent="space-around" m={{ xs: 2, sm: 5 }}>
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

export async function getServerSideProps({ req, res }: GetServerSidePropsContext) {
  const session = await getServerSession(req, res, authOptions)
  if (session) {
    return { props: {} }
  } else {
    return {
      redirect: {
        permanent: false,
        destination: `/home`,
      },
    }
  }
}
