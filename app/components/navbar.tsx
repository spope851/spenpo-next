import Image from 'next/image'
import {
  AppBar,
  Box,
  Container,
  Drawer,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { Suspense, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { AvatarMenu } from './avatarMenu'
import { type TabProps, Tab } from './Tab'
import { MobileTab } from './MobileTab'

const TABS: TabProps[] = [
  { id: 'about' },
  {
    id: 'work',
    menuItems: ['products', 'projects', 'resume'],
  },
  { id: 'now' },
  { id: 'blog' },
  { id: 'contact' },
]

export const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  return (
    <AppBar position="static" sx={{ bgcolor: '#555' }}>
      <Container
        maxWidth="xl"
        sx={{ p: '0px !important', maxWidth: 'unset !important' }}
      >
        <Toolbar
          disableGutters
          sx={{ display: 'flex', justifyContent: 'space-between', pr: 1 }}
        >
          <Box
            bgcolor={(theme) =>
              pathname === '/home' ? theme.palette.primary.main : ''
            }
            p={2}
            onClick={() => router.push('/home')}
            sx={{
              ':hover': {
                cursor: 'pointer',
              },
            }}
          >
            <Typography
              variant="h6"
              sx={{ textDecoration: 'none' }}
              color="secondary"
              display={{ xs: 'none', sm: 'block' }}
              noWrap
            >
              spencer pope
            </Typography>
            <IconButton
              sx={{
                display: { xs: 'block', sm: 'none' },
                borderRadius: 1,
                p: 0,
                height: 32,
                width: 32,
              }}
            >
              <Image src="/favicon.ico" height={32} width={32} alt="favicon" />
            </IconButton>
          </Box>
          <Stack direction="row" gap={1}>
            {TABS.map((tab) => (
              <Tab key={tab.id} {...tab} />
            ))}
            <IconButton
              sx={{
                color: 'white',
                display: { sm: 'none' },
              }}
              onClick={() => setOpen(true)}
            >
              <MenuIcon />
            </IconButton>
            <Suspense>
              <AvatarMenu />
            </Suspense>
          </Stack>
          <Drawer
            PaperProps={{ sx: { backgroundColor: 'transparent', pt: 8 } }}
            anchor="right"
            open={open}
            onClose={() => setOpen(false)}
          >
            {TABS.map((tab) => (
              <MobileTab key={tab.id} {...tab} />
            ))}
          </Drawer>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
