import { useRouter } from "next/router"
import React, { useRef, useState } from "react"
import { TwitterFeed } from "@/components/twitter-feed"
import { WhatsNew } from "@/components/whats-new"
import emailjs from "@emailjs/browser"
import validator from "validator"
import { Typography } from "@mui/material"
import Head from "next/head"

export default function Home() {
  const [btnClass, setBtnClass] = useState<string>()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [failure, setFailure] = useState(false)
  const [name, setName] = useState(false)
  const [email, setEmail] = useState(false)
  const [emailString, setEmailString] = useState("")
  const [emailError, setEmailError] = useState(false)
  const [text, setText] = useState(false)
  const router = useRouter()
  const formRef = useRef<HTMLFormElement | null>(null)

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (!validator.isEmail(emailString)) {
      setEmailError(true)
      setLoading(false)
    } else {
      emailjs
        .sendForm(
          "service_q5mctvg",
          "template_ebpu5h9",
          formRef.current || "",
          "owxwQWa3Ry2FxkhKz"
        )
        .then(
          (result) => {
            console.log(result.text)
            setLoading(false)
            setSuccess(true)
          },
          (error) => {
            console.log(error.text)
            setLoading(false)
            setFailure(true)
          }
        )
    }
  }

  const sendSuccessOrFailure = (): string => {
    if (success) return "seccess"
    if (failure) return "failure"
    return "send"
  }

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
                <WhatsNew endpoint={"/api/getContent"} />
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
            <form ref={formRef} id="contact-form" onSubmit={sendEmail}>
              <h4>send me an email ♡</h4>
              <input type="hidden" name="contact_number" />
              <div className="contact-fields">
                <div className="contact-child">
                  <div className="contact-field">
                    <label>Name</label>
                    <input
                      type="text"
                      name="user_name"
                      disabled={success || failure}
                      onChange={(e) => setName(!!e.target.value)}
                    />
                  </div>
                  <div className="contact-field">
                    <label>Email</label>
                    <input
                      type="email"
                      name="user_email"
                      disabled={success || failure}
                      onChange={(e) => {
                        setEmail(!!e.target.value)
                        setEmailString(e.target.value)
                      }}
                    />
                    {emailError && (
                      <Typography variant="caption" color="error">
                        must be a valid email
                      </Typography>
                    )}
                  </div>
                </div>
                <div className="contact-child">
                  <label>Message</label>
                  <textarea
                    name="message"
                    disabled={success || failure}
                    onChange={(e) => setText(!!e.target.value)}
                  ></textarea>
                </div>
              </div>
              <input
                id="send-email"
                style={{ marginTop: 20, width: 100 }}
                type="submit"
                value={loading ? "sending..." : sendSuccessOrFailure()}
                disabled={success || failure || !email || !name || !text}
              />
            </form>
          </div>
        </div>
        <div id="twitter-feed-wrapper">
          <TwitterFeed />
        </div>
      </div>
    </>
  )
}
