'use client'
import React, { useContext, useEffect, useState } from 'react'
import { ShoppingCartContext } from '../../../../context/shoppingCart'
import { TopComponents } from './TopComponents'
import { useSession } from 'next-auth/react'
import { SnackbarContext } from '../../../../context/snackbar'
import { Button } from '@mui/material'
import { useCachedSignin } from '../../../../hooks/useCachedSignin'
import { SpenpoLandingCache, SpenpoLanding } from 'spenpo-landing'
import { UnAuthContext } from '@/app/context/unAuth'

export const CMS: React.FC<{ cache?: SpenpoLandingCache }> = ({ cache }) => {
  const { landingCms } = useContext(ShoppingCartContext)
  const { setSnackbarOpen, setSnackbarMessage, setSnackbarAction } =
    useContext(SnackbarContext)
  const editable = useState(true)
  const { redisId } = useContext(UnAuthContext)
  const session = useSession()
  const { routeToSignin } = useCachedSignin()

  useEffect(() => {
    // router.replace('', undefined, { shallow: true })
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
      cacheCallback={async (callbackCache) => {
        if (session.status === 'unauthenticated') {
          fetch('/api/cache/unAuthLanding', {
            body: JSON.stringify({ cache: callbackCache, id: redisId }),
            method: 'post',
          })
        } else if (session.status === 'authenticated') {
          fetch('/api/cache/authLanding', {
            body: JSON.stringify(callbackCache),
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
