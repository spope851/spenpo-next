import { Step, StepButton, Stepper } from "@mui/material"
import React from "react"

export const OverviewStepper: React.FC<{
  activeStep: number
  stepperTop: number
  refs: {
    designRef: React.RefObject<HTMLDivElement>
    nameRef: React.RefObject<HTMLDivElement>
    secureRef: React.RefObject<HTMLDivElement>
    claimRef: React.RefObject<HTMLDivElement>
  }
}> = ({
  activeStep,
  stepperTop,
  refs: { designRef, nameRef, secureRef, claimRef },
}) => {
  const scrollTo = (current: HTMLSpanElement | null) =>
    current && current.scrollIntoView({ behavior: "smooth", block: "center" })

  return (
    <Stepper
      nonLinear
      activeStep={activeStep}
      sx={{
        position: "fixed",
        top: stepperTop,
        left: 0,
        width: "100%",
        bgcolor: "#fff",
        py: 5,
        zIndex: 999,
      }}
    >
      <Step sx={{ ml: 5 }}>
        <StepButton
          onClick={() => {
            scrollTo(designRef.current)
          }}
        >
          Design it
        </StepButton>
      </Step>
      <Step>
        <StepButton
          onClick={() => {
            scrollTo(nameRef.current)
          }}
        >
          Name it
        </StepButton>
      </Step>
      <Step>
        <StepButton
          onClick={() => {
            scrollTo(secureRef.current)
          }}
        >
          Secure it
        </StepButton>
      </Step>
      <Step sx={{ mr: 5 }}>
        <StepButton
          onClick={() => {
            scrollTo(claimRef.current)
          }}
        >
          Claim it
        </StepButton>
      </Step>
    </Stepper>
  )
}
