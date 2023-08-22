import React, { ReactNode, useEffect, useMemo } from "react"
import { CircularProgress, Stack, SxProps, Typography } from "@mui/material"
import CircleIcon from "@mui/icons-material/Circle"
import { VercelReadyState, useDeployment } from "./useDeployment"
import { DeploymentDate } from "./deploymentDate"
import { useStopwatch } from "react-timer-hook"

const METADATA_SX = {
  border: "solid #555 2px",
  borderRadius: 2,
  flex: 1,
  p: 3,
}

const NetTabLink: React.FC<{ url: string; sx?: SxProps }> = ({ url, sx }) => {
  let destination = url
  if (url.slice(0, 4) !== "http") destination = `https://${url}`
  return (
    <Typography
      component="span"
      sx={{
        ...sx,
        textDecoration: "underline",
        ":hover": {
          cursor: "pointer",
        },
      }}
      onClick={() => window.open(destination, "_blank", "noopener,noreferrer")}
    >
      {url}
    </Typography>
  )
}

const SmallHeader: React.FC<{ children: ReactNode }> = ({ children }) => (
  <Typography component="span" sx={{ fontSize: 12, color: "#555" }}>
    {children}
  </Typography>
)

const readyStateColors: Record<VercelReadyState, string> = {
  READY: "#00ff00",
  QUEUED: "#555555",
  ERROR: "#ff0000",
  CANCELED: "#ff5500",
  INITIALIZING: "#0099ff",
  BUILDING: "#5555ff",
}

export const Deployment: React.FC<{ id: string; createdAt: number }> = ({
  id,
  createdAt,
}) => {
  const { deploymentEvents, metadata } = useDeployment(id)

  const offsetTimestamp = useMemo(() => {
    const now = Number(new Date())
    let diff = now
    if (metadata?.buildingAt) {
      diff -= metadata.buildingAt
    } else {
      diff -= createdAt
    }
    return new Date(now + diff)
  }, [createdAt, metadata?.buildingAt])

  const { minutes, seconds, reset } = useStopwatch({
    autoStart: true,
    offsetTimestamp,
  })

  useEffect(() => {
    reset(offsetTimestamp)
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [offsetTimestamp])

  return (
    <Stack m={5} rowGap={3}>
      <Stack columnGap={3} direction="row">
        <Stack sx={METADATA_SX}>
          <SmallHeader>Status</SmallHeader>
          <Typography component="span">
            {metadata?.readyState && (
              <CircleIcon
                sx={{ fill: readyStateColors[metadata.readyState], height: 12 }}
              />
            )}
            {metadata?.readyState}
          </Typography>
        </Stack>
        <Stack sx={METADATA_SX}>
          <SmallHeader>Duration</SmallHeader>
          {metadata &&
          ["READY", "CANCELED", "ERROR"].includes(metadata.readyState) ? (
            <Typography>{`${Math.floor(
              (metadata?.ready - metadata?.buildingAt) / 1000 / 60
            )}m ${(
              (((metadata?.ready - metadata?.buildingAt) / 1000 / 60) % 1) *
              60
            ).toFixed()}s`}</Typography>
          ) : (
            <Typography>
              <CircularProgress style={{ height: 12, width: 12, color: "#000" }} />
              <Typography
                suppressHydrationWarning
                component="span"
                ml={1}
              >{`${minutes}m ${seconds}s`}</Typography>
            </Typography>
          )}
        </Stack>
        <Stack sx={METADATA_SX}>
          <SmallHeader>Domains</SmallHeader>
          {metadata?.alias.map((alias) => (
            <Typography key={alias}>
              <NetTabLink url={alias} />
            </Typography>
          ))}
        </Stack>
      </Stack>
      <Stack bgcolor="#000" color="#fff" borderRadius={1} px={2} pt={4} pb={1}>
        {metadata?.ready && (
          <Typography
            mb={1}
            sx={{ color: readyStateColors[metadata.readyState] }}
          >{`${metadata.readyState === "READY" ? "" : "..."} ${
            metadata.readyState
          }`}</Typography>
        )}
        {deploymentEvents?.map(
          (event) =>
            event.payload?.text &&
            event.created && (
              <Stack direction="row" columnGap={5} key={event.payload.id}>
                <DeploymentDate date={event.created} />
                <Typography component="span">{event.payload.text}</Typography>
              </Stack>
            )
        )}
        {metadata?.readyState === "READY" && metadata?.alias[0] && (
          <Typography
            mt={1}
            sx={{
              color: readyStateColors[metadata.readyState],
            }}
          >
            Deployed successfully to: <NetTabLink url={metadata.alias[0]} />
          </Typography>
        )}
      </Stack>
    </Stack>
  )
}
