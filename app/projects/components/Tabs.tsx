import React from 'react'
import { Tabs as MuiTabs, Tab, Tooltip } from '@mui/material'
import Link from 'next/link'

export const Tabs: React.FC<{ value: number; tabs: string[] }> = ({
  value,
  tabs,
}) => (
  <MuiTabs
    variant="scrollable"
    scrollButtons
    allowScrollButtonsMobile
    value={value < 0 ? 0 : value}
    sx={{
      '& .Mui-disabled': {
        display: 'none',
      },
    }}
  >
    {tabs.map((projectName, id) => {
      const component = (
        <Tab
          key={projectName}
          label={projectName}
          LinkComponent={Link}
          href={`/projects/${projectName}`}
        />
      )
      return value < 0 && id < 1 ? (
        <Tooltip title="start here" placement="top" arrow key={projectName} open>
          {component}
        </Tooltip>
      ) : (
        component
      )
    })}
  </MuiTabs>
)
