'use client'
import React from 'react'
import { Tabs as MuiTabs, Tab } from '@mui/material'
import { Projects as ProjectsType } from '@/app/types/routing'
import projects from '.'
import { useRouter } from 'next/navigation'

const PROJECTS: ProjectsType[] = [
  'starter-kit-next',
  'cracker',
  'spenpo-landing',
  'two-truths',
  'language-flash',
  '3x3-cube',
  'react-timeclock',
]

export const Tabs: React.FC<{ project: ProjectsType }> = ({ project }) => {
  const router = useRouter()
  return (
    <MuiTabs
      scrollButtons
      allowScrollButtonsMobile
      variant="scrollable"
      value={Object.keys(projects).indexOf(project || 'spenpo-landing')}
    >
      {PROJECTS.map((projectName) => (
        <Tab
          key={projectName}
          label={projectName}
          onClick={() => router.push(projectName)}
        />
      ))}
    </MuiTabs>
  )
}