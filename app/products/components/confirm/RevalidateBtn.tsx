'use client'

import { Button } from '@mui/material'
import Cached from '@mui/icons-material/Cached'

export const RevalidateBtn: React.FC<{ revalidate: () => Promise<void> }> = ({
  revalidate,
}) => {
  return (
    <Button
      variant="contained"
      sx={{
        display: 'block',
        p: 1,
        width: 40,
        minWidth: 'unset',
        height: 40,
      }}
      onClick={() => revalidate()}
    >
      <Cached />
    </Button>
  )
}
