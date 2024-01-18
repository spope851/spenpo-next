import React, { useContext, useEffect, useState } from 'react'
import { Button, Stack, TextField, Typography } from '@mui/material'
import { ShoppingCartContext } from '@/context/shoppingCart'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { formatDomain } from '@/utils/string'
import { useRouter } from 'next/router'
import { LandingStepper } from '@/components/products/landing-page/stepper'

const Domain: React.FC = () => {
  const router = useRouter()
  const { projectName, landingCms } = useContext(ShoppingCartContext)
  const [domainName, setDomainName] = useState(
    formatDomain(landingCms.name.getter() || '')
  )

  useEffect(() => {
    projectName[1](domainName)
  }, [domainName, projectName])

  return (
    <Stack m={{ xs: 2, sm: 5 }} gap={5} flex={1} justifyContent="flex-start">
      <Stack mb="auto">
        <LandingStepper activeStep={1} />
      </Stack>
      <Stack
        justifyContent="space-between"
        direction={{ xs: 'column', sm: 'row' }}
        gap={1}
      >
        <Typography variant="h5">
          Choose the URL you want your site published to
        </Typography>
        <Button
          endIcon={<ChevronRightIcon />}
          variant="contained"
          onClick={() => router.push('password')}
          disabled={!projectName[0]}
          sx={{ ml: 'auto', mb: 'auto' }}
        >
          continue
        </Button>
      </Stack>
      <Stack m="auto" flex={1} justifyContent="center" gap={3} alignItems="center">
        <Stack alignItems="flex-end" direction="row" columnGap={1}>
          <TextField
            label="domain"
            value={projectName[0]}
            type="url"
            onChange={(e) => setDomainName(formatDomain(e.target.value))}
          />
          <Typography>.vercel.app</Typography>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Domain
