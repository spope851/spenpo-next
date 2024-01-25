'use client'
import React from 'react'
import { Button, Grid, Stack, Typography } from '@mui/material'
import { BgImage } from '@/app/components/bgImage'
import { useRouter } from 'next/navigation'

export const Product: React.FC<{
  id: string
  name: string
  description: string
  price: number
  hide: boolean
}> = ({ price, id, name, description }) => {
  const router = useRouter()

  return (
    <Grid
      item
      lg={3}
      sm={6}
      xs={12}
      borderRadius={1}
      gap={2}
      display="flex"
      flexDirection="column"
      bgcolor="#eee"
      border="solid 1px #ddd"
      p={3}
    >
      <BgImage
        src={`/images/${id}.png`}
        sx={{
          minHeight: 200,
          flex: 1,
          borderRadius: 2,
          border: 'solid 1px #555',
          m: '2px',
        }}
      />
      <Stack gap={1}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
          <Typography variant="h6">{name}</Typography>
          <Typography>${price / 100}</Typography>
        </Stack>
        <Typography>{description}</Typography>
        <Stack gap={1} ml="auto" direction="row">
          {/* <Button variant="outlined" disabled>
            coming soon
          </Button> */}
          <Button onClick={() => router.push('/products/' + id)} variant="text">
            learn more
          </Button>
          <Button
            onClick={() => router.push('/products/' + id + '/design')}
            variant="contained"
          >
            buy now
          </Button>
        </Stack>
      </Stack>
    </Grid>
  )
}
