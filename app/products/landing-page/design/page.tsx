import React from 'react'
import redis from '@/app/utils/redis'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/constants/api'
import { CMS } from './components/CMS'
import { PageProps } from '@/app/types/app'
import { redirect } from 'next/navigation'

export default async function Home({ searchParams }: PageProps) {
  const session = await getServerSession(authOptions)
  const redisId = searchParams.cache ? String(searchParams.cache) : ''

  if (session && redisId) {
    const cache = await redis.hgetall(redisId)
    await redis.hmset(session.user.id, cache)
    await redis.expire(session.user.id, 300)
    await redis.del(redisId)
    redirect('/products/landing-page/design')
  } else if (session) {
    const cache = await redis.hgetall(session.user.id)
    return <CMS cache={cache} />
  }
  return <CMS />
}
