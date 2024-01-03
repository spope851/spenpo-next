import { ShoppingCartContext } from '@/context/shoppingCart'
import { Stepper, Step, StepButton } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'

export const STEP_SX = {
  '& .MuiStepLabel-label': {
    whiteSpace: 'noWrap',
    overflow: 'hidden',
  },
}

export const LandingStepper: React.FC<{
  activeStep: number
}> = ({ activeStep }) => {
  const router = useRouter()
  const { projectName, passwordSet } = useContext(ShoppingCartContext)

  useEffect(() => {
    if (activeStep > 1 && !projectName[0]) router.replace('design')
    else if (activeStep > 2 && !passwordSet) router.replace('password')
  }, [activeStep]) //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Stepper nonLinear activeStep={activeStep} sx={{ flex: 1, ...STEP_SX }}>
      <Step completed={true}>
        <StepButton onClick={() => router.replace('design')}>Design it</StepButton>
      </Step>
      <Step completed={!!projectName[0]}>
        <StepButton onClick={() => router.replace('domain')}>Name it</StepButton>
      </Step>
      <Step completed={passwordSet}>
        <StepButton onClick={() => router.replace('password')}>Secure it</StepButton>
      </Step>
      <Step>
        <StepButton onClick={() => router.replace('checkout')}>Claim it</StepButton>
      </Step>
    </Stepper>
  )
}
