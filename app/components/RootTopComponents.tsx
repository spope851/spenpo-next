'use client'
import { useRouter } from 'next/navigation'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { Button } from '@mui/material'
import React from 'react'

export const RootTopComponents: React.FC = () => {
  const router = useRouter()

  return (
    <Button
      endIcon={<ChevronRightIcon />}
      variant="contained"
      onClick={() => router.push('/home')}
      sx={{ ml: 'auto', mr: 5, mt: 5, textTransform: 'none' }}
    >
      Continue to spenpo.com
    </Button>
  )
}
