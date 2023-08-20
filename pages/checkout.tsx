import React, { useContext, useEffect, useState } from "react"
import { Button, Stack, TextField } from "@mui/material"
import { ShoppingCartContext } from "@/context/shoppingCart"
import { useSession } from "next-auth/react"
import { getProjectDeployments, getDeployment } from "@/services/vercel"
import { useRouter } from "next/router"

export default function Checkout() {
  const { deployLandingPageBody, setPassword } = useContext(ShoppingCartContext)
  const [loading, setLoading] = useState(false)
  const [app, setApp] = useState<string>()
  const session = useSession()
  const router = useRouter()
  console.log(deployLandingPageBody)

  useEffect(() => {
    if (app) {
      const pollingId = window.setInterval(async () => {
        // fetch deployment
        const projectDeployments = await getProjectDeployments(app).catch((err) => {
          console.log(err)
          return err
        })

        const deployments = await projectDeployments.json()

        if (deployments.deployments.length > 0) {
          const latestDeployment = await getDeployment(
            deployments.deployments[0].uid
          ).catch((err) => {
            console.log(err)
            return err
          })
          const deployment = await latestDeployment.json()
          if (!["READY", "CANCELED", "ERROR"].includes(deployment.readyState)) {
            router.push(
              `/deployments/${deployment.id}?createdAt=${deployment.createdAt}`
            )
            // setDeploymentId()
            // setMetadata(deployment)
          }
        }
      }, 1000)

      return () => {
        clearInterval(pollingId)
      }
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [app])

  return (
    <>
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
    </>
  )
}
