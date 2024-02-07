import { Stack } from '@mui/material'
import React from 'react'
import { getDeployment } from '../services/vercel'
import { DeploymentCardClient } from './deploymentCardClient'

export async function DeploymentCard({ uid }: { uid: string }) {
  const deploymentReq = await getDeployment(uid)
  const deployment = await deploymentReq.json()

  if (!deployment)
    return (
      <Stack border="solid 2px #aaa" p={2} borderRadius={1}>
        ...loading
      </Stack>
    )

  return <DeploymentCardClient {...deployment} />
}
