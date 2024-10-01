'use client'
import React from 'react'
import { Tabs as MuiTabs, Tab, Tooltip } from '@mui/material'
import { Projects as ProjectsType } from '@/app/types/routing'
import { projects } from '.'
import { useRouter } from 'next/navigation'
import { PROJECTS } from '@/app/constants/projects'

export const Tabs: React.FC<{ project: ProjectsType }> = ({ project }) => {
  const router = useRouter()
  const value = Object.keys(projects).indexOf(project)
  return (
    <MuiTabs
      variant="scrollable"
      scrollButtons
      allowScrollButtonsMobile
      value={value > -1 ? value : 0}
      sx={{
        '& .Mui-disabled': {
          display: 'none',
        },
      }}
    >
      {PROJECTS.map((projectName, id) => {
        const component = (
          <Tab
            key={projectName}
            label={projectName}
            onClick={() => router.push(`/projects/${projectName}`)}
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
}
