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
  const isSelected = searchParams?.get('d') === domainName
  return (
    <Box
      borderRadius={1}
      textAlign="center"
      p={1}
      display="flex"
      justifyContent="center"
      overflow="scroll"
      gap={1}
      sx={{
        bgcolor: isSelected ? '#555' : '',
        color: isSelected ? '#fff' : '',
        ':hover': {
          outline: 'solid #999',
          cursor: 'pointer',
        },
        '& .MuiTypography-root': { fontWeight: isSelected ? 700 : 400 },
      }}
      onClick={() => {
        const search = new URLSearchParams(Array.from(searchParams?.entries() || []))
        search?.set('d', domainName)
        search?.set('p', price)
        router.push(`${pathname}?${search}`)
      }}
    >
      <Typography>{domainName}</Typography>
      <Typography color={isSelected ? 'lime' : 'blue'}>${price}</Typography>
    </Box>
  )
}
