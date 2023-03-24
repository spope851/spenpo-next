import React, { useState } from "react"
import { TwitterFeed } from "@/components/twitter-feed"
import { Content, WhatsNew } from "@/components/whats-new"
import Head from "next/head"
import { useRouter } from "next/router"
import ContactForm from "@/components/contactForm"
import { pool } from "@/utils/postgres"
import { styled } from "@mui/material/styles"
import { Box } from "@mui/material"

export async function getStaticProps() {
  const data = await pool.query(`SELECT * FROM content ORDER BY id DESC LIMIT 1;`)
  const content = data.rows[0]

  return {
    props: { content },
  }
}

const StyledBox = styled(Box)(() => ({
  ":hover": {
    cursor: "pointer",
    backgroundColor: "#ddd",
  },
}))

export default function Home({ content }: { content: Content }) {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>spencer pope</title>
      </Head>
      <div id="page-content">
        <div id="left-content-wrapper">
          <div id="top-left-wrapper">
            <div id="whats-new-wrapper">
              <h4>check out my latest post</h4>
              <div id="whats-new">
                <WhatsNew content={content} />
              </div>
            </div>
            <div id="projects-link-wrapper">
              <h4>see what else I&apos;m working on</h4>
              <StyledBox
                id="projects-link-btn"
                onClick={() => router.push("/projects")}
              >
                click here!
              </StyledBox>
            </div>
          </div>
          <div id="contact-form-wrapper">
            <ContactForm />
          </div>
        </div>
        <div id="twitter-feed-wrapper">
          <TwitterFeed />
        </div>
      </div>
    </>
  )
}
