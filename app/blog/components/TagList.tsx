import React from 'react'
import { Tag } from './Tag'

export type Maybe<T> = T | null

export const TagList: React.FC<{
  tags?: number[]
}> = ({ tags }) => {
  return (
    <div style={{ margin: 0 }}>
      {tags?.map((id) => (
        <Tag id={id} key={id} />
      ))}
    </div>
  )
}
