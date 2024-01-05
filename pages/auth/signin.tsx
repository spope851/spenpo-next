import type { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { getProviders, signIn, LiteralUnion } from 'next-auth/react'
import { BuiltInProviderType } from 'next-auth/providers'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../api/auth/[...nextauth]'
import { Stack, Button, Typography, Divider } from '@mui/material'
import Image from 'next/image'

const PROVIDER_COLORS: Partial<
  Record<LiteralUnion<BuiltInProviderType, string>, string>
> = {
  github: '#4078c0',
  google: '#4285f4',
  facebook: '#1877f2',
}

const SignIn: React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  providers,
  redirect,
}) => (
  <>
    <Stack gap={1} m="auto" textAlign="center">
      <Typography variant="h5">Welcome</Typography>
      <Divider flexItem />
      {Object.values(providers).map(({ id, name }) => (
        <Button
          key={id}
          variant="outlined"
          onClick={() =>
            signIn(id, {
              callbackUrl: redirect,
            })
          }
          sx={{
            gap: 1,
            textTransform: 'none',
            borderColor: PROVIDER_COLORS[id],
            color: PROVIDER_COLORS[id],
          }}
        >
          <Image
            src={`/images/providers/${name}.png`}
            height={30}
            width={30}
            alt={name}
          />
          <Typography>Continue with {name}</Typography>
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
