import React, { useEffect, useState } from 'react'
import { Box, Button, CircularProgress, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { getServerSession } from 'next-auth'
import { SiteCard } from '@/components/siteCard'
import prisma from '@/utils/prisma'
import Stripe from 'stripe'
import { ProjectEnvVariableInput } from '@/context/shoppingCart'
import Link from 'next/link'

type ConfirmPageOrder = {
  metadata: {
    projectName: { vercelApp: string }
    environmentVariables: ProjectEnvVariableInput[]
  }
}

const Confirm: React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  order: ssrOrder,
  s3,
}) => {
  const router = useRouter()
  type ComponentOrder = typeof ssrOrder & ConfirmPageOrder

  const getOrder = async (): Promise<{ order: ComponentOrder }> => {
    const refetchOrder = await fetch(`/api/getOrder?orderId=${order.id}`)
    return refetchOrder.json()
  }

  const [order, setOrder] = useState(ssrOrder as unknown as ComponentOrder)

  useEffect(() => {
    if (!order.error && !order.complete) {
      ;(async () => {
        const refetchOrder = await getOrder()
        console.log(refetchOrder.order)

        setOrder(refetchOrder.order)
      })()
    }
  }, [order]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    router.replace(
      { pathname: router.pathname, query: { ...router.query } },
      router.pathname,
      {
        shallow: true,
      }
    )
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (!order.error && !order.complete)
    return (
      <Stack m="auto">
        <CircularProgress />
      </Stack>
    )

  return (
    <Stack rowGap={3} m="auto">
      {order.error ? (
        <Typography color="red" maxWidth={300}>
          Something went wrong. Please <Link href="/contact">contact support</Link>{' '}
          with your order number: #{order.id}
        </Typography>
      ) : (
        <>
          <Typography variant="h2" textAlign="center">
            Congratulations
          </Typography>
          <Typography variant="h5" textAlign="center">
            Your website is being deployed and will be available shortly
          </Typography>
          <Box mx="auto">
            <SiteCard
              name={order.metadata.projectName.vercelApp}
              fallback={`${s3}/${order.id}.${
                order.metadata.environmentVariables
                  .find((envVar) => envVar.key === 'NEXT_PUBLIC_HEADSHOT')
                  ?.value.split('.')[1]
              }`}
            />
          </Box>
        </>
      )}
      <Button
        onClick={() =>
          router.push(`${router.pathname.split('/confirm')[0]}/my-sites`)
        }
        variant="contained"
        sx={{ mx: 'auto' }}
      >
        View your sites
      </Button>
    </Stack>
  )
}

export default Confirm

const redirect = {
  redirect: {
    permanent: false,
    destination: `/products/landing-page`,
  },
}

export async function getServerSideProps({
  req,
  res,
  query,
}: GetServerSidePropsContext) {
  const session = await getServerSession(req, res, authOptions)
  if (session) {
    // This is your test secret API key.
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
      apiVersion: '2023-08-16',
    })
    if (!stripe) return redirect

    const paymentIntentId = query.payment_intent?.toString()

    if (!paymentIntentId) return redirect

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)
    const orderId = paymentIntent.metadata.orderId

    if (orderId) {
      const order = await prisma.order.findFirst({
        where: { userId: session.user.id, id: orderId },
      })
      if (order) return { props: { order, s3: process.env.AWS_LANDING_S3 } }
      else return redirect
    } else return redirect
  } else return redirect
}
