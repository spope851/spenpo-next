import { useRouter } from "next/router"
import { useState } from "react"
import { TwitterFeed } from "@/components/twitter-feed"
import { WhatsNew } from "@/components/whats-new"

export default function Home() {
  const [btnClass, setBtnClass] = useState<string>()
  const router = useRouter()
  console.log(process.env.TWITTER_BEARER)

  return (
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
          <form id="contact-form">
            <h4>send me an email ♡</h4>
            <input type="hidden" name="contact_number" />
            <div className="contact-fields">
              <div className="contact-child">
                <div className="contact-field">
                  <label>Name</label>
                  <input type="text" name="user_name" />
                </div>
                <div className="contact-field">
                  <label>Email</label>
                  <input type="email" name="user_email" />
                </div>
              </div>
              <div className="contact-child">
                <label>Message</label>
                <textarea name="message"></textarea>
              </div>
            </div>
            <input
              id="send-email"
              style={{ marginTop: 20, width: 100 }}
              type="submit"
              value="send"
            />
          </form>
        </div>
      </div>
      <div id="twitter-feed-wrapper">
        <TwitterFeed />
      </div>
    </div>
  )
}
