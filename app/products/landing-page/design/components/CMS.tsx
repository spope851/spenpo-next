'use client'
import React, { useContext, useState } from 'react'
import { ShoppingCartContext } from '../../../../context/shoppingCart'
import { TopComponents } from './TopComponents'
import { useSession } from 'next-auth/react'
import { SpenpoLandingCache, SpenpoLanding } from 'spenpo-landing'
import { UnAuthContext } from '@/app/context/unAuth'

const DEFAULT_PROPS = {
  name: 'your name',
  title: 'your title',
  subtitle: 'something interesting about you',
  socialUrls: [
    'https://twitter.com',
    'https://www.instagram.com',
    'https://www.facebook.com',
    'https://www.youtube.com',
    'mailto:e@mail.com',
    'https://whatsapp.com',
  ],
  actionStatement: 'your action statement',
  actionDestination: 'https://www.spenpo.com',
  headshotSrc: 'https://spenpo-landing.vercel.app/default.svg',
}

export const CMS: React.FC<{ cache?: SpenpoLandingCache }> = ({ cache }) => {
  const { landingCms } = useContext(ShoppingCartContext)
  const editable = useState(true)
  const { redisId } = useContext(UnAuthContext)
  const session = useSession()

  return (
    <SpenpoLanding
      cms={landingCms}
      cacheCallback={async (callbackCache) => {
        const cache = callbackCache
        if (callbackCache.headshotFile) {
          const body = new FormData()
          body.append('file', callbackCache.headshotFile)
          const base64Req = await fetch('/api/fileToBase64', {
            method: 'post',
            body,
          })
          const base64Res = await base64Req.json()
          cache.HEADSHOT_FILE = base64Res.base64
          delete cache.headshotFile
        }

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
      {...DEFAULT_PROPS}
    />
  )
}
