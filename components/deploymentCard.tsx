import { getDeployment } from "@/services/vercel"
import { Stack } from "@mui/material"
import { useEffect, useState } from "react"
import { VercelReadyState } from "./deployment/useDeployment"
import { ReadyState } from "./readyState"
import { NewTabLink } from "./newTabLink"
import TimeAgo from "react-timeago"
import { useRouter } from "next/router"
import { HoverAwareness } from "./hoverAwareness"

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
  const [linkHover, setLinkHover] = useState(false)

  useEffect(() => {
    ;(async () =>
      getDeployment(uid).then(async (res) => {
        const data = await res.json()
        setData(data)
      }))()
  }, [uid])

  if (!data)
    return (
      <Stack border="solid 2px #aaa" p={2} borderRadius={1}>
        ...loading
      </Stack>
    )

  return (
    <Stack
      id="spenpo-deployment-card"
      onClick={() => {
        if (linkHover) return
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
      border="solid 2px #aaa"
      p={2}
      borderRadius={1}
      direction="row"
      justifyContent="space-between"
      sx={{
        ":hover": {
          bgcolor: "#aaa",
          cursor: "pointer",
        },
      }}
      alignItems="center"
    >
      {/* @ts-expect-error Server Component */}
      <TimeAgo date={data.ready} />
      <Stack direction="row" alignItems="center" mb="auto">
        {data.alias && (
          <HoverAwareness
            setHovering={setLinkHover}
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "40vw",
            }}
          >
            <NewTabLink url={data.url} />
          </HoverAwareness>
        )}
        <ReadyState readyState={data.readyState} />
      </Stack>
    </Stack>
  )
}
