import React, { useEffect, useState } from "react"
import { Stack, Typography } from "@mui/material"
import Link from "next/link"

type DeploymentEvent = {
  type: string
  created: number
  payload: {
    deploymentId: string
    info: {
      type: string
      name: string
      entrypoint: string
    }
    text: string
    id: string
    date: number
    serial: string
  }
}

export const Deployment: React.FC<{ app?: string }> = ({ app }) => {
  const [deploymentEvents, setDeploymentEvents] = useState<DeploymentEvent[]>()
  const [deploymentId, setDeploymentId] = useState<string>()
  const [deploymentUrl, setDeploymentUrl] = useState<string>()
  useEffect(() => {
    if (!deploymentId) {
      const pollingId = window.setInterval(async () => {
        // fetch deployment
        await fetch(`https://api.vercel.com/v2/deployments?app=${app}&limit=1`, {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_VERCEL_TOKEN}`,
          },
          method: "get",
        }).then(
          async (res) => {
            const deployments = await res.json()
            if (deployments.deployments.length > 0)
              setDeploymentId(deployments.deployments[0].uid)
          },
          (err) => {
            console.log(err)
            return err
          }
        )
      }, 1000)

      return () => {
        clearInterval(pollingId)
      }
    } else if (!deploymentUrl) {
      const pollingId = window.setInterval(async () => {
        // fetch deployment events
        await fetch(
          `https://api.vercel.com/v2/deployments/${deploymentId}/events?direction=backward`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_VERCEL_TOKEN}`,
            },
            method: "get",
          }
        ).then(
          async (res) => {
            setDeploymentEvents(await res.json())
            await fetch(`https://api.vercel.com/v13/deployments/${deploymentId}`, {
              headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_VERCEL_TOKEN}`,
              },
              method: "get",
            }).then(async (res) => {
              const data = await res.json()
              if (data.status === "READY") setDeploymentUrl(data.alias[0])
            })
          },
          (err) => {
            console.log(err)
            return err
          }
        )
      }, 1000)

      return () => {
        clearInterval(pollingId)
      }
    }
  }, [deploymentId, deploymentUrl])
  console.log(deploymentEvents)

  return (
    <Stack bgcolor="#000" color="#fff" m={5} borderRadius={1} px={2} pt={4} pb={1}>
      <Typography mb={1}>... Initializing</Typography>
      {deploymentEvents?.map(
        (event) =>
          event.payload.text && (
            <Stack direction="row" columnGap={5}>
              <Typography component="span">
                {new Date(event.created).getHours().toString().padStart(2, "0")}:
                {new Date(event.created).getMinutes().toString().padStart(2, "0")}:
                {new Date(event.created).getSeconds().toString().padStart(2, "0")}.
                {
                  String(
                    Number(new Date(event.created).getMilliseconds() / 1000).toFixed(
                      3
                    )
                  ).split(".")[1]
                }
              </Typography>
              <Typography component="span">{event.payload.text}</Typography>
            </Stack>
          )
      )}
      {deploymentUrl && (
        <Typography mt={1}>
          Deployed successfully to:{" "}
          <Link style={{ color: "#fff" }} href={`https://${deploymentUrl}`}>
            {deploymentUrl}
          </Link>
        </Typography>
      )}
    </Stack>
  )
}
