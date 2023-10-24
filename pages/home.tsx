import React from "react"
import { HomeComponentWrapper } from "@/components/home"
import Head from "next/head"
import ContactForm from "@/components/home/contactForm"
import { pool } from "@/utils/postgres"
import { Button, Grid, Stack, Typography } from "@mui/material"
import redis from "@/utils/redis"
import { LinkPreview } from "@/components/linkPreview"

export async function getServerSideProps() {
  console.log("GET content")
  const cachedContent = await redis.get(`content`)
  if (cachedContent) return { props: { content: JSON.parse(cachedContent) } }
  const data = await pool.query(`SELECT * FROM content ORDER BY id DESC LIMIT 1;`)
  const content = data.rows[0]
  await redis.set("content", JSON.stringify(content))

  return {
    props: { content },
  }
}

const GRID_PROPS = {
  item: true,
  xs: 12,
  display: "flex",
  flexDirection: "column" as "column",
}

const BUTTON_SX = {
  my: "auto",
  py: 2,
  borderRadius: 2,
}

interface Content {
  id: string
  title: string
  img?: string
  href: string
  description: string
  target_blank: boolean
}

export default function Home({ content }: { content: Content }) {
  return (
    <>
      <Head>
        <title>spencer pope</title>
      </Head>
      <Stack flex={1}>
        <Stack m={{ sm: 5, xs: 2 }} flex={1} justifyContent="space-between" gap={5}>
          <Grid container justifyContent="space-between" spacing={5} flex={1}>
            <Grid lg={5} md={6} sm={12} {...GRID_PROPS}>
              <HomeComponentWrapper>
                <Typography variant="h6" fontWeight="bold">
                  check out my latest post
                </Typography>
                <Stack my="auto">
                  <LinkPreview url={content.href} descriptionLength={50} />
                </Stack>
              </HomeComponentWrapper>
            </Grid>
            <Grid container item lg={7} md={6} sm={12} spacing={5} flex={1}>
              <Grid lg={6} md={12} {...GRID_PROPS}>
                <HomeComponentWrapper>
                  <Typography variant="h6" fontWeight="bold">
                    explore my new products
                  </Typography>
                  <Button variant="outlined" href="/products" sx={BUTTON_SX}>
                    click here!
                  </Button>
                </HomeComponentWrapper>
              </Grid>
              <Grid lg={6} md={12} {...GRID_PROPS}>
                <HomeComponentWrapper>
                  <Typography variant="h6" fontWeight="bold">
                    see what else I&apos;m working on
                  </Typography>
                  <Button variant="outlined" href="/projects" sx={BUTTON_SX}>
                    click here!
                  </Button>
                </HomeComponentWrapper>
              </Grid>
              <Grid
                {...GRID_PROPS}
                display={{ lg: "flex", xs: "none" }}
                justifyContent="flex-end"
              >
                <ContactForm />
              </Grid>
            </Grid>
            <Grid
              {...GRID_PROPS}
              display={{ lg: "none", xs: "flex" }}
              justifyContent="flex-end"
            >
              <ContactForm />
            </Grid>
          </Grid>
        </Stack>
      </Stack>
    </>
  )
}
