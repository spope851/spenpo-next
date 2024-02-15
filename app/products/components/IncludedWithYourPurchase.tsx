'use client'
import React, { useContext } from 'react'
import { Divider, Stack, Typography } from '@mui/material'
import { ShoppingCartContext } from '../../context/shoppingCart'
import CheckIcon from '@mui/icons-material/Check'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const Check = () => <CheckIcon color="success" />

export const IncludedWithYourPurchase: React.FC = () => {
  const { paymentIntentMetadata } = useContext(ShoppingCartContext)
  const pathname = usePathname()

  let price = paymentIntentMetadata.price || 0

  const isLandingCheckout = pathname === '/products/landing-page/checkout'
  if (isLandingCheckout) price += 99

  return (
    <>
      <Typography variant="h5">Included with your purchase</Typography>
      <Stack rowGap={1}>
        <Stack direction="row" justifyContent="space-between">
          <Check />
          <Typography variant="subtitle2">Support via email</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Check />
          <Typography variant="subtitle2">Ad-free experience</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Check />
          <Typography variant="subtitle2">14-day money back guarantee</Typography>
        </Stack>
        <Divider flexItem />
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="subtitle2">Domain</Typography>
          <Typography variant="subtitle2">
            $
            {paymentIntentMetadata.price
              ? (paymentIntentMetadata.price / 100).toFixed(2)
              : '0.00'}
          </Typography>
        </Stack>
        <Divider flexItem />
        {isLandingCheckout && (
          <>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="subtitle2">Website</Typography>
              <Typography variant="subtitle2">$0.99</Typography>
            </Stack>
            <Divider flexItem />
          </>
        )}
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="subtitle2">Subtotal</Typography>
          <Typography variant="subtitle2">${(price / 100).toFixed(2)}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="subtitle2">Tax</Typography>
          <Typography variant="subtitle2">$0.00</Typography>
        </Stack>
        <Divider flexItem />
        <Stack direction="row" justifyContent="space-between">
          <Typography>Total</Typography>
          <Typography>${(price / 100).toFixed(2)}</Typography>
        </Stack>
      </Stack>
      <Typography variant="h5">Payment method</Typography>
      <Stack gap={1}>
        <Typography variant="h6">By checking out:</Typography>
        <Typography variant="subtitle2" maxWidth={{ xs: 'unset', md: 300 }}>
          You understand that there are currently no legal{' '}
          <Link href="tos">Terms of service</Link> for this version of the product,
          and that refunds will be issued upon request{' '}
          <Link href="/contact">via email</Link> within the 14-day guarantee period.
        </Typography>
      </Stack>
    </>
  )
}
