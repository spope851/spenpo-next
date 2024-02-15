'use client'
import { Button, Stack } from '@mui/material'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

export const NavBtns: React.FC = () => {
  const router = useRouter()
  const pathname = usePathname()
  return (
    <Stack direction="row" alignItems="flex-start" gap={3}>
      {['domains', 'deployments'].map((i) => (
        <Button
          key={i}
          variant="outlined"
          onClick={() => router.push(`${pathname}/${i}`)}
        >
          {i}
        </Button>
      ))}
    </Stack>
  )
}
