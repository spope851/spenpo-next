import React, { useContext, useState } from "react"
import { Button, Stack, TextField } from "@mui/material"
import { ShoppingCartContext } from "@/context/shoppingCart"
import { Deployment } from "@/components/deployment/deployment"
import { useSession } from "next-auth/react"

export default function Checkout() {
  const { deployLandingPageBody, setPassword } = useContext(ShoppingCartContext)
  const [loading, setLoading] = useState(false)
  const [app, setApp] = useState<string>()
  const session = useSession()

  return (
    <>
      {!app && (
        <Stack m="auto" rowGap={1}>
          <TextField
            label="password"
            type="password"
            onChange={async (e) => {
              const req = await fetch("api/hashString", {
                method: "post",
                body: JSON.stringify({ string: e.target.value }),
              })
              const password = await req.json()
              setPassword(password.hash)
            }}
          />
          <Button
            onClick={async () => {
              setLoading(true)
              const deploy = await fetch("/api/deployLanding", {
                body: JSON.stringify(deployLandingPageBody),
                method: "post",
              })
              if (deploy.status === 200) {
                const data = await deploy.json()
                setApp(data.vercel.app)
              }
            }}
            variant="contained"
            disabled={session.status !== "authenticated"}
          >
            {loading ? "...processing" : "deploy"}
          </Button>
        </Stack>
      )}
      {app && <Deployment app={app} />}
    </>
  )
}
