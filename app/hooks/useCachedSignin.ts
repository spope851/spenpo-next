import { UnAuthContext } from '@/app/context/unAuth'
import { usePathname, useRouter } from 'next/navigation'
import { useContext } from 'react'

export const useCachedSignin = () => {
  const { redisId } = useContext(UnAuthContext)
  const router = useRouter()
  const pathname = usePathname()
  return {
    routeToSignin: () =>
      router.push(`/auth/signin?redirect=${pathname}&redisId=${redisId}`),
  }
}
