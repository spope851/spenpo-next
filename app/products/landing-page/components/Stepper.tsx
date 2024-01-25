'use client'
import { ShoppingCartContext } from '@/app/context/shoppingCart'
import { Stepper as MuiStepper, Step, StepButton } from '@mui/material'
import { useRouter } from 'next/navigation'
import React, { useContext } from 'react'

export const STEP_SX = {
  '& .MuiStepLabel-label': {
    whiteSpace: 'noWrap',
    overflow: 'hidden',
  },
}

export const Stepper: React.FC<{
  activeStep: number
}> = ({ activeStep }) => {
  const router = useRouter()
  const { domainName, passwordSet } = useContext(ShoppingCartContext)

  return (
    <MuiStepper
      nonLinear
      activeStep={activeStep}
      sx={{ flex: 1, ...STEP_SX, overflow: 'hidden' }}
    >
      <Step completed={true}>
        <StepButton onClick={() => router.replace('design')}>Design it</StepButton>
      </Step>
      <Step completed={!!domainName[0]}>
        <StepButton onClick={() => router.replace('domain')}>Name it</StepButton>
      </Step>
      <Step completed={passwordSet}>
        <StepButton
          disabled={activeStep < 2}
          onClick={() => router.replace('password')}
        >
          Secure it
        </StepButton>
      </Step>
      <Step>
        <StepButton
          disabled={activeStep < 3}
          onClick={() => router.replace('checkout')}
        >
          Claim it
        </StepButton>
      </Step>
    </MuiStepper>
  )
}
