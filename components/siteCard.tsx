import { getProject } from "@/services/vercel"
import { Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { VercelReadyState } from "./deployment/useDeployment"
import { ReadyState } from "./readyState"
import { NewTabLink } from "./newTabLink"
import TimeAgo from "react-timeago"
import { useRouter } from "next/router"

type Project = {
  id: string
  name: string
  updatedAt: number
  targets: {
    production: {
      alias?: string[]
      readyState: VercelReadyState
    }
  }
}

export const SiteCard: React.FC<{ name: string }> = ({ name }) => {
  const [data, setData] = useState<Project>()
  const router = useRouter()

  useEffect(() => {
    ;(async () =>
      getProject(name).then(async (res) => {
        const data = await res.json()
        setData(data)
      }))()
  }, [])

  if (!data) return <>...loading</>

  return (
    <Stack
      onClick={() => router.push(`${router.pathname}/${data.name}/deployments`)}
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
        <Typography fontWeight="bold">{data.name}</Typography>
        <TimeAgo date={data.updatedAt} />
      </Stack>
      <Stack direction="row" alignItems="center" mb="auto">
        {data.targets.production.alias && (
          <NewTabLink url={data.targets.production.alias[0]} />
        )}
        <ReadyState readyState={data.targets.production.readyState} />
      </Stack>
    </Stack>
  )
}
