import { useRouter } from 'next/router'
import { RobotError } from '@/components/robotError'
import { Stack, Tabs, Tab, Typography } from '@mui/material'
import { Projects as ProjectsType } from '@/types/routing'
import projects from '@/components/projects'
import { ReactNode } from 'react'

const PROJECTS: ProjectsType[] = [
  'starter-kit-next',
  'cracker',
  'spenpo-landing',
  'two-truths',
  'language-flash',
  '3x3-cube',
  'react-timeclock',
]

const Header: React.FC<{ children: ReactNode }> = ({ children }) => (
  <Typography variant="h5" textAlign="center" border="solid .5px" height={34}>
    {children}
  </Typography>
)

const Body: React.FC<{
  children: ReactNode
  maxWidth: string
}> = ({ children, maxWidth }) => (
  <Stack
    flex={1}
    border="solid .5px"
    maxWidth={{ xs: 'unset', md: maxWidth }}
    maxHeight={{
      xs: 'unset',
      md: 'calc(100vh - 264.5px)',
      xl: 'calc(100vh - 267px)',
    }}
    overflow="scroll"
    sx={{
      boxSizing: 'unset',
      lineHeight: 1,
    }}
    justifyContent="flex-start"
  >
    {children}
  </Stack>
)

export default function Projects() {
  const router = useRouter()
  const project = router.query.id as ProjectsType

  return (
    <Stack m={2} flex={1}>
      <Tabs
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
      </Tabs>
      <Stack
        direction={{ xs: 'column-reverse', md: 'row' }}
        flex={1}
        border="solid .5px"
      >
        <Stack maxWidth={{ xs: '100%', md: '25%' }}>
          <Header>description</Header>
          <Body maxWidth="calc(25vw - 9px)">{projects[project]?.description}</Body>
        </Stack>
        <Stack flex={1} maxWidth={{ xs: '100%', md: '75%' }}>
          <Header>demo</Header>
          <Body maxWidth="calc(75vw)">
            {projects[project]?.demo || (
              <RobotError>this project doesn&apos;t exist yet</RobotError>
            )}
          </Body>
        </Stack>
      </Stack>
    </Stack>
  )
}
