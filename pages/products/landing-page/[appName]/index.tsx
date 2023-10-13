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
import { getProject, getProjectDeployments } from "@/services/vercel"
import { DeploymentCard } from "@/components/deploymentCard"
import ChevronLeft from "@mui/icons-material/ChevronLeft"
import { LinkPreview } from "@/components/linkPreview"
import Link from "next/link"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { HoverAwareness } from "@/components/hoverAwareness"
import { Project } from "@/components/siteCard"
import { Domains } from "@/components/deployment/domains"
import { Status } from "@/components/deployment/status"
import { SmallHeader } from "@/components/deployment/smallHeader"
import ReactTimeago from "react-timeago"

const SitePage: React.FC = () => {
  const router = useRouter()
  const [data, setData] = useState<Project>()
  const [loading, setLoading] = useState(false)
  const [linkHover, setLinkHover] = useState(false)
  const [accordionExpanded, setAccordionExpanded] = useState(true)

  const refreshProject = async () => {
    setLoading(true)
    const projectReq = await getProject(String(router.query.appName))
    const project = await projectReq.json()
    setData(project)
    setLoading(false)
  }

  useEffect(() => {
    ;(async () => refreshProject())()
  })

  const linkPreview = useMemo(() => {
    return <LinkPreview url={`https://${data?.targets.production?.alias?.[0]}`} />
  }, [data])

  return (
    <Stack rowGap={1} m={5}>
      <Stack direction="row" justifyContent="space-between">
        <Breadcrumbs />
        <Button
          variant="contained"
          onClick={refreshProject}
          sx={{ minWidth: 36, p: 1 }}
        >
          <CachedIcon />
        </Button>
      </Stack>
      <Stack m={5} rowGap={5} sx={{ "& .Mui-expanded": { m: "0px !important" } }}>
        <Stack direction="row" justifyContent="space-around" columnGap={5}>
          {linkPreview}
          <Stack flex={1} border="solid 2px #aaa" p={2} rowGap={3}>
            <Domains alias={data?.targets.production?.alias} />
            <Status readyState={data?.targets.production?.readyState} />
            <Stack>
              <SmallHeader>Created</SmallHeader>
              {data?.createdAt && <ReactTimeago date={data.createdAt} />}
            </Stack>
          </Stack>
        </Stack>
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
            <Typography>Latest Deployments</Typography>
            <HoverAwareness setHovering={setLinkHover}>
              <Link href={`${router.asPath}/deployments`}>view all</Link>
            </HoverAwareness>
          </AccordionSummary>
          <AccordionDetails>
            <Stack rowGap={1}>
              {data?.latestDeployments.map((deployment) => (
                <DeploymentCard key={deployment.id} uid={deployment.id} />
              ))}
              {loading && <CircularProgress sx={{ alignSelf: "center" }} />}
            </Stack>
          </AccordionDetails>
        </Accordion>
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
