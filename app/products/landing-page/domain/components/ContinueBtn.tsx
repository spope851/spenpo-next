'use client'

import { Button } from '@mui/material'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

export const ContinueBtn: React.FC<{
  disabled: boolean
  cache: Record<string, string>
}> = ({ disabled, cache }) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  return (
    <Button
      endIcon={<ChevronRightIcon />}
      variant="contained"
      onClick={async () => {
        await fetch('/api/cache/authLanding', {
          method: 'post',
          body: JSON.stringify({
            ...cache,
            domain: searchParams?.get('d') || `${searchParams?.get('q')}.vercel.app`,
            price: searchParams?.get('p') ? Number(searchParams?.get('p')) * 100 : 0,
          }),
        })
        router.push('password')
      }}
      disabled={disabled}
      sx={{ ml: 'auto', mb: 'auto' }}
    >
      continue
    </Button>
  )
}
