import React, { useContext, useEffect, useState } from "react"
import { Button, Divider, Stack, TextField } from "@mui/material"
import { ShoppingCartContext } from "@/context/shoppingCart"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import { Breadcrumbs } from "@/components/breadcrumbs"

const Checkout: React.FC = () => {
  const router = useRouter()
  const { setPassword, passwordSet } = useContext(ShoppingCartContext)
  const session = useSession()

  return (
    <>
      <Stack rowGap={1} m={5}>
        <Stack direction="row" justifyContent="space-between">
          <Breadcrumbs />
          <Button
            endIcon={<ChevronRightIcon />}
            variant="contained"
            onClick={() => router.push("checkout")}
            disabled={!passwordSet}
          >
            checkout
          </Button>
        </Stack>
        <Stack direction="row" justifyContent="space-around" m={5}>
          <Stack rowGap={1}>
            <TextField
              label="password"
              type="password"
              onChange={async (e) => {
                const req = await fetch("/api/hashString", {
                  method: "post",
                  body: JSON.stringify({ string: e.target.value }),
                })
                const password = await req.json()
                setPassword(password.hash)
              }}
            />
          </Stack>
        </Stack>
      </Stack>
    </>
  )
}

export default Checkout
