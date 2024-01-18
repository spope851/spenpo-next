import React from 'react'
import { Box, Stack, Typography } from '@mui/material'
import { PRODUCTS } from '@/constants/products'

const Password: React.FC = () => {
  return (
    <Stack m={{ xs: 2, sm: 5 }} justifyContent="space-between" flex={1}>
      <Stack rowGap={3} m={{ xs: 2, sm: 5 }}>
        <Typography variant="h2">Terms of service</Typography>
        <Typography textAlign="right" fontStyle="italic">
          Last updated: January 2, 2024
        </Typography>
        <Box component="ul">
          <Typography component="li" />
        </Box>
      </Stack>
      <Typography variant="subtitle2" textAlign="center">
        verion: {PRODUCTS.landingPage.version}
      </Typography>
    </Stack>
  )
}

export default Password
