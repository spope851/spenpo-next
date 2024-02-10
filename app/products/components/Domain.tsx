import { getDomainPrice, getDomainStatus } from '@/app/services/vercel'
import { Box, Typography } from '@mui/material'
import { AvailableDomain } from './AvailableDomain'
import { revalidateTag, unstable_cache } from 'next/cache'

const getStatus = async (domain: string) =>
  unstable_cache(
    async (name) => {
      const req = await getDomainStatus(name)
      const res = await req.json()
      return res
    },
    ['domain-product-status'],
    { tags: [domain] }
  )(domain)

const getPrice = async (domain: string) =>
  unstable_cache(
    async (name) => {
      const req = await getDomainPrice(name)
      const res = await req.json()
      return res
    },
    ['domain-product-price'],
    { tags: [domain] }
  )(domain)

export default async function Domain({ domainName }: { domainName: string }) {
  const status = await getStatus(domainName)
  console.log(status)

  if (status?.available === undefined) {
    revalidateTag(domainName)
    return (
      <Box
        sx={{ outline: 'solid red' }}
        borderRadius={1}
        textAlign="center"
        p={1}
        color="red"
      >
        <Typography>{status?.error?.message?.slice(20, 44)}</Typography>
      </Box>
    )
  }

  const Unavailable = (
    <Box
      borderRadius={1}
      textAlign="center"
      p={1}
      sx={{ textDecorationLine: 'line-through' }}
      overflow="scroll"
    >
      <Typography>{domainName}</Typography>
    </Box>
  )

  if (status.available === false) return Unavailable

  if (status.available === true) {
    const price = await getPrice(domainName)

    if (!!price?.price)
      return <AvailableDomain domainName={domainName} price={price.price} />
    return Unavailable
  }
  return Unavailable
}
