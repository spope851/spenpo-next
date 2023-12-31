import { BgImage } from '@/components/bgImage'
import { Button, Grid, Stack, SxProps, Typography } from '@mui/material'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import ChevronRight from '@mui/icons-material/ChevronRight'
import { OverviewStepper } from './overviewStepper'
import Link from 'next/link'
import ReactPlayer from 'react-player/lazy'

const STEP_COPY = [
  {
    copy: (
      <>
        use our interactive design tools to customize your page before you buy it.
        our content management system allows you to upload a photo, customize text
        and colors, add links to your social media profiles, and create a call to
        action.
      </>
    ),
    video: 'https://www.youtube.com/watch?v=ykYL2FPg4bc',
  },
  {
    copy: (
      <>
        the product comes with a .vercel.app domain name such as{' '}
        <Link href="https://spenpo-next.vercel.app">spenpo-next.vercel.app</Link>.
        these are given out first come first served. if the one you want isn&apos;t
        available, we will still get you something close. And if you already have a
        domain please contact us and we&apos;d happy to deploy the site there as
        well. Support for buying and assigning new domains during checkout is coming
        in a later version.
      </>
    ),
    video: 'https://www.youtube.com/watch?v=wEasHdfyUMs',
  },
  {
    copy: (
      <>
        choose a secure username and password that will allow you to control the
        content on your page. logging in with these credentials allows you to go back
        to the drawing board and redesign your site anytime you want at no additional
        cost. editing the content from your site will look identical to the design
        process here, and deploying your changes only takes a few minutes.
      </>
    ),
    video: 'https://www.youtube.com/watch?v=2QWaI75NXYc',
  },
  {
    copy: (
      <>
        pay the one-time 99 cent fee via credit/debit card to begin the deployment
        process for your new site. you will then be redirected to your website
        dashboard where you can view and manage all the sites you&apos;ve purchased
        from us and check the progress of any ongoing deployments.
      </>
    ),
    video: 'https://www.youtube.com/watch?v=lZ2FDm19_XU',
  },
]

const SCROLL_PADDING = 100

const contentStyle = (sm: number, xs: number): SxProps => {
  return {
    mt: {
      sm: `${sm}px`,
      xs: `${xs}px`,
    },
  }
}

const stepperStyle = (sm: number, xs: number): SxProps => {
  return {
    top: {
      sm,
      xs,
    },
  }
}

export const LandingPageOverview: React.FC = () => {
  const router = useRouter()
  const session = useSession()
  const designRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLDivElement>(null)
  const secureRef = useRef<HTMLDivElement>(null)
  const claimRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(-1)
  const [stepperSx, setStepperSx] = useState<SxProps>(stepperStyle(0, 0))
  const [contentSx, setContentSx] = useState<SxProps>(contentStyle(0, 0))

  const baseTop = session.status === 'authenticated' ? 153 : 64
  const scrollCorrection = session.status === 'authenticated' ? 24 : 0

  useEffect(() => {
    const handleScroll = () => {
      const top = window.innerWidth < 650 ? baseTop - scrollCorrection : baseTop
      if (window.scrollY > top) setStepperSx(stepperStyle(0, 0))
      else
        setStepperSx(
          stepperStyle(
            baseTop - window.scrollY,
            baseTop - window.scrollY - scrollCorrection
          )
        )
      setContentSx(
        contentStyle(
          baseTop + 24 - scrollCorrection * 2,
          baseTop + 48 - scrollCorrection * 3
        )
      )
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
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [baseTop, session.status, scrollCorrection])

  return (
    <Stack>
      <OverviewStepper
        activeStep={activeStep}
        sx={stepperSx}
        refs={{ designRef, nameRef, secureRef, claimRef }}
      />
      <Stack sx={contentSx} rowGap={5}>
        <Stack direction="row" justifyContent="space-between" gap={3}>
          <Typography variant="h4">A custom webpage that you design</Typography>
          <Button
            href={`${router.pathname}/design`}
            variant="contained"
            sx={{ ml: 'auto', mb: 'auto' }}
            endIcon={<ChevronRight />}
          >
            design
          </Button>
        </Stack>
        <BgImage
          src="/images/landing-page-product.png"
          sx={{
            height: { xl: 600, lg: 500, md: 400, sm: 300, xs: 200 },
            width: '100vw',
            ml: { xs: -2, sm: -5 },
          }}
        />
        <Stack>
          {[designRef, nameRef, secureRef, claimRef].map((ref, idx) => (
            <Grid
              key={STEP_COPY[idx].video}
              container
              ref={ref}
              pt="104px"
              spacing={3}
            >
              <Grid
                item
                lg={3}
                xs={12}
                display="flex"
                alignItems="flex-start"
                justifyContent="center"
                gap={3}
                direction="column"
              >
                <Typography variant="h4">Step {idx + 1}</Typography>
                <Typography>{STEP_COPY[idx].copy}</Typography>
              </Grid>
              <Grid item lg={9} xs={12}>
                <ReactPlayer
                  url={STEP_COPY[idx].video}
                  style={{ margin: 'auto' }}
                  height="50vh"
                  width="90%"
                />
              </Grid>
            </Grid>
          ))}
        </Stack>
      </Stack>
    </Stack>
  )
}
