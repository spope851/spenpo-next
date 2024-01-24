import React from 'react'
import { Box, Stack, Typography } from '@mui/material'
import { InferGetServerSidePropsType } from 'next'
import { getProjectVersion } from '@/services/github'

const Password: React.FC<InferGetServerSidePropsType<typeof getProjectVersion>> = ({
  version,
}) => {
  return (
    <Stack m={{ xs: 2, sm: 5 }} justifyContent="space-between" flex={1}>
      <Stack rowGap={3} m={{ xs: 2, sm: 5 }}>
        <Typography variant="h2">Terms of service</Typography>
        <Typography textAlign="right" fontStyle="italic">
          Last updated: January 2, 2024
        </Typography>
        <Box component="ul">
          <Typography component="li" />
        </Box>
      </Stack>
      <Typography variant="subtitle2" textAlign="center">
        verion: {version}
      </Typography>
    </Stack>
  )
}

export default Password

export async function getServerSideProps() {
  const latestVersionRes = await getProjectVersion('landing-template')
  const packagejson = latestVersionRes.data as unknown as { content: string }
  const base64ToString = Buffer.from(packagejson.content, 'base64').toString()
  const version = JSON.parse(base64ToString).version

  return {
    props: {
      version,
    },
  }
}
