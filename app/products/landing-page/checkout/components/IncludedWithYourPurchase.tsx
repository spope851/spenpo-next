'use client'
import React, { useContext } from 'react'
import { Divider, Stack, Typography } from '@mui/material'
import { ShoppingCartContext } from '../../../../context/shoppingCart'
import CheckIcon from '@mui/icons-material/Check'

const Check = () => <CheckIcon color="success" />

export const IncludedWithYourPurchase: React.FC = () => {
  const { paymentIntentMetadata } = useContext(ShoppingCartContext)

  const price = (paymentIntentMetadata.price || 0) + 99

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
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="subtitle2">Website</Typography>
          <Typography variant="subtitle2">$0.99</Typography>
        </Stack>
        <Divider flexItem />
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
    </>
  )
}
