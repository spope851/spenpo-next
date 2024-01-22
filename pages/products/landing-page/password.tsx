import React, { useContext, useEffect, useState } from 'react'
import { Button, Stack, TextField, Typography } from '@mui/material'
import { ShoppingCartContext } from '@/context/shoppingCart'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { useRouter } from 'next/router'
import { LandingStepper } from '@/components/products/landing-page/stepper'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import redis from '@/utils/redis'
import { GetServerSidePropsContext } from 'next'
import { getServerSession } from 'next-auth'

const Password: React.FC<{ cache: Record<string, string> }> = ({ cache }) => {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const {
    setPassword: setCtxPassword,
    passwordSet,
    projectName,
    price,
  } = useContext(ShoppingCartContext)

  useEffect(() => {
    projectName[1](cache?.domain)
    price[1](Number(cache?.price))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Stack gap={5} flex={1} justifyContent="flex-start" m={{ xs: 2, sm: 5 }}>
      <Stack>
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
      <Stack flex={1} justifyContent="flex-start" gap={1} alignItems="center">
        <TextField
          onChange={(e) => setPassword(e.target.value)}
          error={password !== confirmPassword}
          size="small"
          label="Password"
          type="password"
        />
        <TextField
          onChange={async (e) => {
            setConfirmPassword(e.target.value)
            if (password === e.target.value) {
              const change = await fetch('/api/hashString', {
                method: 'post',
                body: JSON.stringify({
                  string: password,
                }),
              })
              const changeRes = await change.json()
              setCtxPassword(changeRes.hash)
            }
          }}
          error={password !== confirmPassword}
          size="small"
          label="Confirm Password"
          type="password"
        />
      </Stack>
    </Stack>
  )
}

export default Password

export async function getServerSideProps({ req, res }: GetServerSidePropsContext) {
  const session = await getServerSession(req, res, authOptions)

  if (session) {
    const cache = await redis.hgetall(String(session.user.email))
    return { props: { cache } }
  }

  return {
    redirect: {
      permanent: false,
      destination: `/products/landing-page/design`,
    },
  }
}
