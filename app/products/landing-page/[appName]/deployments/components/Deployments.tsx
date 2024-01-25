'use client'
import React, { useEffect, useState } from 'react'
import { CircularProgress, Stack } from '@mui/material'
import { useParams } from 'next/navigation'
import { DeploymentCard } from '@/app/components/deploymentCard'

const getProjectDeployments = async (appName: string) =>
  fetch(`/api/landing-page/getVercelProjectDeployments?appName=${appName}`)

export const Deployments: React.FC = () => {
  const params = useParams()
  const [data, setData] = useState<{ uid: string }[]>([])
  const [loading, setLoading] = useState(false)

  const refreshDeployments = async () => {
    setLoading(true)
    const deploymentsReq = await getProjectDeployments(String(params?.appName))
    const { deployments } = await deploymentsReq.json()
    setData(deployments)
    setLoading(false)
  }

  useEffect(() => {
    ;(async () => refreshDeployments())()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Stack rowGap={1} width="100%">
      {data.map((el) => (
        <DeploymentCard key={el.uid} uid={el.uid} />
      ))}
      {loading && <CircularProgress sx={{ alignSelf: 'center' }} />}
    </Stack>
  )
}
