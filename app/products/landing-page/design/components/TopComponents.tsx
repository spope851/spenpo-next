import { Stack, Tooltip, Box } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import { useRouter } from 'next/navigation'
import React, { useContext, useState } from 'react'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { useSession } from 'next-auth/react'
import { useCachedSignin } from '../../../../hooks/useCachedSignin'
import { ShoppingCartContext } from '../../../../context/shoppingCart'

export const TopComponents: React.FC<{ editable: boolean }> = ({ editable }) => {
  const router = useRouter()
  const session = useSession()
  const { routeToSignin } = useCachedSignin()
  const { landingCms } = useContext(ShoppingCartContext)
  const [loading, setLoading] = useState(false)
  const [loadingBack, setLoadingBack] = useState(false)

  const HEADSHOT_SRC = landingCms?.headshotSrc.getter()

  return (
    <Stack
      flexDirection={{ sm: 'row' }}
      justifyContent="space-between"
      width="100%"
      rowGap={3}
    >
      <LoadingButton
        loading={loadingBack}
        loadingPosition="start"
        startIcon={<ChevronLeftIcon />}
        variant="contained"
        onClick={() => {
          setLoadingBack(true)
          router.push('/products/landing-page')
        }}
        sx={{
          ml: { md: 5, sm: 5, xs: 'auto' },
          mt: editable ? { md: 0, sm: 15, xs: 3 } : { md: 0, sm: 5, xs: 3 },
          mr: { xs: 'auto' },
        }}
      >
        back to products
      </LoadingButton>
      <Box
        component="span"
        sx={{
          mr: { md: 5, sm: 5, xs: 'auto' },
          mt: editable ? { md: 0, sm: 15 } : { md: 0, sm: 5 },
          ml: { xs: 'auto' },
        }}
      >
        {session.status === 'authenticated' ? (
          <Tooltip
            title={HEADSHOT_SRC ? '' : 'Please upload a photo before checking out'}
          >
            <Box>
              <LoadingButton
                loading={loading}
                loadingPosition="end"
                variant="contained"
                onClick={() => {
                  setLoading(true)
                  router.push('domain')
                }}
                endIcon={<ChevronRightIcon />}
                disabled={!HEADSHOT_SRC}
              >
                add to cart
              </LoadingButton>
            </Box>
          </Tooltip>
        ) : (
          <LoadingButton
            loading={loading}
            loadingPosition="end"
            variant="contained"
            onClick={() => {
              setLoading(true)
              routeToSignin()
            }}
            endIcon={<ChevronRightIcon />}
            disabled={session.status !== 'unauthenticated'}
          >
            add to cart
          </LoadingButton>
        )}
      </Box>
    </Stack>
  )
}
