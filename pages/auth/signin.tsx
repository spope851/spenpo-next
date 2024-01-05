import type { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { getProviders, signIn } from 'next-auth/react'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../api/auth/[...nextauth]'
import { Stack, Button, Typography, Divider } from '@mui/material'
import Image from 'next/image'

const SignIn: React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  providers,
  redirect,
}) => (
  <>
    <Stack gap={1} m="auto" textAlign="center">
      <Typography variant="h5">Welcome</Typography>
      <Divider flexItem />
      {Object.values(providers).map((provider) => (
        <Button
          key={provider.id}
          variant="outlined"
          onClick={() =>
            signIn(provider.id, {
              callbackUrl: redirect,
            })
          }
          sx={{ gap: 1, textTransform: 'capitalize' }}
        >
          <Image
            src={`/images/providers/${provider.name}.png`}
            height={30}
            width={30}
            alt={provider.name}
          />
          <Typography>Continue with {provider.name}</Typography>
        </Button>
      ))}
    </Stack>
  </>
)

export default SignIn

export async function getServerSideProps({
  req,
  res,
  query,
}: GetServerSidePropsContext) {
  const session = await getServerSession(req, res, authOptions)

  if (session) {
    return { redirect: { destination: '/' } }
  }

  const providers = await getProviders()

  return {
    props: {
      providers: providers ?? [],
      redirect: `${query.redirect}?cache=${query.redisId}`,
    },
  }
}
