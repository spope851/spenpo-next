import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next"
import { getProviders, signIn } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]"
import { Box, Button } from "@mui/material"

const SignIn: React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  providers,
  redirect,
}) => (
  <>
    {Object.values(providers).map((provider) => (
      <Box key={provider.name} m="auto">
        <Button
          variant="outlined"
          onClick={() =>
            signIn(provider.id, {
              callbackUrl: redirect,
            })
          }
        >
          Sign in with {provider.name}
        </Button>
      </Box>
    ))}
  </>
)

export default SignIn

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions)

  if (session) {
    return { redirect: { destination: "/" } }
  }

  const providers = await getProviders()

  return {
    props: {
      providers: providers ?? [],
      redirect: `${context.query.redirect}?cache=${context.query.redisId}`,
    },
  }
}
