import React, { useState } from "react"
import { TwitterFeed } from "@/components/twitter-feed"
import { Content, WhatsNew } from "@/components/whats-new"
import Head from "next/head"
import { useRouter } from "next/router"
import ContactForm from "@/components/contactForm"
import { pool } from "@/utils/postgres"

export async function getStaticProps() {
  const data = await pool.query(`SELECT * FROM content ORDER BY id DESC LIMIT 1;`)
  const content = data.rows[0]

  return {
    props: { content },
  }
}

export default function Home({ content }: { content: Content }) {
  const [btnClass, setBtnClass] = useState<string>()
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
              <div
                id="projects-link-btn"
                className={btnClass}
                onClick={() => router.push("/projects")}
                onMouseOver={() => setBtnClass("tweet-hover")}
                onMouseOut={() => setBtnClass("")}
              >
                click here!
              </div>
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
