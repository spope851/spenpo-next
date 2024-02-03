'use client'

import LoadingButton from '@mui/lab/LoadingButton'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useContext, useState } from 'react'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { ShoppingCartContext } from '@/app/context/shoppingCart'

export const ContinueBtn: React.FC<{
  disabled: boolean
}> = ({ disabled }) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const {
    domainName: [, setDomain],
    price: [, setPrice],
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
        setDomain(searchParams?.get('d') || `${searchParams?.get('q')}.vercel.app`)
        setPrice(searchParams?.get('p') ? Number(searchParams?.get('p')) * 100 : 0)
        router.push('password')
      }}
      disabled={disabled}
      sx={{ ml: 'auto', mb: 'auto' }}
    >
      continue
    </LoadingButton>
  )
}
