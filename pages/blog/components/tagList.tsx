import { Chip, Link, Tooltip } from "@mui/material"
import React from "react"
import { Tag } from "../../../generated/graphql"

export const TagList: React.FC<{
  tags?: Tag[]
}> = ({ tags }) => {
  return (
    <p>
      {tags?.map(({ ID, slug, name, post_count }) => (
        <Tooltip title={post_count} placement="top">
          <Chip
            color="primary"
            label={name}
            component={Link}
            href={`/blog/tag/${slug}`}
            key={ID}
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
