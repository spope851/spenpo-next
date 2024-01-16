import React, { useContext, useEffect, useState } from 'react'
import { ShoppingCartContext } from '../../../context/shoppingCart'
import { TopComponents } from '../../../components/products/landing-page/topComponents'
import { useRouter } from 'next/router'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../pages/api/auth/[...nextauth]'
import redis from '../../../utils/redis'
import { GetServerSidePropsContext } from 'next'
import { useSession } from 'next-auth/react'
import { SnackbarContext } from '../../../context/snackbar'
import { Button } from '@mui/material'
import { useCachedSignin } from '../../../hooks/useCachedSignin'
import { SpenpoLandingCache, SpenpoLanding } from 'spenpo-landing'
import { UnAuthContext } from '@/context/unAuth'

const Demo: React.FC<{ cache: SpenpoLandingCache }> = ({ cache }) => {
  const { landingCms } = useContext(ShoppingCartContext)
  const { setSnackbarOpen, setSnackbarMessage, setSnackbarAction } =
    useContext(SnackbarContext)
  const editable = useState(true)
  const router = useRouter()
  const { redisId } = useContext(UnAuthContext)
  const session = useSession()
  const { routeToSignin } = useCachedSignin()

  useEffect(() => {
    router.replace('', undefined, { shallow: true })
    if (session.status === 'unauthenticated') {
      setTimeout(() => {
        setSnackbarOpen(true)
        setSnackbarMessage(
          'minimum caching is enabled. please sign in to save your progress'
        )
        setSnackbarAction(
          <Button variant="outlined" onClick={() => routeToSignin()}>
            sign in
          </Button>
        )
      }, 15000)
    }
  }, [session.status]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <SpenpoLanding
      cms={landingCms}
      cacheCallback={async () => {
        if (session.status === 'unauthenticated') {
          fetch('/api/cache/unAuthLanding', {
            body: JSON.stringify({ cache, id: redisId }),
            method: 'post',
          })
        } else if (session.status === 'authenticated') {
          fetch('/api/cache/authLanding', {
            body: JSON.stringify(cache),
            method: 'post',
          })
        }
      }}
      editable={editable}
      topComponents={<TopComponents editable={editable[0]} />}
      cache={cache}
    />
  )
}

export default Demo

export async function getServerSideProps({
  query,
  req,
  res,
}: GetServerSidePropsContext) {
  const session = await getServerSession(req, res, authOptions)

  if (session && query.cache) {
    const cache = await redis.hgetall(String(query.cache))
    await redis.del(String(query.cache))
    return { props: { cache } }
  } else if (session) {
    const cache = await redis.hgetall(String(session.user.email))
    return { props: { cache } }
  }

  return {
    props: {},
  }
}
