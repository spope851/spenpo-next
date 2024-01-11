import { BgImage } from '../../../components/bgImage'
import {
  Button,
  Grid,
  Stack,
  SxProps,
  Typography,
  Box,
  Divider,
} from '@mui/material'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import ChevronRight from '@mui/icons-material/ChevronRight'
import { OverviewStepper } from './overviewStepper'
import Link from 'next/link'
import ReactPlayer from 'react-player/lazy'
import { PRODUCTS } from '../../../constants/products'
import { LinkPreview } from '../../../components/linkPreview'

const STEP_COPY = [
  {
    copy: (
      <Typography>
        Use our interactive design tools to customize your page before publishing.
        Our content management system allows you to upload a photo, customize text
        and colors, add links to your social media profiles, and create a call to
        action.
      </Typography>
    ),
    video: 'https://youtu.be/OtmFrBkQVcY',
  },
  {
    copy: (
      <>
        <Typography component="span">
          The product includes a <strong>.vercel.app</strong> domain name such as{' '}
        </Typography>
        <Link
          href="https://landing-template-five.vercel.app"
          target="_blank"
          referrerPolicy="no-referrer"
        >
          landing-template-five.vercel.app
        </Link>
        <Typography component="span">
          . These are assigned based on availability, but if the one you suggest
          isn&apos;t available we will still get you a close match. If you already
          have a domain, please contact us and we&apos;d happy to publish the site
          there as well. Support for purchasing and assigning domains during checkout
          is coming in a later version.
        </Typography>
      </>
    ),
    link: 'https://landing-template-five.vercel.app',
  },
  {
    copy: (
      <Typography>
        Choose a secure password that will allow you to control the content on your
        site. Logging in to the admin dashboard allows you to go back to the drawing
        board and redesign your site anytime you want at no additional cost. Editing
        your site will look identical to the design process you see in step 1, and
        publishing your changes only takes a few minutes.
      </Typography>
    ),
    video: 'https://youtu.be/PalmKQI5hSg',
  },
  {
    copy: (
      <Typography>
        Pay the one-time $0.99 fee via credit or debit card to begin publishing your
        site. Then return to this page and choose the &quot;my sites&quot; tab where
        you can view and manage all the websites you&apos;ve published with us and
        check the progress changes you&apos;ve made.
      </Typography>
    ),
    video: 'https://youtu.be/beD4DUu32mY',
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

const VideoStep: React.FC<{ step: number }> = ({ step }) => (
  <>
    <Grid
      item
      lg={3}
      xs={12}
      display="flex"
      alignItems="flex-start"
      justifyContent="center"
      gap={3}
      flexDirection="column"
    >
      <Typography variant="h4">Step {step + 1}</Typography>
      <Box>{STEP_COPY[step].copy}</Box>
    </Grid>
    <Grid item lg={9} xs={12}>
      <ReactPlayer
        url={STEP_COPY[step].video}
        style={{ margin: 'auto' }}
        height="50vh"
        width="90%"
      />
    </Grid>
  </>
)

const LinkStep: React.FC<{ step: number }> = ({ step }) => {
  const Component = useMemo(() => <LinkPreview url={STEP_COPY[step].link!} />, []) // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <>
      <Grid
        item
        lg={3}
        xs={12}
        display="flex"
        alignItems="flex-start"
        justifyContent="center"
        gap={3}
        flexDirection="column"
      >
        <Typography variant="h4">Step {step + 1}</Typography>
        <Box>{STEP_COPY[step].copy}</Box>
      </Grid>
      <Grid item lg={9} xs={12}>
        <Box m="auto" width="90%" maxWidth={400}>
          {Component}
        </Box>
      </Grid>
    </>
  )
}

const NonVideoStep: React.FC<{ step: number }> = ({ step }) => (
  <>
    <Grid
      item
      lg={3}
      xs={12}
      display="flex"
      alignItems="flex-start"
      justifyContent="center"
      gap={3}
      flexDirection="column"
    >
      <Typography variant="h4">Step {step + 1}</Typography>
    </Grid>
    <Grid item display="flex" lg={9} xs={12} height="50vh">
      <Box width="90%" m="auto">
        {STEP_COPY[step].copy}
      </Box>
    </Grid>
  </>
)

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
        <Stack gap={3}>
          <Stack
            direction={{ sm: 'row', xs: 'column' }}
            justifyContent="space-between"
            gap={3}
          >
            <Typography variant="h4">A custom website that you design</Typography>
            <Button
              onClick={() => router.push(`${router.pathname}/design`)}
              variant="contained"
              sx={{ ml: 'auto', mb: 'auto' }}
              endIcon={<ChevronRight />}
            >
              design
            </Button>
          </Stack>
          <Typography>
            Design and publish a personalized website for showcasing yourself on the
            web in just minutes. This custom website is responsive and easy to use on
            any device. Share it in person or on social media so everyone else can
            discover and connect with you. You remain in control of the site&apos;s
            content and can login to the admin dashboard anytime to update it for
            free. Best of all, it only costs you one payment of $0.99 to publish your
            site with a free domain name.
          </Typography>
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
          {[designRef, nameRef, secureRef, claimRef].map((ref, idx) => {
            let Component = NonVideoStep
            if (STEP_COPY[idx].video) Component = VideoStep
            else if (STEP_COPY[idx].link) Component = LinkStep
            return (
              <Grid
                key={STEP_COPY[idx].video}
                container
                ref={ref}
                pt="104px"
                spacing={3}
              >
                <Component step={idx} />
              </Grid>
            )
          })}
        </Stack>
        <Divider />
        <Stack gap={3}>
          <Stack
            direction={{ sm: 'row', xs: 'column' }}
            justifyContent="space-between"
            gap={3}
          >
            <Typography variant="h4">
              Our goal is to make strong web presence universally achievable
            </Typography>
            <Button
              onClick={() => router.push(`${router.pathname}/design`)}
              variant="contained"
              sx={{ ml: 'auto', mb: 'auto' }}
              endIcon={<ChevronRight />}
            >
              design
            </Button>
          </Stack>
          <Typography>
            You are minutes away from taking a meaningful step for your online
            identity.
          </Typography>
        </Stack>
        <Typography variant="subtitle2" textAlign="center">
          verion: {PRODUCTS.landingPage.version}
        </Typography>
      </Stack>
    </Stack>
  )
}
