'use client'

import { Checkbox, IconButton, Stack, TextField, Typography } from '@mui/material'
import { useSearchParams, useRouter } from 'next/navigation'
import Close from '@mui/icons-material/Close'
import React, { useContext, useEffect, useState } from 'react'
import { ShoppingCartContext } from '@/app/context/shoppingCart'
import { formatDomain } from '@/app/utils/string'

export const DomainField: React.FC = () => {
  const router = useRouter()
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
      <Stack>
        <Stack alignItems="center" direction="row" columnGap={1}>
          <TextField
            size="small"
            label="domain name"
            value={d}
            type="url"
            InputProps={{
              endAdornment: `($${p})`,
            }}
            disabled
          />
          <IconButton
            onClick={() => {
              const search = new URLSearchParams(Array.from(searchParams || []))
              search.delete('d')
              search.delete('p')
              router.push(`/products/landing-page/domain?${search}`)
            }}
          >
            <Close />
          </IconButton>
        </Stack>
        <Stack
          alignItems="center"
          direction="row"
          columnGap={1}
          justifyContent="space-between"
          pl={1}
        >
          <Typography variant="caption">
            Auto renew yearly for <strong>${p}</strong>
          </Typography>
          <Checkbox checked={renew} onChange={(e) => setRenew(e.target.checked)} />
        </Stack>
      </Stack>
    )

  return (
    <Stack alignItems="flex-end" direction="row" columnGap={1}>
      <TextField
        size="small"
        label="domain name"
        value={q || ''}
        placeholder={formatDomain(landingCms.name.getter() || '')}
        type="url"
        onChange={(e) => {
          setQ(e.target.value)
          router.push(`/products/landing-page/domain?q=${e.target.value}`)
        }}
      />
      {!q?.split('.')[1] && <Typography>.vercel.app ($0)</Typography>}
    </Stack>
  )
}
