import React from "react"
import Head from "next/head"
import ContactForm from "@/components/contactForm"
import { Box, styled, Typography } from "@mui/material"

const Header = styled(Typography)`
  text-align: center;
  margin: 10px;
`

export default function Home() {
  return (
    <>
      <Head>
        <title>spencer pope</title>
      </Head>
      <Box mx={{ lg: "20%", md: "10%", xs: 2 }} pt={5}>
        <Header variant="h6">I want to hear from you!</Header>
        <Header variant="h6">did you read my blog?</Header>
        <Header variant="h6">like one of my projects?</Header>
        <Header variant="h6">interested in working together?</Header>
        <Box mb={{ xs: 5 }}>
          <ContactForm />
        </Box>
      </Box>
    </>
  )
}
