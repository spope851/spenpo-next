import 'animate.css'
import '../../../svelte-apps/dist/lang-flash-bundle.css'
import '../../../svelte-apps/dist/two-truths-bundle.css'

import { RobotError } from '@/app/components/robotError'
import { Stack, Typography } from '@mui/material'
import { Projects as ProjectsType } from '@/app/types/routing'
import projects from '../components'
import { ReactNode } from 'react'
import { MetadataProps, PageProps } from '@/app/types/app'
import { Tabs } from '../components/Tabs'
import { Metadata } from 'next'
import { METADATA } from '@/app/constants/projects'

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const title = params.id as ProjectsType
  const description = METADATA[title].description
  const images = [METADATA[title].image || '/images/headshot.jpeg']

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: process.env.VERCEL_URL,
      siteName: 'spenpo.com',
      locale: 'en_US',
      type: 'website',
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@s_pop3',
      images,
    },
  }
}

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

export default function Projects({ params }: PageProps) {
  const project = params.id as ProjectsType

  return (
    <Stack m={2} flex={1}>
      <Tabs project={project} />
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
