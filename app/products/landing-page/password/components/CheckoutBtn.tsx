'use client'
import React, { useContext, useState } from 'react'
import LoadingButton from '@mui/lab/LoadingButton'
import { ShoppingCartContext } from '@/app/context/shoppingCart'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { useRouter } from 'next/navigation'

export const CheckoutBtn: React.FC = () => {
  const router = useRouter()
  const { passwordSet } = useContext(ShoppingCartContext)
  const [loading, setLoading] = useState(false)

  return (
    <LoadingButton
      loading={loading}
      loadingPosition="end"
      endIcon={<ChevronRightIcon />}
      variant="contained"
      onClick={() => {
        setLoading(true)
        router.push('checkout')
      }}
      disabled={!passwordSet}
      sx={{ ml: 'auto', mb: 'auto' }}
    >
      checkout
    </LoadingButton>
  )
}
