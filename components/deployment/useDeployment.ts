import { useEffect, useState } from "react"
import {
  getDeployment,
  getDeploymentEvents,
  getProjectDeployments,
} from "@/services/vercel"

type DeploymentEvent = {
  type?: string
  created?: number
  payload?: {
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

export type VercelReadyState =
  | "QUEUED"
  | "BUILDING"
  | "ERROR"
  | "INITIALIZING"
  | "READY"
  | "CANCELED"

type Deployment = {
  alias: string[]
  createdAt: number
  ready: number
  readyState: VercelReadyState
  inspectorUrl: string
}

type UseDeploymentProps = {
  deploymentEvents: DeploymentEvent[]
  metadata?: Deployment
}

export const useDeployment = (app: string): UseDeploymentProps => {
  const [deploymentEvents, setDeploymentEvents] = useState<DeploymentEvent[]>([])
  const [metadata, setMetadata] = useState<Deployment>()
  const [deploymentId, setDeploymentId] = useState<string>()

  useEffect(() => {
    if (
      deploymentId &&
      metadata &&
      !["READY", "CANCELED", "ERROR"].includes(metadata.readyState)
    ) {
      const pollingId = window.setInterval(
        () =>
          getDeployment(deploymentId).then(async (res) => {
            const data = await res.json()
            setMetadata(data)
          }),
        3000
      )

      return () => {
        clearInterval(pollingId)
      }
    }
  }, [metadata, deploymentId])

  useEffect(() => {
    if (!deploymentId) {
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
            setDeploymentId(deployments.deployments[0].uid)
            setMetadata(deployment)
          }
        }
      }, 1000)

      return () => {
        clearInterval(pollingId)
      }
    } else {
      // fetch deployment events
      const fetchData = async () => {
        try {
          const response = await getDeploymentEvents(deploymentId)
          if (!response.ok || !response.body) {
            throw response.statusText
          }

          const reader = response.body.getReader()
          const decoder = new TextDecoder()

          while (true) {
            const { value, done } = await reader.read()

            if (done || metadata?.readyState === "READY") {
              break
            }

            const decodedChunk = decoder.decode(value, { stream: true })

            setDeploymentEvents((prev) => {
              return [
                ...prev,
                ...decodedChunk.split(`\n`).map((str) => {
                  if (str.length > 2) {
                    try {
                      return JSON.parse(str)
                    } catch (err) {
                      console.log(err)
                    }
                  }
                }),
              ].filter((event) => !!event)
            })
          }
        } catch (error) {
          console.log(error)
        }
      }

      fetchData()
    }
  }, [deploymentId])

  return { deploymentEvents, metadata }
}
