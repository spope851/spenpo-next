import React, { useEffect, useMemo, useState } from "react"
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material"
import { useRouter } from "next/router"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next"
import { getServerSession } from "next-auth"
import CachedIcon from "@mui/icons-material/Cached"
import { getProjectDeployments } from "@/services/vercel"
import { DeploymentCard } from "@/components/deploymentCard"
import ChevronLeft from "@mui/icons-material/ChevronLeft"
import { LinkPreview } from "@dhaiwat10/react-link-preview"
import Link from "next/link"
import { Breadcrumbs } from "@/components/breadcrumbs"

const SitePage: React.FC<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = () => {
  const router = useRouter()
  const [data, setData] = useState<{ uid: string; url: string }[]>([])
  const [loading, setLoading] = useState(false)
  const [linkHover, setLinkHover] = useState(false)
  const [accordionExpanded, setAccordionExpanded] = useState(true)

  const refreshDeployments = async () => {
    setLoading(true)
    const deploymentsReq = await getProjectDeployments(String(router.query.appName))
    const { deployments } = await deploymentsReq.json()
    setData(deployments)
    setLoading(false)
  }

  useEffect(() => {
    ;(async () => refreshDeployments())()
  }, [])

  const linkPreview = useMemo(() => {
    return (
      data.length > 0 && (
        <LinkPreview
          url={`https://${data[0].url}`}
          fetcher={async (url: string) => {
            const req = await fetch(`/api/getLinkPreview?url=${url}`, {
              method: "get",
            })
            const json = await req.json()
            return json
          }}
          fallbackImageSrc="https://www.pngitem.com/pimgs/m/618-6183618_transparent-unknown-person-png-transparent-background-female-user.png"
        />
      )
    )
  }, [data[0]?.url])

  return (
    <Stack rowGap={1} m={5}>
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
      <Stack direction="row" justifyContent="space-around" m={5} columnGap={5}>
        {linkPreview}
        <Stack width="100%">
          <Accordion
            expanded={accordionExpanded}
            onChange={() => {
              if (linkHover) return
              setAccordionExpanded(!accordionExpanded)
            }}
          >
            <AccordionSummary
              sx={{
                "& .MuiAccordionSummary-content": {
                  justifyContent: "space-between",
                },
              }}
            >
              <Typography>Deployments</Typography>
              <Link
                onMouseOver={() => setLinkHover(true)}
                onMouseOut={() => setLinkHover(false)}
                href={`${router.asPath}/deployments`}
              >
                view all
              </Link>
            </AccordionSummary>
            <AccordionDetails>
              <Stack rowGap={1}>
                {data.map((el) => (
                  <DeploymentCard key={el.uid} uid={el.uid} />
                ))}
                {loading && <CircularProgress sx={{ alignSelf: "center" }} />}
              </Stack>
            </AccordionDetails>
          </Accordion>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default SitePage

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
