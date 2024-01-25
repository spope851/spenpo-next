'use client'
import Navbar from './navbar'
import Footer from './footer'
import { usePathname } from 'next/navigation'
import { Tabs } from '../types/routing'
import { Box } from '@mui/material'
import React from 'react'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname() || ''

  const active = (pathname.split('/')[1] as Tabs) || 'root'

  const hideLayoutPaths = ['/products/landing-page/design', '/']

  return (
    <Box
      sx={{
        bgcolor: 'background.default',
        color: 'text.primary',
        minHeight: '100vh',
      }}
      display="flex"
      flexDirection="column"
    >
      {!hideLayoutPaths.includes(pathname) && <Navbar active={active} />}
      {children}
      {!hideLayoutPaths.includes(pathname) && <Footer />}
    </Box>
  )
}

export default Layout
