'use client'

import { SiteCard } from '@/app/products/components/SiteCard'
import { useState } from 'react'
import { SSROrder } from '../../landing-page/confirm/page'
import { b64toBlob } from '@/app/utils/string'

type ConfirmPageOrder = {
  metadata: {
    project?: string
    projectName?: { vercelApp: string }
  }
}

export const OrderPreview: React.FC<{
  ssrOrder: SSROrder
  imageB64: string
  revalidate: () => Promise<void>
}> = ({ ssrOrder, imageB64, revalidate }) => {
  type ComponentOrder = typeof ssrOrder & ConfirmPageOrder

  const blob = b64toBlob(imageB64)
  const fallback = URL.createObjectURL(blob)

  const [order] = useState(ssrOrder as unknown as ComponentOrder)

  return (
    <SiteCard
      name={order.metadata.projectName?.vercelApp || order.metadata.project || ''}
      fallback={fallback}
      revalidate={revalidate}
    />
  )
}
