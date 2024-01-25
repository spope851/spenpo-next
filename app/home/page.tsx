'use client'
import React from 'react'
import { HomeComponentWrapper } from './components/HomeComponentWraper'
import { Grid, Stack, Typography } from '@mui/material'
import { ContactForm } from '../contact/components/contactForm'
import { RightButton } from './components/RightButton'
import { LeftButton } from './components/LeftButton'
import { LinkPreview } from '../components/linkPreview'

const GRID_PROPS = {
  item: true,
  xs: 12,
  display: 'flex',
  flexDirection: 'column' as const,
}

const BUTTON_SX = {
  my: 'auto',
  py: 2,
  borderRadius: 2,
}

export default function Home() {
  return (
    <Stack flex={1}>
      <Stack m={{ sm: 5, xs: 2 }} flex={1} justifyContent="space-between" gap={5}>
        <Grid container justifyContent="space-between" spacing={5} flex={1}>
          <Grid lg={5} md={6} sm={12} {...GRID_PROPS}>
            <HomeComponentWrapper>
              <Typography variant="h6" fontWeight="bold">
                check out my latest post
              </Typography>
              <Stack my="auto">
                <LinkPreview
                  url="https://spenpo.com/products/landing-page"
                  descriptionLength={50}
                />
              </Stack>
            </HomeComponentWrapper>
          </Grid>
          <Grid container item lg={7} md={6} sm={12} spacing={5} flex={1}>
            <Grid lg={6} md={12} {...GRID_PROPS}>
              <LeftButton sx={BUTTON_SX} />
            </Grid>
            <Grid lg={6} md={12} {...GRID_PROPS}>
              <RightButton sx={BUTTON_SX} />
            </Grid>
            <Grid
              {...GRID_PROPS}
              display={{ lg: 'flex', xs: 'none' }}
              justifyContent="flex-end"
            >
              <ContactForm />
            </Grid>
          </Grid>
          <Grid
            {...GRID_PROPS}
            display={{ lg: 'none', xs: 'flex' }}
            justifyContent="flex-end"
          >
            <ContactForm />
          </Grid>
        </Grid>
      </Stack>
    </Stack>
  )
}
