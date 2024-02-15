'use client'

import {
  Box,
  Checkbox,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import Close from '@mui/icons-material/Close'
import React, { useContext, useEffect, useState } from 'react'
import { ShoppingCartContext } from '@/app/context/shoppingCart'
import { formatDomain } from '@/app/utils/string'

export const DomainField: React.FC = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [q, setQ] = useState(searchParams?.get('q'))
  const [d, setD] = useState(searchParams?.get('d'))
  const [p, setP] = useState(searchParams?.get('p'))
  const {
    landingCms,
    renew: [renew, setRenew],
  } = useContext(ShoppingCartContext)

  useEffect(() => {
    if (searchParams?.get('d')) setQ('')
    else setQ(searchParams?.get('q'))
    setD(searchParams?.get('d'))
    setP(searchParams?.get('p'))
  }, [searchParams])

  if (d)
    return (
      <Box
        display="grid"
        gridTemplateColumns="1fr minmax(200px, 200px) 1fr"
        gridTemplateRows="1fr 1fr"
        gridTemplateAreas="
        'blank field btn'
        'blank text check'
        "
        columnGap={1}
      >
        <TextField
          size="small"
          label="domain name"
          value={d}
          type="url"
          InputProps={{
            endAdornment: `($${p})`,
          }}
          disabled
          sx={{ gridArea: 'field' }}
        />
        <IconButton
          onClick={() => {
            const search = new URLSearchParams(Array.from(searchParams || []))
            search.delete('d')
            search.delete('p')
            router.push(`${pathname}?${search}`)
          }}
          sx={{ gridArea: 'btn' }}
        >
          <Close />
        </IconButton>
        <Typography variant="caption" p={1} sx={{ gridArea: 'text' }}>
          Auto renew yearly for <strong>${p}</strong>
        </Typography>
        <Checkbox
          checked={renew}
          onChange={(e) => setRenew(e.target.checked)}
          sx={{ gridArea: 'check' }}
        />
      </Box>
    )

  return (
    <Stack alignItems="flex-end" direction="row" columnGap={1}>
      <TextField
        size="small"
        label="domain name"
        value={q || ''}
        placeholder={formatDomain(landingCms.name.getter() || 'yourdomain.com')}
        type="url"
        onChange={(e) => {
          const formatted = formatDomain(e.target.value)
          setQ(formatted)
          router.push(`${pathname}?q=${formatted}`)
        }}
      />
      {pathname === '/products/landing-page/domain' && !q?.split('.')[1] && (
        <Typography>.vercel.app ($0)</Typography>
      )}
    </Stack>
  )
}
