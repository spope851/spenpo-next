'use client'

import { Button } from '@mui/material'
import { useRouter } from 'next/navigation'

export const ViewYourSitesBtn: React.FC = () => {
  const router = useRouter()
  return (
    <Button
      onClick={() => router.push(`/products/landing-page/my-sites`)}
      variant="contained"
      sx={{ mx: 'auto' }}
    >
      View your sites
    </Button>
  )
}
