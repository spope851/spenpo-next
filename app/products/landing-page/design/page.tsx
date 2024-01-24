import React from 'react'
import redis from '@/utils/redis'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { CMS } from './components/CMS'
import { PageProps } from '@/types/app'

export default async function Home({ searchParams }: PageProps) {
  const session = await getServerSession(authOptions)
  const redisId = searchParams.cache ? String(searchParams.cache) : ''

  if (session && redisId) {
    const cache = await redis.hgetall(redisId)
    await redis.del(redisId)
    return <CMS cache={cache} />
  } else if (session) {
    const cache = await redis.hgetall(String(session.user.email))
    return <CMS cache={cache} />
  }
  return <CMS />
}
