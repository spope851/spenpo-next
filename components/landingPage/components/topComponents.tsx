import { Stack, Button, Tooltip, Box, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { LandingPageContext } from '@/context/landingPage'
import { useSession } from 'next-auth/react'
import { useCachedSignin } from '@/hooks/useCachedSignin'

export const TopComponents: React.FC = () => {
  const router = useRouter()
  const session = useSession()
  const { routeToSignin } = useCachedSignin()
  const { editable } = useContext(LandingPageContext)

  const tooltipTitle = (HEADSHOT_SRC?: string) => {
    if (session.status === 'unauthenticated')
      return (
        <Stack direction="row" columnGap={1}>
          <Typography>please</Typography>
          <Typography
            onClick={() => routeToSignin()}
            sx={{
              ':hover': {
                cursor: 'pointer',
              },
              color: '#0000ee',
              textDecoration: 'underline',
            }}
          >
            sign in
          </Typography>
          <Typography>before checking out</Typography>
        </Stack>
      )
    else if (!HEADSHOT_SRC) return 'Please upload your headshot before checking out'
    return ''
  }

  return (
    <Stack
      flexDirection={{ sm: 'row' }}
      justifyContent="space-between"
      width="100%"
      rowGap={3}
    >
      <Button
        startIcon={<ChevronLeftIcon />}
        variant="contained"
        onClick={() => router.push('/products/landing-page')}
        sx={{
          ml: { md: 5, sm: 5, xs: 'auto' },
          mt: editable?.[0] ? { md: 0, sm: 15, xs: 3 } : { md: 0, sm: 5, xs: 3 },
          mr: { xs: 'auto' },
        }}
      >
        back to products
      </Button>
      <LandingPageContext.Consumer>
        {({ HEADSHOT_SRC }) => {
          return (
            <Tooltip title={tooltipTitle(HEADSHOT_SRC)}>
              <Box
                component="span"
                sx={{
                  mr: { md: 5, sm: 5, xs: 'auto' },
                  mt: editable?.[0] ? { md: 0, sm: 15 } : { md: 0, sm: 5 },
                  ml: { xs: 'auto' },
                }}
              >
                <Button
                  variant="contained"
                  onClick={() => router.push('domain')}
                  endIcon={<ChevronRightIcon />}
                  disabled={!HEADSHOT_SRC || session.status !== 'authenticated'}
                >
                  add to cart
                </Button>
              </Box>
            </Tooltip>
          )
        }}
      </LandingPageContext.Consumer>
    </Stack>
  )
}
