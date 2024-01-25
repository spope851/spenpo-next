'use client'
import { Tabs as MuiTabs, Tab } from '@mui/material'
import { usePathname, useRouter } from 'next/navigation'

export const Tabs: React.FC = () => {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <MuiTabs
      value={pathname?.endsWith('my-sites') ? 1 : 0}
      onChange={() =>
        router.push(
          `/products/landing-page${
            pathname?.endsWith('my-sites') ? '' : '/my-sites'
          }`
        )
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
