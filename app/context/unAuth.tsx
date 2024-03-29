'use client'
import { randBase64 } from '@/app/utils/randStr'
import { useSession } from 'next-auth/react'
import React, { ReactNode, createContext, useMemo, useRef } from 'react'

type UnAuthContextProps = {
  redisId: string
}

export const UnAuthContext = createContext({} as UnAuthContextProps)

export const UnAuthContextProvider: React.FC<{
  children: ReactNode
}> = ({ children }) => {
  const redisId = useRef(randBase64(32).slice(0, -1))
  const session = useSession()

  const contextValue: UnAuthContextProps = useMemo(() => {
    return {
      redisId: redisId.current,
    }
  }, [redisId])

  if (session.status === 'authenticated') return <>{children}</>

  return (
    <UnAuthContext.Provider value={contextValue}>{children}</UnAuthContext.Provider>
  )
}
