'use client'
import React from 'react'
import { Box, Typography } from '@mui/material'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export const AvailableDomain: React.FC<{ domainName: string; price: string }> = ({
  domainName,
  price,
}) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  return (
    <Box
      border="solid"
      borderRadius={1}
      textAlign="center"
      p={1}
      display="flex"
      justifyContent="center"
      overflow="scroll"
      gap={1}
      sx={{
        bgcolor: searchParams?.get('d') === domainName ? '#999' : '',
        ':hover': {
          bgcolor: '#999',
          cursor: 'pointer',
        },
      }}
      onClick={() => {
        const search = new URLSearchParams(Array.from(searchParams?.entries() || []))
        search?.set('d', domainName)
        search?.set('p', price)
        router.push(`${pathname}?${search}`)
      }}
    >
      <Typography>{domainName}</Typography>
      <Typography color="blue">${price}</Typography>
    </Box>
  )
}
