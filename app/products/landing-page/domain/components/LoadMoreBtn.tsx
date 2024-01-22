'use client'

import { Button } from '@mui/material'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { LIMIT_INCREMENT } from '../constants'

export const LoadMoreBtn: React.FC<{ disabled: boolean }> = ({ disabled }) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  return (
    <Button
      variant="outlined"
      onClick={() => {
        const current = new URLSearchParams(
          Array.from(searchParams?.entries() || [])
        )
        current.set(
          'limit',
          (
            (Number(searchParams?.get('limit')) || LIMIT_INCREMENT) + LIMIT_INCREMENT
          ).toString()
        )
        const search = current.toString()
        router.push(`${pathname}?${search}`)
      }}
      sx={{ mx: 'auto' }}
      disabled={disabled}
    >
      load more
    </Button>
  )
}
