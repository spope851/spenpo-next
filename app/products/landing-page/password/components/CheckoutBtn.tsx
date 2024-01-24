'use client'
import React, { useContext } from 'react'
import { Button } from '@mui/material'
import { ShoppingCartContext } from '@/context/shoppingCart'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { useRouter } from 'next/navigation'

export const CheckoutBtn: React.FC = () => {
  const router = useRouter()
  const { passwordSet } = useContext(ShoppingCartContext)

  return (
    <Button
      endIcon={<ChevronRightIcon />}
      variant="contained"
      onClick={() => router.push('checkout')}
      disabled={!passwordSet}
      sx={{ ml: 'auto', mb: 'auto' }}
    >
      checkout
    </Button>
  )
}
