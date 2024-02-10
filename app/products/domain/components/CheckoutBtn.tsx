'use client'

import LoadingButton from '@mui/lab/LoadingButton'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useContext, useState } from 'react'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { ShoppingCartContext } from '@/app/context/shoppingCart'

export const CheckoutBtn: React.FC = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const {
    domainName: [, setDomain],
    price: [, setPrice],
    paymentIntentMetadata,
  } = useContext(ShoppingCartContext)
  const [loading, setLoading] = useState(false)

  return (
    <LoadingButton
      loading={loading}
      loadingPosition="end"
      endIcon={<ChevronRightIcon />}
      variant="contained"
      onClick={() => {
        setLoading(true)
        setDomain(String(searchParams?.get('d')))
        setPrice(searchParams?.get('p') ? Number(searchParams?.get('p')) * 100 : 0)
        router.push('/products/domain/checkout')
      }}
      disabled={!searchParams?.get('d') || !paymentIntentMetadata.projectName}
      sx={{ ml: 'auto', mb: 'auto' }}
    >
      Checkout
    </LoadingButton>
  )
}
