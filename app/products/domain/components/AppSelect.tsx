'use client'

import React, { useContext, useEffect, useState } from 'react'
import { ShoppingCartContext } from '@/app/context/shoppingCart'
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  FormHelperText,
  Stack,
} from '@mui/material'
import { AppPreviewImg } from '../../components/AppPreviewImg'
import { JsonValue } from '@prisma/client/runtime/library'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useCachedSignin } from '@/app/hooks/useCachedSignin'

type Metadata = {
  projectName: { vercelApp: string }
}

export type Order = {
  id: string
  metadata: JsonValue
}

const ValueItem: React.FC<{ name: string }> = ({ name }) => (
  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
    <AppPreviewImg name={name} />
    {name}
  </Box>
)

const Auth = () => (
  <FormHelperText error>
    You must manage a site on spenpo.com before you can purchase a domain. Click{' '}
    <Link href="/products/landing-page">here</Link> to set one up or{' '}
    <Link href="/contact">email me</Link> for custom options.
  </FormHelperText>
)

const UnAuth: React.FC = () => {
  const { path } = useCachedSignin()

  return (
    <FormHelperText error>
      Please <Link href={path}>sign in</Link> to continue.
    </FormHelperText>
  )
}

const helperText = {
  authenticated: <Auth />,
  unauthenticated: <UnAuth />,
  loading: <UnAuth />,
}

export const AppSelect: React.FC<{ orders: Order[]; defaultValue?: string }> = ({
  orders,
  defaultValue,
}) => {
  const getIndex = (dv?: string) => {
    const idx = orders.findIndex(
      (o) => (o.metadata as unknown as Metadata).projectName.vercelApp === dv
    )
    return idx + 1
  }

  const { setProjectName } = useContext(ShoppingCartContext)
  const [value, setValue] = useState(getIndex(defaultValue))
  const { status } = useSession()

  useEffect(() => {
    if (defaultValue) setProjectName(defaultValue)
  }, [defaultValue]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Stack gap={1} alignItems="center">
      <FormControl sx={{ mx: 'auto' }}>
        <InputLabel>Select Website</InputLabel>
        <Select
          label="Select Website"
          size="small"
          value={value}
          onChange={(e) => {
            const val = Number(e.target.value)
            setValue(val)
            const order = orders[val - 1]
            const metadata = order.metadata as unknown as Metadata
            setProjectName(metadata.projectName.vercelApp)
          }}
          sx={{
            '& .MuiSelect-select': { display: 'flex', alignItems: 'center', gap: 2 },
          }}
        >
          <MenuItem value={0} disabled>
            Which site is this domain for?
          </MenuItem>
          {orders.map((order, idx) => {
            const metadata = order.metadata as unknown as Metadata
            const name = metadata.projectName.vercelApp
            return (
              <MenuItem key={order.id} value={idx + 1}>
                <ValueItem name={name} />
              </MenuItem>
            )
          })}
        </Select>
      </FormControl>
      {orders.length === 0 && helperText[status]}
    </Stack>
  )
}
