'use client'

import { IconButton, Stack, TextField, Typography } from '@mui/material'
import { useSearchParams, useRouter } from 'next/navigation'
import Close from '@mui/icons-material/Close'
import React, { useEffect, useState } from 'react'

export const DomainField: React.FC<{ defaultValue?: string }> = ({
  defaultValue,
}) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [q, setQ] = useState(searchParams?.get('q'))
  const [d, setD] = useState(searchParams?.get('d'))
  const [p, setP] = useState(searchParams?.get('p'))

  useEffect(() => {
    if (searchParams?.get('d')) setQ('')
    else setQ(searchParams?.get('q'))
    setD(searchParams?.get('d'))
    setP(searchParams?.get('p'))
  }, [searchParams])

  if (d)
    return (
      <Stack alignItems="center" direction="row" columnGap={1}>
        <TextField
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
            router.push('/products/landing-page/domain')
          }}
        >
          <Close />
        </IconButton>
      </Stack>
    )

  return (
    <Stack alignItems="flex-end" direction="row" columnGap={1}>
      <TextField
        label="domain name"
        value={q || ''}
        placeholder={defaultValue}
        type="url"
        onChange={(e) => {
          setQ(e.target.value)
          router.push(`/products/landing-page/domain?q=${e.target.value}`)
        }}
      />
      {!q?.split('.')[1] && <Typography>.vercel.app</Typography>}
    </Stack>
  )
}
