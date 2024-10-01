'use client'
import React, { useRef, useState } from 'react'
import { Button, Grid, Stack, TextField, Typography } from '@mui/material'
import validator from 'validator'
import emailjs from '@emailjs/browser'

export const ContactForm: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [failure, setFailure] = useState(false)
  const [name, setName] = useState(false)
  const [email, setEmail] = useState(false)
  const [emailString, setEmailString] = useState('')
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
          'service_q5mctvg',
          'template_ebpu5h9',
          formRef.current || '',
          'owxwQWa3Ry2FxkhKz'
        )
        .then(
          () => {
            setLoading(false)
            setSuccess(true)
          },
          () => {
            setLoading(false)
            setFailure(true)
          }
        )
    }
  }

  const sendSuccessOrFailure = (): string => {
    if (success) return 'success'
    if (failure) return 'failure'
    return 'send'
  }

  return (
    <form ref={formRef}>
      <Typography variant="body2" mb={5}>
        Send me an email ♡
      </Typography>
      <Grid container spacing={{ md: 5, xs: 2 }} alignSelf="center">
        <Grid item display="flex" md={6} flex={1}>
          <TextField
            fullWidth
            multiline
            rows={5}
            name="message"
            label="What can I do for you?"
            disabled={success || failure}
            onChange={(e) => setText(!!e.target.value)}
          />
        </Grid>
        <Grid item container md={6}>
          <input type="hidden" name="contact_number" />
          <Stack flex={1} justifyContent="space-between" gap={{ md: 0, xs: 2 }}>
            <Grid
              component={() => (
                <TextField
                  fullWidth
                  type="text"
                  name="user_name"
                  label="name"
                  size="small"
                  disabled={success || failure}
                  onChange={(e) => setName(!!e.target.value)}
                />
              )}
              item
              md={12}
            />
            <Grid
              component={() => (
                <TextField
                  fullWidth
                  type="email"
                  label="email"
                  name="user_email"
                  size="small"
                  disabled={success || failure}
                  onChange={(e) => {
                    setEmail(!!e.target.value)
                    setEmailString(e.target.value)
                  }}
                />
              )}
              item
              md={12}
            />
            <Grid
              component={() => (
                <Button
                  fullWidth
                  variant="outlined"
                  type="submit"
                  disabled={success || failure || !email || !name || !text}
                  onClick={sendEmail}
                >
                  {loading ? 'sending...' : sendSuccessOrFailure()}
                </Button>
              )}
              item
              md={12}
            />
          </Stack>
        </Grid>
      </Grid>
      {emailError && (
        <Typography variant="caption" color="error">
          must be a valid email
        </Typography>
      )}
    </form>
  )
}
