import React from 'react'
import { ContactForm } from './components/contactForm'
import { Box, Typography } from '@mui/material'

export default function Home() {
  return (
    <Box
      mx={{ lg: '20%', md: '10%', xs: 2 }}
      my={{ xs: 2, sm: 5 }}
      display="flex"
      flexDirection="column"
      flex={1}
      sx={{
        '& .MuiTypography-h5': {
          textAlign: 'center',
          m: 1,
        },
      }}
      gap={5}
    >
      <Typography variant="h5">
        Trouble with one of our products? Interested in working together?
      </Typography>
      <ContactForm sx={{ border: 'none' }} />
    </Box>
  )
}
