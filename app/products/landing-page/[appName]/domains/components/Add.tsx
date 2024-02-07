'use client'
import React, { useState } from 'react'
import { Button, Stack, TextField } from '@mui/material'
import { useParams, usePathname, useRouter } from 'next/navigation'

export const Add: React.FC = () => {
  const params = useParams()
  const router = useRouter()
  const pathname = usePathname()
  const [entry, setEntry] = useState('')
  const [error, setError] = useState('')

  const project = String(params?.appName)

  return (
    <Stack direction="row" gap={3} alignItems="flex-start">
      <TextField
        size="small"
        fullWidth
        placeholder="yourdomain.name"
        onChange={(e) => setEntry(e.target.value)}
        error={!!error}
        helperText={error}
      />
      <Button
        variant="outlined"
        onClick={async () => {
          const req = await fetch('/api/domains/add', {
            method: 'post',
            body: JSON.stringify({ project, entry }),
          })
          const res = await req.json()
          if (res.error) setError(res.error.message)
        }}
        disabled={!entry}
      >
        Add
      </Button>
      <Button variant="outlined" onClick={() => router.push(`${pathname}/buy`)}>
        Buy
      </Button>
      <Button variant="outlined" sx={{ textWrap: 'nowrap' }}>
        Transfer In
      </Button>
    </Stack>
  )
}
