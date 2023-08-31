import { getDeployment } from "@/services/vercel"
import { Stack } from "@mui/material"
import { useEffect, useState } from "react"
import { VercelReadyState } from "./deployment/useDeployment"
import { ReadyState } from "./readyState"
import { NewTabLink } from "./newTabLink"
import TimeAgo from "react-timeago"
import { useRouter } from "next/router"

type Deployment = {
  id: string
  ready: number
  createdAt: number
  alias?: string[]
  url: string
  readyState: VercelReadyState
  meta: {
    githubCommitMessage: string
  }
}

export const DeploymentCard: React.FC<{ uid: string }> = ({ uid }) => {
  const [data, setData] = useState<Deployment>()
  const router = useRouter()

  useEffect(() => {
    ;(async () =>
      getDeployment(uid).then(async (res) => {
        const data = await res.json()
        setData(data)
      }))()
  }, [])

  if (!data) return <>...loading</>

  return (
    <Stack
      onClick={() => {
        const pathname = `${router.asPath}${
          router.pathname.split("/").at(-1) === "deployments" ? "" : "/deployments"
        }/${data.id}`
        router.push(
          {
            pathname,
            query: { createdAt: data.createdAt },
          },
          pathname
        )
      }}
      border="solid 2px"
      direction="row"
      justifyContent="space-between"
      p={2}
      borderRadius={1}
      sx={{
        ":hover": {
          bgcolor: "#aaa",
          cursor: "pointer",
        },
      }}
    >
      <Stack>
        <TimeAgo date={data.ready} />
      </Stack>
      <Stack direction="row" alignItems="center" mb="auto">
        {data.alias && <NewTabLink url={data.url} />}
        <ReadyState readyState={data.readyState} />
      </Stack>
    </Stack>
  )
}
