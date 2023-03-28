import React, { useRef, useState } from "react"
import { Box, Typography } from "@mui/material"
import validator from "validator"
import emailjs from "@emailjs/browser"
import { ContactFormWrapper } from "./styled"

const ContactForm: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [failure, setFailure] = useState(false)
  const [name, setName] = useState(false)
  const [email, setEmail] = useState(false)
  const [emailString, setEmailString] = useState("")
  const [emailError, setEmailError] = useState(false)
  const [text, setText] = useState(false)
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
    <ContactFormWrapper
      component="form"
      ref={formRef}
      id="contact-form"
      onSubmit={sendEmail}
    >
      <Typography variant="h6" fontWeight="bold" mb="20px">
        send me an email ♡
      </Typography>
      <input type="hidden" name="contact_number" />
      <div className="contact-fields">
        <div className="contact-child">
          <Box mb={{ sm: 3 }} className="contact-field">
            <label>Name</label>
            <input
              type="text"
              name="user_name"
              disabled={success || failure}
              onChange={(e) => setName(!!e.target.value)}
            />
          </Box>
          <Box className="contact-field">
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
          </Box>
        </div>
        <Box className="contact-child">
          <label>Message</label>
          <textarea
            name="message"
            disabled={success || failure}
            onChange={(e) => setText(!!e.target.value)}
          ></textarea>
        </Box>
      </div>
      <input
        id="send-email"
        style={{ marginTop: 20, width: 100 }}
        type="submit"
        value={loading ? "sending..." : sendSuccessOrFailure()}
        disabled={success || failure || !email || !name || !text}
      />
    </ContactFormWrapper>
  )
}

export default ContactForm
