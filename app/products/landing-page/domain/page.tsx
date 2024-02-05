import React, { Suspense } from 'react'
import { Box, Grid, Stack, Typography } from '@mui/material'
import { LIMIT_INCREMENT, TLDS } from './constants'
import { DomainField } from './components/DomainField'
import { LoadMoreBtn } from './components/LoadMoreBtn'
import Domain from './components/Domain'
import { ContinueBtn } from './components/ContinueBtn'
import { Stepper } from '../components/Stepper'
import redis from '../../../utils/redis'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../../pages/api/auth/[...nextauth]'
import { redirect } from 'next/navigation'
import { PageProps } from '../../../types/app'

export default async function DomainStep({ searchParams }: PageProps) {
  const session = await getServerSession(authOptions)
  const q = searchParams.q ? String(searchParams.q) : ''
  const d = searchParams.d ? String(searchParams.d) : ''
  const limit = Number(searchParams.limit) || LIMIT_INCREMENT
  const domainNames: string[] = []

  const arr = q.split('.')
  const NAME = arr[0]
  const TLD = arr[1]

  let count = 0
  for (const key of TLDS.keys()) {
    if (count < limit) {
      if (/^[a-z]+$/.test(key)) {
        // if Q specifies TLD
        if (!!TLD) {
          if (key.startsWith(TLD)) domainNames.push(`${NAME}.${key}`)
        } else domainNames.push(`${NAME}.${key}`)
      }
      count = domainNames.length
    } else break
  }

  const cache = await redis.hgetall(session.user.id)

  if (cache.HEADSHOT_FILE) await redis.expire(session.user.id, 300)
  else redirect('/products/landing-page/design')

  let xl = 1
  if (limit < 12) xl = 2

  return (
    <Stack m={{ xs: 2, sm: 5 }} gap={5} flex={1} justifyContent="flex-start">
      <Stack>
        <Stepper activeStep={1} />
      </Stack>
      <Stack
        justifyContent="space-between"
        direction={{ xs: 'column', sm: 'row' }}
        gap={1}
      >
        <Stack gap={1}>
          <Typography variant="h5">
            Choose the URL you want your site published to
          </Typography>
          {!TLD && !d ? (
            <Typography variant="caption" maxWidth="75%">
              <strong>.vercel.app</strong> domains are included even if you purchase
              one additionally. We ensure you get assigned the closest available
              option. You can always reach out to support to have this changed.
            </Typography>
          ) : (
            <Typography variant="caption" maxWidth="75%">
              domains can be purchased for <strong>one year</strong> with optional
              renewal
            </Typography>
          )}
        </Stack>
        <ContinueBtn disabled={!q} />
      </Stack>
      <Stack justifyContent="center" gap={3} alignItems="center">
        <DomainField />
      </Stack>
      <Grid container spacing={1}>
        {q &&
          q.length > 2 &&
          domainNames.map((domainName) => (
            <Grid item xs={6} sm={4} md={2} xl={xl} key={domainName}>
              <Suspense
                fallback={
                  <Box
                    border="solid lightgray"
                    borderRadius={1}
                    textAlign="center"
                    p={1}
                    sx={{ color: 'lightgray' }}
                  >
                    <Typography>{domainName}</Typography>
                  </Box>
                }
              >
                <Domain domainName={domainName} />
              </Suspense>
            </Grid>
          ))}
      </Grid>
      {q && <LoadMoreBtn disabled={limit > domainNames.length} />}
    </Stack>
  )
}
