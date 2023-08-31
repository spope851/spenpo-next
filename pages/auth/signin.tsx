import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next"
import { getProviders, signIn } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]"
import { Box, Button } from "@mui/material"
import { useRouter } from "next/router"

export default function SignIn({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter()

  return (
    <>
      {Object.values(providers).map((provider) => (
        <Box key={provider.name} m="auto">
          <Button
            variant="outlined"
            onClick={() =>
              signIn(provider.id, {
                callbackUrl: `${router.query.redirect}?cache=${router.query.redisId}`,
              })
            }
          >
            Sign in with {provider.name}
          </Button>
        </Box>
      ))}
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions)

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: "/" } }
  }

  const providers = await getProviders()

  return {
    props: { providers: providers ?? [] },
  }
}
