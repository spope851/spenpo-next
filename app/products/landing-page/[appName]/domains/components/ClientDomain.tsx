'use client'
import React, { useState } from 'react'
import { Refresh } from './Refresh'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import Slide from '@mui/material/Slide'
import { TransitionProps } from '@mui/material/transitions'
import LoadingButton from '@mui/lab/LoadingButton'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any> // eslint-disable-line @typescript-eslint/no-explicit-any
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

export const ClientDomain: React.FC<{
  refresh: () => Promise<void>
  revalidate: () => Promise<void>
  name: string
  domains: string[]
  redirect: string | null
  redirectStatusCode: number | null
}> = ({ refresh, revalidate, name, domains, redirect, redirectStatusCode }) => {
  const params = useParams()
  const project = String(params?.appName)
  const [edit, setEdit] = useState(false)
  const [newDomain, setNewDomain] = useState(name)
  const [newRedirect, setNewRedirect] = useState(redirect)
  const [newRedirectStatus, setNewRedirectStatus] = useState(redirectStatusCode)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  return (
    <Stack
      direction={{ sm: 'row', xs: 'column' }}
      rowGap={2}
      columnGap={3}
      justifyContent="space-between"
    >
      {edit ? (
        <Stack gap={2} flex={1}>
          <TextField
            fullWidth
            disabled={!name.endsWith('.vercel.app')}
            label="Domain"
            size="small"
            value={newDomain}
            onChange={(e) => setNewDomain(e.target.value)}
          />
          <FormControl>
            <InputLabel>Redirect</InputLabel>
            <Select
              fullWidth
              label="Redirect"
              size="small"
              value={newRedirect ?? 'No Redirect'}
              onChange={(e) => {
                const val = e.target.value
                if (val === 'No Redirect') {
                  setNewRedirect(null)
                  setNewRedirectStatus(null)
                } else {
                  setNewRedirect(val)
                  setNewRedirectStatus(newRedirectStatus ?? 307)
                }
              }}
            >
              {[...domains, 'No Redirect']
                .filter((d) => d !== name)
                .map((domain) => (
                  <MenuItem key={domain} value={domain}>
                    {domain}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          {(redirect || newRedirect) && (
            <FormControl>
              <InputLabel>Status Code</InputLabel>
              <Select
                fullWidth
                label="Status Code"
                size="small"
                value={newRedirectStatus}
                onChange={(e) => setNewRedirectStatus(Number(e.target.value))}
              >
                <ListSubheader>Temporary</ListSubheader>
                <MenuItem value={307}>307 Temporary Redirect</MenuItem>
                <MenuItem value={302}>302 Found</MenuItem>
                <ListSubheader>Permanent</ListSubheader>
                <MenuItem value={308}>308 Permanent Redirect</MenuItem>
                <MenuItem value={301}>301 Moved Permanently</MenuItem>
              </Select>
            </FormControl>
          )}
          {error && <FormHelperText error>{error}</FormHelperText>}
        </Stack>
      ) : (
        <Box
          display="flex"
          flexDirection={{ md: 'row', xs: 'row', sm: 'column' }}
          columnGap={3}
          rowGap={1}
          alignItems="baseline"
        >
          <Link
            href={`https://${name}`}
            target="_blank"
            referrerPolicy="no-referrer"
            style={{
              color: '#555',
              display: 'flex',
              alignItems: 'flex-end',
            }}
          >
            <Typography variant="h5" flex={{ xs: 1, sm: 0, md: 1 }}>
              {name}
            </Typography>
            <OpenInNewIcon sx={{ mr: 'auto' }} />
          </Link>
          {redirect && (
            <Typography>
              Redirects to <strong>{redirect}</strong>
            </Typography>
          )}
        </Box>
      )}
      <Stack
        direction="row"
        gap={3}
        alignItems="flex-start"
        justifyContent="flex-end"
      >
        {edit ? (
          <Stack direction="row" gap={3}>
            <LoadingButton
              loading={loading}
              onClick={async () => {
                setLoading(true)
                const req = await fetch('/api/domains/update', {
                  method: 'post',
                  body: JSON.stringify({
                    name,
                    project,
                    newDomain,
                    newRedirect: newRedirect === redirect ? null : newRedirect,
                    newRedirectStatus:
                      newRedirectStatus === redirectStatusCode
                        ? null
                        : newRedirectStatus,
                  }),
                })
                const res = await req.json()
                if (res.status === 200) {
                  await revalidate()
                  setEdit(false)
                  setError('')
                } else setError(res.error.message)
                setLoading(false)
              }}
              variant="outlined"
            >
              Save
            </LoadingButton>
            <Button
              onClick={() => {
                setEdit(false)
                setNewDomain(name)
                setNewRedirect(redirect)
                setNewRedirectStatus(redirectStatusCode)
                setError('')
              }}
              variant="outlined"
            >
              Cancel
            </Button>
          </Stack>
        ) : (
          <>
            <Stack direction="row" gap={3}>
              <Button onClick={() => setEdit(true)} variant="outlined">
                Edit
              </Button>
              <Refresh refresh={refresh} />
              <Button
                variant="outlined"
                color="error"
                onClick={async () => setDialogOpen(true)}
              >
                Remove
              </Button>
            </Stack>
            <Dialog
              open={dialogOpen}
              TransitionComponent={Transition}
              keepMounted
              onClose={() => setDialogOpen(false)}
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle>{'Remove Domain from Project'}</DialogTitle>
              <DialogContent
                sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}
              >
                <DialogContentText id="alert-dialog-slide-description">
                  Would you like to remove the domain <strong>{name}</strong> from
                  your app <strong>{project}</strong>?
                </DialogContentText>
                <DialogContentText id="alert-dialog-slide-description">
                  After continuing, your app will no longer be accessible through
                  this domain.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  variant="contained"
                  color="error"
                  onClick={async () => {
                    await fetch('/api/domains/remove', {
                      method: 'delete',
                      body: JSON.stringify({ project, name }),
                    })
                    await revalidate()
                    setDialogOpen(false)
                  }}
                >
                  Remove
                </Button>
                <Button variant="outlined" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
          </>
        )}
      </Stack>
    </Stack>
  )
}
