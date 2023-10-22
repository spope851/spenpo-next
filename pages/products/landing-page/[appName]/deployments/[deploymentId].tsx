import React from "react"
import { Deployment } from "@/components/deployment/deployment"
import { useRouter } from "next/router"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Box } from "@mui/material"

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
