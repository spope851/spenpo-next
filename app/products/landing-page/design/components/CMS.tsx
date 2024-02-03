'use client'
import React, { useContext, useState } from 'react'
import { ShoppingCartContext } from '../../../../context/shoppingCart'
import { TopComponents } from './TopComponents'
import { useSession } from 'next-auth/react'
import { SpenpoLandingCache, SpenpoLanding } from 'spenpo-landing'
import { UnAuthContext } from '@/app/context/unAuth'

export const CMS: React.FC<{ cache?: SpenpoLandingCache }> = ({ cache }) => {
  const { landingCms } = useContext(ShoppingCartContext)
  const editable = useState(true)
  const { redisId } = useContext(UnAuthContext)
  const session = useSession()

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
