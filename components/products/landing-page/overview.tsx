import { BgImage } from "@/components/bgImage"
import { Box, Button, Stack, Typography } from "@mui/material"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import React, { useEffect, useRef, useState } from "react"
import ChevronRight from "@mui/icons-material/ChevronRight"
import { OverviewStepper } from "./overviewStepper"

const SEGMENT_STACK_PROPS = { height: "100vh", justifyContent: "center" }
const SEGMENT_TEXT_PROPS = { sx: { mb: "auto", mt: "104px" } }

const SCROLL_PADDING = 100

export const LandingPageOverview: React.FC = () => {
  const router = useRouter()
  const session = useSession()
  const designRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLDivElement>(null)
  const secureRef = useRef<HTMLDivElement>(null)
  const claimRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(-1)
  const [stepperTop, setStepperTop] = useState(35)
  const [contentMt, setContentMt] = useState<string | number>("104px")

  useEffect(() => {
    const handleScroll = () => {
      setStepperTop(window.scrollY > 35 ? 0 : 150)
      setContentMt(window.scrollY > 35 ? 3 : "104px")
      if (
        claimRef.current?.offsetTop &&
        window.scrollY >= claimRef.current.offsetTop - SCROLL_PADDING
      )
        setActiveStep(3)
      else if (
        secureRef.current?.offsetTop &&
        window.scrollY >= secureRef.current.offsetTop - SCROLL_PADDING
      )
        setActiveStep(2)
      else if (
        nameRef.current?.offsetTop &&
        window.scrollY >= nameRef.current.offsetTop - SCROLL_PADDING
      )
        setActiveStep(1)
      else if (
        designRef.current?.offsetTop &&
        window.scrollY >= designRef.current.offsetTop - SCROLL_PADDING
      )
        setActiveStep(0)
      else setActiveStep(-1)
    }
    handleScroll()
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <Box>
      <OverviewStepper
        activeStep={activeStep}
        stepperTop={stepperTop}
        refs={{ designRef, nameRef, secureRef, claimRef }}
      />
      <Stack mt={contentMt} rowGap={5}>
        <BgImage
          src="/images/landing-page-product.png"
          sx={{
            height: { xl: 600, lg: 500, md: 400, sm: 300, xs: 200 },
          }}
        />
        <Button
          href={`${router.pathname}/design`}
          variant="contained"
          sx={{ m: "auto" }}
          endIcon={<ChevronRight />}
        >
          design
        </Button>
        <Stack ref={designRef} {...SEGMENT_STACK_PROPS}>
          <Typography {...SEGMENT_TEXT_PROPS}>design it</Typography>
        </Stack>
        <Stack ref={nameRef} {...SEGMENT_STACK_PROPS}>
          <Typography {...SEGMENT_TEXT_PROPS}>name it</Typography>
        </Stack>
        <Stack ref={secureRef} {...SEGMENT_STACK_PROPS}>
          <Typography {...SEGMENT_TEXT_PROPS}>secure it</Typography>
        </Stack>
        <Stack ref={claimRef} {...SEGMENT_STACK_PROPS}>
          <Typography {...SEGMENT_TEXT_PROPS}>claim it</Typography>
        </Stack>
      </Stack>
    </Box>
  )
}
