'use client'
import React, { ReactNode, useContext, useEffect } from 'react'
import { Divider, Stack, Typography } from '@mui/material'
import { ShoppingCartContext } from '../../../../context/shoppingCart'
import { SiteCard } from '@/app/products/components/SiteCard'
import { useRouter } from 'next/navigation'

const SummaryRow: React.FC<{ children: ReactNode }> = ({ children }) => (
  <>
    <Stack
      columnGap={{ xs: 5, sm: 10, md: 15 }}
      direction="row"
      justifyContent="space-between"
    >
      {children}
    </Stack>
    <Divider flexItem />
  </>
)

const WarningSummaryRow: React.FC<{ title: string; data: ReactNode }> = ({
  title,
  data,
}) => (
  <SummaryRow>
    <Typography>{title}:</Typography>
    <Typography color={data ? 'inherit' : 'red'}>
      {data || 'No value provided'}
    </Typography>
  </SummaryRow>
)

export const OrderSummary: React.FC = () => {
  const { paymentIntentMetadata } = useContext(ShoppingCartContext)
  const router = useRouter()

  useEffect(() => {
    if (
      !paymentIntentMetadata.domainName ||
      !paymentIntentMetadata.price ||
      !paymentIntentMetadata.renew ||
      !paymentIntentMetadata.projectName
    )
      router.push('/products/domain')
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Stack rowGap={3}>
      <Typography>
        The domain <strong>{paymentIntentMetadata.domainName}</strong> will be
        assigned to the following website:
      </Typography>
      <SiteCard name={paymentIntentMetadata.projectName || ''} />
      <WarningSummaryRow
        title="Auto Renewal"
        data={paymentIntentMetadata.renew ? 'ON' : 'OFF'}
      />
    </Stack>
  )
}
