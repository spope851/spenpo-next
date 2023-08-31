import { UnAuthContext } from "@/context/unAuth"
import { useRouter } from "next/router"
import { useContext } from "react"

export const useCachedSignin = () => {
  const { redisId } = useContext(UnAuthContext)
  const router = useRouter()
  return {
    routeToSignin: () =>
      router.push(
        {
          pathname: "/auth/signin",
          query: { redirect: router.asPath, redisId },
        },
        "/auth/signin"
      ),
  }
}
