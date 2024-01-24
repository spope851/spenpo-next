import { Stack, Button, Tooltip, Box, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import React, { useContext } from 'react'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { useSession } from 'next-auth/react'
import { useCachedSignin } from '../../../../../hooks/useCachedSignin'
import { ShoppingCartContext } from '../../../../../context/shoppingCart'

export const TopComponents: React.FC<{ editable: boolean }> = ({ editable }) => {
  const router = useRouter()
  const session = useSession()
  const { routeToSignin } = useCachedSignin()
  const { landingCms } = useContext(ShoppingCartContext)

  const HEADSHOT_SRC = landingCms?.headshotSrc.getter()

  const tooltipTitle = (headshot?: string) => {
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
    else if (!headshot) return 'Please upload your headshot before checking out'
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
          mt: editable ? { md: 0, sm: 15, xs: 3 } : { md: 0, sm: 5, xs: 3 },
          mr: { xs: 'auto' },
        }}
      >
        back to products
      </Button>
      <Tooltip title={tooltipTitle(HEADSHOT_SRC)}>
        <Box
          component="span"
          sx={{
            mr: { md: 5, sm: 5, xs: 'auto' },
            mt: editable ? { md: 0, sm: 15 } : { md: 0, sm: 5 },
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
    </Stack>
  )
}
