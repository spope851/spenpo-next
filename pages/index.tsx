import React, { useEffect, useRef, useState } from "react"
import {
  TwitterFeed,
  Content,
  WhatsNew,
  ContactWrapper,
  LeftContentWrapper,
  ProjectsLinkButton,
  ProjectsLinkWrapper,
  TwitterFeedWrapper,
  WhatsNewWrapper,
  WhatsNewComponentWrapper,
} from "@/components/home"
import Head from "next/head"
import { useRouter } from "next/router"
import ContactForm from "@/components/home/contactForm"
import { pool } from "@/utils/postgres"
import { Box, Typography } from "@mui/material"

export async function getStaticProps() {
  const data = await pool.query(`SELECT * FROM content ORDER BY id DESC LIMIT 1;`)
  const content = data.rows[0]

  return {
    props: { content },
  }
}

const PAGE_HEIGHT = "calc(100vh - 136.5px)"

export default function Home({ content }: { content: Content }) {
  const router = useRouter()
  const [pageOverflow, setPageOverflow] = useState(false)
  const [twitterHeight, setTwitterHeight] = useState("unset")
  const leftContent = useRef<HTMLDivElement | null>(null)
  const pageContent = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!leftContent.current) return // wait for the elementRef to be available
    const resizeObserver = new ResizeObserver(() => {
      const scrollHeight = leftContent.current!.scrollHeight
      const clientHeight = leftContent.current!.clientHeight
      const clientWidth = pageContent.current!.offsetWidth
      console.log(scrollHeight, clientHeight, clientWidth)

      if (scrollHeight > clientHeight) {
        setTwitterHeight(clientWidth > 850 ? `${scrollHeight}px` : "unset")
        setPageOverflow(true)
      } else {
        setTwitterHeight(`unset`)
        setPageOverflow(false)
      }
    })
    resizeObserver.observe(leftContent.current)
    return () => resizeObserver.disconnect() // clean up
  }, [])

  return (
    <>
      <Head>
        <title>spencer pope</title>
      </Head>
      <Box
        id="page-content"
        display="flex"
        flex={1}
        maxHeight={PAGE_HEIGHT}
        overflow={pageOverflow ? "auto" : ""}
        ref={pageContent}
      >
        <LeftContentWrapper id="left-content-wrapper" ref={leftContent}>
          <Box display="flex" id="top-left-wrapper">
            <WhatsNewWrapper id="whats-new-wrapper">
              <Typography variant="h6" mb="20px" fontWeight="bold">
                check out my latest post
              </Typography>
              <WhatsNewComponentWrapper id="whats-new">
                <WhatsNew content={content} />
              </WhatsNewComponentWrapper>
            </WhatsNewWrapper>
            <ProjectsLinkWrapper id="projects-link-wrapper">
              <Typography variant="h6" mb="auto" fontWeight="bold">
                see what else I&apos;m working on
              </Typography>
              <ProjectsLinkButton
                id="projects-link-btn"
                onClick={() => router.push("/projects")}
              >
                click here!
              </ProjectsLinkButton>
            </ProjectsLinkWrapper>
          </Box>
          <ContactWrapper id="contact-form-wrapper">
            <ContactForm />
          </ContactWrapper>
        </LeftContentWrapper>
        <TwitterFeedWrapper id="twitter-feed-wrapper">
          <TwitterFeed height={twitterHeight} />
        </TwitterFeedWrapper>
      </Box>
    </>
  )
}
