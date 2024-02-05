'use client'

import { SiteCard } from '@/app/components/siteCard'
import { ProjectEnvVariableInput } from '@/app/context/shoppingCart'
import { Box, CircularProgress, Link, Stack, Typography } from '@mui/material'
import { useState, useEffect } from 'react'
import { SSROrder } from '../page'
import { b64toBlob } from '@/app/utils/string'

const getProject = async (name: string) =>
  await fetch(`/api/landing-page/getVercelProject?name=${name}`)

type ConfirmPageOrder = {
  metadata: {
    projectName: { vercelApp: string }
    environmentVariables: ProjectEnvVariableInput[]
  }
}

export const Order: React.FC<{ ssrOrder: SSROrder; imageB64: string }> = ({
  ssrOrder,
  imageB64,
}) => {
  type ComponentOrder = typeof ssrOrder & ConfirmPageOrder

  const blob = b64toBlob(imageB64)
  const fallback = URL.createObjectURL(blob)

  const getOrder = async (): Promise<{ order: ComponentOrder }> => {
    const refetchOrder = await fetch(`/api/getOrder?orderId=${order.id}`)
    return refetchOrder.json()
  }

  const [order, setOrder] = useState(ssrOrder as unknown as ComponentOrder)
  const [domains, setDomains] = useState<string[]>([])

  useEffect(() => {
    if (domains.length === 0) {
      ;(async () => {
        const projectReq = await getProject(order.metadata.projectName.vercelApp)
        const project = await projectReq.json()
        setDomains(project?.targets?.production?.alias || [])
      })()
    }
  }, [domains, order]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const refetch = async () => {
      const refetchOrder = await getOrder()
      setOrder(refetchOrder.order)
    }
    if (!order.error && !order.complete) refetch()
    else if (!order.metadata.projectName?.vercelApp) refetch()
  }, [order]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!order.error && !order.complete)
    return (
      <Stack m="auto">
        <CircularProgress />
      </Stack>
    )
  return (
    <>
      {order.error ? (
        <Typography color="red" maxWidth={300}>
          Something went wrong. Please <Link href="/contact">contact support</Link>{' '}
          with your order number: #{order.id}
        </Typography>
      ) : (
        <>
          <Typography variant="h4" textAlign="center">
            Congratulations
          </Typography>
          <Typography variant="h5" textAlign="center">
            Your website is being deployed and will be available shortly as the
            following URLs:
          </Typography>
          <Box mx="auto">
            {domains.length > 0 ? (
              <Box component="ul">
                {domains.map((domain) => (
                  <Typography key={domain} component="li" variant="subtitle2">
                    {domain}
                  </Typography>
                ))}
              </Box>
            ) : (
              <CircularProgress />
            )}
          </Box>
          <Typography textAlign="center">See below for details</Typography>
          <Box mx="auto">
            <SiteCard
              name={order.metadata.projectName.vercelApp}
              fallback={fallback}
            />
          </Box>
        </>
      )}
    </>
  )
}
