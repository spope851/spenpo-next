import React from "react"
import { Deployment } from "@/components/deployment/deployment"
import { useRouter } from "next/router"

export default function Deployments() {
  const router = useRouter()
  const id = router.query.deploymentId as string

  const createdAt = router.query.createdAt as number | undefined

  return <Deployment id={id} createdAt={createdAt} />
}
