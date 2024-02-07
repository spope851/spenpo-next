import React from 'react'
import { Stack, Typography } from '@mui/material'
import DomainVerificationIcon from '@mui/icons-material/DomainVerification'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { getDomainInfo, getDomainPrice } from '@/app/services/vercel'
import { revalidateTag } from 'next/cache'
import { ClientDomain } from './ClientDomain'

export type DomainProps = {
  name: string
  domains: string[]
  redirect: string | null
  redirectStatusCode: number | null
}

export async function Domain({
  name,
  domains,
  redirect,
  redirectStatusCode,
}: DomainProps) {
  let domain
  let price
  if (!name.endsWith('.vercel.app')) {
    const domainReq = await getDomainInfo(name)
    const d = await domainReq.json()
    domain = d?.domain
    const priceReq = await getDomainPrice(name)
    const p = await priceReq.json()
    price = p.price
  }
  return (
    <Stack p={3} border="solid #555" borderRadius={1} key={name} gap={3}>
      <ClientDomain
        redirectStatusCode={redirectStatusCode}
        redirect={redirect}
        domains={domains}
        name={name}
        refresh={async () => {
          'use server'
          revalidateTag('domainInfo')
        }}
      />
      <Stack direction="row" gap={3} justifyContent="space-between">
        {domain?.verified && (
          <Stack direction="row" gap={1} alignItems="center">
            <DomainVerificationIcon />
            <Typography variant="body2">Verified</Typography>
          </Stack>
        )}
        <Stack direction="row" gap={3}>
          {domain?.expiresAt && (
            <Stack direction="row" gap={1} alignItems="center">
              <Typography variant="body2">
                Exipration Date:{' '}
                <strong>{new Date(domain.expiresAt).toLocaleDateString()}</strong>
              </Typography>
            </Stack>
          )}
          {domain?.renew && (
            <Stack direction="row" gap={1} alignItems="center">
              <CheckCircleOutlineIcon />
              <Typography variant="body2">Auto Renewal On</Typography>
            </Stack>
          )}
          {price && (
            <Stack direction="row" gap={1} alignItems="center">
              <Typography variant="body2">
                Renews at <strong>${price}</strong>
              </Typography>
            </Stack>
          )}
        </Stack>
      </Stack>
    </Stack>
  )
}
