'use client'

import { Button, Typography } from '@mui/material'
import React from 'react'
import Image from 'next/image'
import { ClientSafeProvider, LiteralUnion, signIn } from 'next-auth/react'
import { BuiltInProviderType } from 'next-auth/providers/index'

const PROVIDER_COLORS: Partial<
  Record<LiteralUnion<BuiltInProviderType, string>, string>
> = {
  github: '#4078c0',
  google: '#4285f4',
  facebook: '#1877f2',
}

export const ProviderBtn: React.FC<
  ClientSafeProvider & { redirectPath: string }
> = ({ redirectPath, id, name }) => {
  return (
    <Button
      key={id}
      variant="outlined"
      onClick={() =>
        signIn(id, {
          callbackUrl: redirectPath,
        })
      }
      sx={{
        gap: 1,
        textTransform: 'none',
        borderColor: PROVIDER_COLORS[id],
        color: PROVIDER_COLORS[id],
      }}
    >
      <Image
        src={`/images/providers/${name}.png`}
        height={30}
        width={30}
        alt={name}
      />
      <Typography>Continue with {name}</Typography>
    </Button>
  )
}
