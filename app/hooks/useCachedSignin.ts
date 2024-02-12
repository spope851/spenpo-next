import { UnAuthContext } from '@/app/context/unAuth'
import { usePathname, useRouter } from 'next/navigation'
import { useContext } from 'react'
import { useGetQuery } from './useGetQuery'

export const useCachedSignin = () => {
  const { redisId } = useContext(UnAuthContext)
  const router = useRouter()
  const pathname = usePathname()
  const query = useGetQuery()
  const path = `/auth/signin?redirect=${pathname}&redisId=${redisId}${query}`
  return {
    routeToSignin: () => router.push(path),
    path,
  }
}
