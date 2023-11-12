import { Chip, Link, Tooltip } from "@mui/material"
import React from "react"

export type Maybe<T> = T | null

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type Tag = {
  __typename?: "Tag"
  ID: Scalars["ID"]
  name: Scalars["String"]
  post_count?: Maybe<Scalars["Int"]>
  slug: Scalars["String"]
}

export const TagList: React.FC<{
  tags?: Tag[]
}> = ({ tags }) => {
  return (
    <p>
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
              m: "1px",
            }}
          />
        </Tooltip>
      ))}
    </p>
  )
}
