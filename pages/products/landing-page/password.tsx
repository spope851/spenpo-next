import React, { useContext } from 'react'
import { Button, Stack, TextField, Typography } from '@mui/material'
import { ShoppingCartContext } from '@/context/shoppingCart'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { useRouter } from 'next/router'
import { LandingStepper } from '@/components/products/landing-page/stepper'

const Password: React.FC = () => {
  const router = useRouter()
  const { setPassword, passwordSet } = useContext(ShoppingCartContext)

  return (
    <Stack gap={5} flex={1} justifyContent="flex-start" m={{ xs: 2, sm: 5 }}>
      <Stack mb="auto">
        <LandingStepper activeStep={2} />
      </Stack>
      <Stack
        justifyContent="space-between"
        direction={{ xs: 'column', sm: 'row' }}
        gap={1}
      >
        <Typography variant="h5">
          Choose a secure password for accessing admin features on your site
        </Typography>
        <Button
          endIcon={<ChevronRightIcon />}
          variant="contained"
          onClick={() => router.push('checkout')}
          disabled={!passwordSet}
          sx={{ ml: 'auto', mb: 'auto' }}
        >
          checkout
        </Button>
      </Stack>
      <Stack m="auto" flex={1} justifyContent="center" gap={3} alignItems="center">
        <TextField
          label="password"
          type="password"
          onChange={async (e) => {
            const req = await fetch('/api/hashString', {
              method: 'post',
              body: JSON.stringify({ string: e.target.value }),
            })
            const password = await req.json()
            setPassword(password.hash)
          }}
        />
      </Stack>
    </Stack>
  )
}

export default Password
