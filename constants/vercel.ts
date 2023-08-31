import { VercelReadyState } from "@/components/deployment/useDeployment"

const READY_STATE_COLORS: Record<VercelReadyState, string> = {
  READY: "#00ff00",
  QUEUED: "#555555",
  ERROR: "#ff0000",
  CANCELED: "#ff5500",
  INITIALIZING: "#0099ff",
  BUILDING: "#5555ff",
}

export { READY_STATE_COLORS }
