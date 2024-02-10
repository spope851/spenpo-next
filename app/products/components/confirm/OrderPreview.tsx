'use client'

import { SiteCard } from '@/app/components/siteCard'
import { ProjectEnvVariableInput } from '@/app/context/shoppingCart'
import { useState } from 'react'
import { SSROrder } from '../../landing-page/confirm/page'
import { b64toBlob } from '@/app/utils/string'

type ConfirmPageOrder = {
  metadata: {
    projectName: { vercelApp: string }
    environmentVariables: ProjectEnvVariableInput[]
  }
}

export const OrderPreview: React.FC<{ ssrOrder: SSROrder; imageB64: string }> = ({
  ssrOrder,
  imageB64,
}) => {
  type ComponentOrder = typeof ssrOrder & ConfirmPageOrder

  const blob = b64toBlob(imageB64)
  const fallback = URL.createObjectURL(blob)

  const [order] = useState(ssrOrder as unknown as ComponentOrder)

  return <SiteCard name={order.metadata.projectName.vercelApp} fallback={fallback} />
}
