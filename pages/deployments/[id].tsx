import React from "react"
import { Deployment } from "@/components/deployment/deployment"
import { useRouter } from "next/router"

export default function Deployments() {
  const router = useRouter()
  const id = router.query.id as string

  const createdAt = Number(router.query.createdAt)

  if (createdAt) return <Deployment id={id} createdAt={createdAt} />
}
