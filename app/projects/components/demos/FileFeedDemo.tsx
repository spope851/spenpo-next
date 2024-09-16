'use client'
import { LinkImage } from '@/app/components/LinkImage'
import KeyboardArrowUpRounded from '@mui/icons-material/KeyboardArrowUpRounded'
import KeyboardArrowDownRounded from '@mui/icons-material/KeyboardArrowDownRounded'
import { Button, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'

export const FileFeedDemo: React.FC = () => {
  const [backgroundPosition, setBackgroundPosition] = useState<
    'top' | 'center' | 'bottom'
  >('top')

  return (
    <Stack
      direction="row"
      gap={5}
      flex={1}
      alignItems="center"
      justifyContent="center"
      my={2}
    >
      <LinkImage
        href="https://pope.love/pub.php"
        src="/images/file-feed.png"
        sx={{
          width: { xs: 'calc(100vw - 64px)', md: 'calc(75vw - 64px)' },
          maxWidth: 550,
          backgroundPosition,
        }}
      />
      <Stack gap={2} textAlign="center">
        <Button
          variant="outlined"
          disabled={backgroundPosition === 'top'}
          onClick={() => {
            if (backgroundPosition === 'center') setBackgroundPosition('top')
            if (backgroundPosition === 'bottom') setBackgroundPosition('center')
          }}
        >
          <KeyboardArrowUpRounded />
        </Button>
        <Typography id="primary">scroll</Typography>
        <Button
          variant="outlined"
          disabled={backgroundPosition === 'bottom'}
          onClick={() => {
            if (backgroundPosition === 'center') setBackgroundPosition('bottom')
            if (backgroundPosition === 'top') setBackgroundPosition('center')
          }}
        >
          <KeyboardArrowDownRounded />
        </Button>
      </Stack>
    </Stack>
  )
}
