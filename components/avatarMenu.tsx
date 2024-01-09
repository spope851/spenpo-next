import Logout from '@mui/icons-material/Logout'
import {
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  Box,
  Typography,
  Button,
} from '@mui/material'
import React, { useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { useCachedSignin } from '@/hooks/useCachedSignin'
import LanguageIcon from '@mui/icons-material/Language'
import { useRouter } from 'next/router'

const AvatarMenu: React.FC = () => {
  const { routeToSignin } = useCachedSignin()
  const { data: session, status } = useSession()
  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const avatar = <Avatar src={session?.user.image} />

  return (
    <>
      <IconButton
        onClick={handleClick}
        size="small"
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        sx={{ p: 0 }}
      >
        {avatar}
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 7,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box display="flex" p={1} justifyContent="center" alignItems="center">
          {avatar}
          {status === 'authenticated' ? (
            <Typography
              sx={{
                ml: 1,
                minWidth: 150,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              Signed in as {session.user.email}
            </Typography>
          ) : (
            <Button
              sx={{ ml: 1 }}
              variant="outlined"
              onClick={() => routeToSignin()}
            >
              Sign in
            </Button>
          )}
        </Box>
        {status === 'authenticated' && [
          <Divider key={0} />,
          <MenuItem
            key={1}
            onClick={() => router.push('/products/landing-page/my-sites')}
          >
            <ListItemIcon>
              <LanguageIcon fontSize="small" />
            </ListItemIcon>
            My Sites
          </MenuItem>,
          <MenuItem
            key={2}
            onClick={() =>
              signOut({
                redirect: false,
              })
            }
          >
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>,
        ]}
      </Menu>
    </>
  )
}

export default AvatarMenu
