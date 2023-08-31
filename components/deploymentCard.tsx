import { getDeployment, getProject } from "@/services/vercel"
import { Stack, Typography } from "@mui/material"
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
      onClick={() =>
        router.push(
          {
            pathname: `${router.asPath}/${data.id}`,
            query: { createdAt: data.createdAt },
          },
          `${router.asPath}/${data.id}`
        )
      }
      border="solid 2px"
      direction="row"
      justifyContent="space-between"
      p={2}
      borderRadius={2}
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
        {data.alias && <NewTabLink url={data.alias[0]} />}
        <ReadyState readyState={data.readyState} />
      </Stack>
    </Stack>
  )
}
