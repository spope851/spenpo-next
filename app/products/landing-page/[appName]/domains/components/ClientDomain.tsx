'use client'
import React, { useState } from 'react'
// import LoadingButton from '@mui/lab/LoadingButton'
import { Refresh } from './Refresh'
import {
  Button,
  FormControl,
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

export const ClientDomain: React.FC<{
  refresh: () => Promise<void>
  name: string
  domains: string[]
  redirect: string | null
  redirectStatusCode: number | null
}> = ({ refresh, name, domains, redirect, redirectStatusCode }) => {
  const [edit, setEdit] = useState(false)
  const [newDomain, setNewDomain] = useState(name)
  const [newRedirect, setNewRedirect] = useState(redirect)
  const [newRedirectStatus, setNewRedirectStatus] = useState(redirectStatusCode)
  return (
    <Stack direction="row" gap={3} justifyContent="space-between">
      {edit ? (
        <Stack gap={2} flex={1}>
          <TextField
            fullWidth
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
                if (val === 'No Redirect') setNewRedirect(null)
                else {
                  setNewRedirect(val)
                  if (!newRedirectStatus) setNewRedirectStatus(308)
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
          {redirect ||
            (newRedirect && (
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
            ))}
        </Stack>
      ) : (
        <Link
          href={`https://${name}`}
          target="_blank"
          referrerPolicy="no-referrer"
          style={{ color: '#555', display: 'flex', alignItems: 'flex-end' }}
        >
          <Typography variant="h5">{name}</Typography>
          <OpenInNewIcon />
        </Link>
      )}
      <Stack direction="row" gap={3} alignItems="flex-start">
        {edit ? (
          <>
            <Button onClick={() => setEdit(true)} variant="outlined">
              Save
            </Button>
            <Button
              onClick={() => {
                setEdit(false)
                setNewDomain(name)
                setNewRedirect(redirect)
                setNewRedirectStatus(redirectStatusCode)
              }}
              variant="outlined"
            >
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button onClick={() => setEdit(true)} variant="outlined">
              Edit
            </Button>
            <Refresh refresh={refresh} />
          </>
        )}
      </Stack>
    </Stack>
  )
}
