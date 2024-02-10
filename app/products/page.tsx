import { Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import prisma from '@/app/utils/prisma'
import { Product } from './components/Product'

export default async function Products() {
  const products = await prisma.product.findMany({ where: { hide: false } })

  return (
    <Stack p={{ xs: 2, sm: 5 }} gap={5} flex={1}>
      <Grid item xs={12}>
        <Typography variant="h4" textAlign="center" fontStyle="italic">
          spenpo.shop
        </Typography>
      </Grid>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Product {...product} key={product.id} />
        ))}
      </Grid>
      <Stack flex={1} justifyContent="flex-end">
        <Typography sx={{ ml: 'auto' }}>{`displaying ${products.length} product${
          products.length > 1 ? 's' : ''
        } of ${products.length}`}</Typography>
      </Stack>
    </Stack>
  )
}
