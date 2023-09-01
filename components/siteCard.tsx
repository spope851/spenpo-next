import { getProject } from "@/services/vercel"
import { Stack, Typography, Button } from "@mui/material"
import { useEffect, useState } from "react"
import { VercelReadyState } from "./deployment/useDeployment"
import { ReadyState } from "./readyState"
import { NewTabLink } from "./newTabLink"
import TimeAgo from "react-timeago"
import { useRouter } from "next/router"
import CachedIcon from "@mui/icons-material/Cached"
import { HoverAwareness } from "./hoverAwareness"

type Project = {
  id: string
  name: string
  updatedAt: number
  targets: {
    production?: {
      alias?: string[]
      readyState: VercelReadyState
    }
  }
}

export const SiteCard: React.FC<{ name: string }> = ({ name }) => {
  const [data, setData] = useState<Project>()
  const router = useRouter()
  const [actionHover, setActionHover] = useState(false)

  const fetchProject = async () =>
    getProject(name).then(async (res) => {
      const data = await res.json()
      setData(data)
    })

  useEffect(() => {
    ;(async () => fetchProject())()
  }, [])

  if (!data) return <>...loading</>

  return (
    <Stack
      onClick={() => !actionHover && router.push(`${router.pathname}/${data.name}`)}
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
        <Typography fontWeight="bold">{data.name}</Typography>
        <TimeAgo date={data.updatedAt} />
      </Stack>
      {data.targets.production ? (
        <Stack direction="row" alignItems="center" mb="auto">
          {data.targets.production?.alias && (
            <HoverAwareness setHovering={setActionHover}>
              <NewTabLink url={data.targets.production.alias[0]} />
            </HoverAwareness>
          )}
          <ReadyState readyState={data.targets.production.readyState} />
        </Stack>
      ) : (
        <HoverAwareness setHovering={setActionHover}>
          <Button
            variant="contained"
            onClick={async () => fetchProject()}
            sx={{ ml: "auto", minWidth: 36, p: 1 }}
          >
            <CachedIcon />
          </Button>
        </HoverAwareness>
      )}
    </Stack>
  )
}
