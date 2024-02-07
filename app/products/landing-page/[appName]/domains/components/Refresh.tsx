'use client'
import React, { useState } from 'react'
import LoadingButton from '@mui/lab/LoadingButton'
import RefreshIcon from '@mui/icons-material/Refresh'

export const Refresh: React.FC<{ refresh: () => Promise<void> }> = ({ refresh }) => {
  const [loading, setLoading] = useState(false)
  return (
    <LoadingButton
      variant="outlined"
      loadingPosition="end"
      loading={loading}
      endIcon={<RefreshIcon />}
      onClick={async () => {
        setLoading(true)
        await refresh()
        setLoading(false)
      }}
    >
      Refresh
    </LoadingButton>
  )
}
