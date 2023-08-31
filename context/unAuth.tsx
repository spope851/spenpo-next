import { randBase64 } from "@/utils/randStr"
import { useSession } from "next-auth/react"
import React, { ReactNode, createContext, useMemo, useState } from "react"

type UnAuthContextProps = {
  redisId: string
}

export const UnAuthContext = createContext({} as UnAuthContextProps)

export const UnAuthContextProvider: React.FC<{
  children: ReactNode
}> = ({ children }) => {
  const [redisId] = useState(randBase64(32))
  const session = useSession()

  const contextValue: UnAuthContextProps = useMemo(() => {
    return {
      redisId,
    }
  }, [redisId])

  if (session.status === "authenticated") return <>{children}</>

  return (
    <UnAuthContext.Provider value={contextValue}>{children}</UnAuthContext.Provider>
  )
}
