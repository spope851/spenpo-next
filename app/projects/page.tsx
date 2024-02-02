import { Box, Stack, Typography } from '@mui/material'
import { Projects as ProjectsType } from '@/app/types/routing'
import { ReactNode } from 'react'
import { PageProps } from '@/app/types/app'
import { Tabs } from './components/Tabs'
import Link from 'next/link'

const Header: React.FC<{ children: ReactNode }> = ({ children }) => (
  <Typography variant="h5" textAlign="center" border="solid .5px" height={34}>
    {children}
  </Typography>
)

export default function Projects({ params }: PageProps) {
  const project = params.id as ProjectsType

  return (
    <Stack flex={1}>
      <Stack maxWidth="50em" mx="auto" mb="auto" p={{ xs: 2, sm: 5 }} gap={5}>
        <Typography component="h1">Projects</Typography>
        <Typography variant="body2">
          The table below showcases all the near-completion projects I&apos;ve built
          publicly over the past few years. Some are widgets, others are full
          websites, and all are available in full for your enjoyment and criticism. I
          build these things with accessibility in mind and hope any attempts to
          implement them do not end in vain. Since the source code is available for
          all of these, I welcome collaborative insights, so if you do implement or
          extend any of these projects, please{' '}
          <Link href="mailto:spenpo@spenpo.com">email me</Link>.
        </Typography>
      </Stack>
      <Stack m={2}>
        <Tabs project={project} />
        <Stack direction={{ xs: 'column-reverse', md: 'row' }} border="solid .5px">
          <Stack width={{ xs: '100%', md: '25%' }}>
            <Header>description</Header>
            <Box height={{ xs: 100, md: 150 }} border="solid .5px" />
          </Stack>
          <Stack flex={1} width={{ xs: '100%', md: '75%' }}>
            <Header>demo</Header>
            <Box height={{ xs: 100, md: 150 }} border="solid .5px" />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}
