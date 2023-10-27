import { Step, StepButton, Stepper } from "@mui/material"
import React from "react"
import { STEP_SX } from "./stepper"

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
    current && current.scrollIntoView({ behavior: "smooth", block: "start" })

  return (
    <Stepper
      nonLinear
      activeStep={activeStep}
      sx={{
        position: "fixed",
        top: { xs: `calc(${stepperTop}-24px)`, sm: stepperTop },
        left: 0,
        width: "100%",
        bgcolor: "#fff",
        py: 5,
        zIndex: 999,
        borderBottom: "solid 1px #ccc",
        ...STEP_SX,
      }}
    >
      <Step sx={{ ml: { xs: 2, sm: 5 } }}>
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
      <Step sx={{ mr: { xs: 2, sm: 5 } }}>
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
