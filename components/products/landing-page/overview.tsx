import { BgImage } from "@/components/bgImage"
import { Button, Grid, Stack, Typography } from "@mui/material"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import React, { useEffect, useRef, useState } from "react"
import ChevronRight from "@mui/icons-material/ChevronRight"
import { OverviewStepper } from "./overviewStepper"
import Link from "next/link"

const SEGMENT_STACK_PROPS = { justifyContent: "flex-start" }
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

  const baseTop = session.status === "authenticated" ? 150 : 51

  useEffect(() => {
    const handleScroll = () => {
      setStepperTop(window.scrollY > 35 ? 0 : baseTop)
      setContentMt("104px")
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
    <Stack>
      <OverviewStepper
        activeStep={activeStep}
        stepperTop={stepperTop}
        refs={{ designRef, nameRef, secureRef, claimRef }}
      />
      <Stack mt={contentMt} rowGap={5}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h4">A custom webpage that you design</Typography>
          <Button
            href={`${router.pathname}/design`}
            variant="contained"
            sx={{ ml: "auto" }}
            endIcon={<ChevronRight />}
          >
            design
          </Button>
        </Stack>
        <BgImage
          src="/images/landing-page-product.png"
          sx={{
            height: { xl: 600, lg: 500, md: 400, sm: 300, xs: 200 },
          }}
        />
        <Stack gap={10}>
          <Grid container ref={designRef} {...SEGMENT_STACK_PROPS}>
            <Grid item md={3}>
              <Typography {...SEGMENT_TEXT_PROPS}>
                use our interactive design tools to customize your page before you
                buy it. our content management system allows you to upload a photo,
                customize text and colors, add links to your social media profiles,
                and create a call to action.
              </Typography>
            </Grid>
          </Grid>
          <Grid container ref={nameRef} {...SEGMENT_STACK_PROPS}>
            <Grid item md={3}>
              <Typography {...SEGMENT_TEXT_PROPS}>
                the product comes with a .vercel.app domain name such as{" "}
                <Link href="https://spenpo-next.vercel.app">
                  spenpo-next.vercel.app
                </Link>
                . these are given out first come first served. if the one you want
                isn&apos;t available, we will still get you something close. And if
                you already have a domain please contact us and we&apos;d happy to
                deploy the site there as well. Support for buying and assigning new
                domains during checkout is coming in a later version.
              </Typography>
            </Grid>
          </Grid>
          <Grid container ref={secureRef} {...SEGMENT_STACK_PROPS}>
            <Grid item md={3}>
              <Typography {...SEGMENT_TEXT_PROPS}>
                choose a secure username and password that will allow you to control
                the content on your page. logging in with these credentials allows
                you to go back to the drawing board and redesign your site anytime
                you want at no additional cost. editing the content from your site
                will look identical to the design process here, and deploying your
                changes only takes a few minutes.
              </Typography>
            </Grid>
          </Grid>
          <Grid container ref={claimRef} {...SEGMENT_STACK_PROPS}>
            <Grid item md={3}>
              <Typography {...SEGMENT_TEXT_PROPS}>
                pay the one-time 99 cent fee via credit/debit card to begin the
                deployment process for your new site. you will then be redirected to
                your website dashboard where you can view and manage all the sites
                you&apos;ve purchased from us and check the progress of any ongoing
                deployments.
              </Typography>
            </Grid>
          </Grid>
        </Stack>
      </Stack>
    </Stack>
  )
}
