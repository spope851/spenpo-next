'use client'

import { Button } from '@mui/material'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useContext } from 'react'
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

  return (
    <Button
      endIcon={<ChevronRightIcon />}
      variant="contained"
      onClick={() => {
        setDomain(searchParams?.get('d') || `${searchParams?.get('q')}.vercel.app`)
        setPrice(searchParams?.get('p') ? Number(searchParams?.get('p')) * 100 : 0)
        router.push('password')
      }}
      disabled={disabled}
      sx={{ ml: 'auto', mb: 'auto' }}
    >
      continue
    </Button>
  )
}
