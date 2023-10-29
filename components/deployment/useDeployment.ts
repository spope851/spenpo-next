import { useEffect, useState } from "react"

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
  deploymentEvents: string
  metadata?: Deployment
}

const getDeployment = async (uid: string) =>
  fetch(`/api/landing-page/getVercelDeployment?uid=${uid}`)

const getDeploymentEvents = async (uid: string) =>
  fetch(`/api/landing-page/getVercelDeploymentEvents?uid=${uid}`)

export const useDeployment = (id: string): UseDeploymentProps => {
  const [deploymentEvents, setDeploymentEvents] = useState("")
  const [metadata, setMetadata] = useState<Deployment>()
  const [error, setError] = useState()

  useEffect(() => {
    if (
      !["READY", "CANCELED", "ERROR"].includes(metadata?.readyState || "") &&
      !error
    ) {
      const poll = async () =>
        getDeployment(id).then(async (res) => {
          const data = await res.json()
          if (data.error) setError(data.error)
          else setMetadata(data)
        })
      poll()
      const pollingId = window.setInterval(poll, 3000)

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
          console.log(decodedChunk)

          setDeploymentEvents((prev) => prev + decodedChunk)
        }
      } catch (error) {
        console.log(error)
      }
    }

    if (id) fetchData()
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [])

  return { deploymentEvents, metadata }
}
