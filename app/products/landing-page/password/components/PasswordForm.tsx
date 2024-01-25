'use client'
import React, { useContext, useState } from 'react'
import { TextField } from '@mui/material'
import { ShoppingCartContext } from '@/app/context/shoppingCart'

export const PasswordForm: React.FC = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const { setPassword: setCtxPassword } = useContext(ShoppingCartContext)

  return (
    <>
      <TextField
        onChange={(e) => setPassword(e.target.value)}
        error={password !== confirmPassword}
        size="small"
        label="Password"
        type="password"
      />
      <TextField
        onChange={async (e) => {
          setConfirmPassword(e.target.value)
          if (password === e.target.value) {
            const change = await fetch('/api/hashString', {
              method: 'post',
              body: JSON.stringify({
                string: password,
              }),
            })
            const changeRes = await change.json()
            setCtxPassword(changeRes.hash)
          }
        }}
        error={password !== confirmPassword}
        size="small"
        label="Confirm Password"
        type="password"
      />
    </>
  )
}
