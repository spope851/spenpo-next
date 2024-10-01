import { Chip, Link, Tooltip } from '@mui/material'
import React from 'react'
import { WORDPRESS_ROOT } from '@/app/constants/blog'

export type Maybe<T> = T | null

export const Tag: React.FC<{
  id?: number
}> = async ({ id }) => {
  const tag = await fetch(`${WORDPRESS_ROOT}/tags/${id}`).then((res) => res.json())

  const { name, count } = tag
  return (
    <Tooltip title={count} placement="top" key={id}>
      <Chip
        color="primary"
        label={name}
        component={Link}
        href={`/blog/tag/${id}`}
        clickable
        size="small"
        sx={{
          m: '1px',
        }}
      />
    </Tooltip>
  )
}
