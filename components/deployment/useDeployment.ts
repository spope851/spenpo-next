import { useEffect, useState } from "react"
import { getDeployment, getDeploymentEvents } from "@/services/vercel"

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
  buildingAt: number
}

type UseDeploymentProps = {
  deploymentEvents: DeploymentEvent[]
  metadata?: Deployment
}

export const useDeployment = (id: string): UseDeploymentProps => {
  const [deploymentEvents, setDeploymentEvents] = useState<DeploymentEvent[]>([])
  const [metadata, setMetadata] = useState<Deployment>()
  const [error, setError] = useState()

  useEffect(() => {
    if (
      !["READY", "CANCELED", "ERROR"].includes(metadata?.readyState || "") &&
      !error
    ) {
      const pollingId = window.setInterval(
        () =>
          getDeployment(id).then(async (res) => {
            const data = await res.json()
            if (data.error) setError(data.error)
            else setMetadata(data)
          }),
        3000
      )

      return () => {
        clearInterval(pollingId)
      }
    }
  }, [metadata, id, error])

  useEffect(() => {
    // fetch deployment events
    const fetchData = async () => {
      try {
        const response = await getDeploymentEvents(id)
        if (!response.ok || !response.body) {
          throw response.statusText
        }

        const reader = response.body.getReader()
        const decoder = new TextDecoder()

        while (true) {
          const { value, done } = await reader.read()

          if (
            done ||
            ["READY", "CANCELED", "ERROR"].includes(metadata?.readyState || "")
          ) {
            break
          }

          const decodedChunk = decoder.decode(value, { stream: true })

          setDeploymentEvents((prev) => {
            const ids = deploymentEvents.map((event) => event.payload?.id)
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
            ]
              .filter((event) => !!event)
              .reduce((p: DeploymentEvent[], c) => {
                const ids = p.map((event) => event.payload?.id)
                if (!ids.includes(c.payload.id)) p.push(c)
                return p
              }, [])
              .filter((event) => !ids.includes(event.payload?.id))
          })
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [])

  return { deploymentEvents, metadata }
}
