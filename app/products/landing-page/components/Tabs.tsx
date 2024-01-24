'use client'
import { Tabs as MuiTabs, Tab } from '@mui/material'
import { useRouter } from 'next/navigation'

export const Tabs: React.FC = () => {
  const router = useRouter()
  return (
    <MuiTabs
      value={0}
      onChange={(_, value) =>
        router.push(`/products/landing-page${['', '/my-sites'][value]}`)
      }
      sx={{
        borderBottom: 1,
      }}
    >
      <Tab label="overview" />
      <Tab label="my sites" />
    </MuiTabs>
  )
}
