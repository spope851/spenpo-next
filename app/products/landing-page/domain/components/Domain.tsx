import { getDomainPrice, getDomainStatus } from '@/services/vercel'
import { Box, Typography } from '@mui/material'
import { AvailableDomain } from './AvailableDomain'

export default async function Domain({ domainName }: { domainName: string }) {
  const statusRes = await getDomainStatus(domainName)
  const status = await statusRes.json()

  if (status?.available === undefined)
    return (
      <Box border="solid red" borderRadius={1} textAlign="center" p={1} color="red">
        <Typography>error</Typography>
      </Box>
    )

  const Unavailable = (
    <Box
      border="solid"
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
    const priceRes = await getDomainPrice(domainName)
    const price = await priceRes.json()

    if (!!price?.price)
      return <AvailableDomain domainName={domainName} price={price.price} />
    return Unavailable
  }
  return Unavailable
}
