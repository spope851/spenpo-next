'use client'

import { Stack, Pagination, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'

type PaginationControlsProps = {
  totalPages: number
  currentPage: number
  totalPosts: number
  displayedPosts: number
}

export const PaginationControls: React.FC<PaginationControlsProps> = ({
  totalPages,
  currentPage,
  totalPosts,
  displayedPosts,
}) => {
  const router = useRouter()

  return (
    <Stack spacing={2} alignItems="center">
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(_, value) => {
          router.push(`?page=${value}`)
        }}
      />
      <Typography textAlign="right">
        {`displaying ${displayedPosts} post${
          displayedPosts > 1 ? 's' : ''
        } of ${totalPosts}`}
      </Typography>
    </Stack>
  )
}
