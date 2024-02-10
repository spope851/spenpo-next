'use client'
import React, { useEffect, useState } from 'react'
import LoadingButton from '@mui/lab/LoadingButton'
import RefreshIcon from '@mui/icons-material/Refresh'

export const Refresh: React.FC<{ refresh: () => Promise<void> }> = ({ refresh }) => {
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    if (!loading)
      setTimeout(async () => {
        setLoading(true)
        await refresh()
        setTimeout(() => setLoading(false), 500)
      }, 30000)
  }, [loading]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <LoadingButton
      variant="outlined"
      loadingPosition="end"
      loading={loading}
      endIcon={loading && <RefreshIcon />}
      onClick={async () => {
        setLoading(true)
        await refresh()
        setTimeout(() => setLoading(false), 500)
      }}
    >
      Refresh
    </LoadingButton>
  )
}
