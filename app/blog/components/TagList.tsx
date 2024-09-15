import { Chip, Link, Tooltip } from '@mui/material'
import React from 'react'
import { Tag } from '../page'

export type Maybe<T> = T | null

export const TagList: React.FC<{
  tags?: Tag[]
}> = ({ tags }) => {
  return (
    <p style={{ margin: 0 }}>
      {tags?.map(({ ID, slug, name, post_count }) => (
        <Tooltip title={post_count} placement="top" key={ID}>
          <Chip
            color="primary"
            label={name}
            component={Link}
            href={`/blog/tag/${slug}`}
            clickable
            size="small"
            sx={{
              m: '1px',
            }}
          />
        </Tooltip>
      ))}
    </p>
  )
}
