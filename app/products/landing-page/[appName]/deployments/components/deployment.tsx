'use client'
import React, { useEffect, useMemo } from 'react'
import { CircularProgress, Stack, Typography } from '@mui/material'
import { useDeployment } from './useDeployment'
import { DeploymentDate } from './deploymentDate'
import { useStopwatch } from 'react-timer-hook'
import { READY_STATE_COLORS } from '@/app/constants/vercel'
import { NewTabLink } from '../../../../../components/newTabLink'
import { Status } from './status'
import { SmallHeader } from './smallHeader'
import { Domains } from './domains'

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

const METADATA_SX = {
  border: 'solid #555 2px',
  borderRadius: 2,
  flex: 1,
  p: 3,
}

export const Deployment: React.FC<{ id: string; createdAt?: number }> = ({
  id,
  createdAt,
}) => {
  const { deploymentEvents: deploymentEventsStr, metadata } = useDeployment(id)

  const deploymentEvents = useMemo(
    () =>
      deploymentEventsStr.split(`}}\n`).reduce((p: DeploymentEvent[], c) => {
        // console.log(`\n${c}\n`);

        let str

        try {
          str = JSON.parse(`${c}}}`)
        } catch {
          return p
        }

        const ids = p.map((event) => event.payload.id)
        if (!ids.includes(str.payload?.id)) p.push(str)
        return p
      }, []),
    [deploymentEventsStr]
  )

  const offsetTimestamp = useMemo(() => {
    const now = Number(new Date())
    let diff = now
    if (metadata?.buildingAt) {
      diff -= metadata.buildingAt
    } else if (createdAt) {
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
    <Stack m={{ xs: 2, sm: 5 }} rowGap={3}>
      <Stack gap={3} direction={{ xs: 'column', sm: 'row' }}>
        <Status readyState={metadata?.readyState} sx={METADATA_SX} />
        <Stack sx={METADATA_SX}>
          <SmallHeader>Duration</SmallHeader>
          {metadata &&
          ['READY', 'CANCELED', 'ERROR'].includes(metadata.readyState) ? (
            <Typography>{`${Math.floor(
              (metadata?.ready - metadata?.buildingAt) / 1000 / 60
            )}m ${(
              (((metadata?.ready - metadata?.buildingAt) / 1000 / 60) % 1) *
              60
            ).toFixed()}s`}</Typography>
          ) : (
            <Typography>
              <CircularProgress style={{ height: 12, width: 12, color: '#000' }} />
              <Typography
                suppressHydrationWarning
                component="span"
                ml={1}
              >{`${minutes}m ${seconds}s`}</Typography>
            </Typography>
          )}
        </Stack>
        <Domains alias={metadata?.alias} sx={METADATA_SX} />
      </Stack>
      <Stack bgcolor="#000" color="#fff" borderRadius={1} px={2} pt={4} pb={1}>
        {metadata?.ready && (
          <Typography
            id="deployment"
            mb={1}
            sx={{ color: READY_STATE_COLORS[metadata.readyState] }}
          >{`${metadata.readyState === 'READY' ? '' : '...'} ${
            metadata.readyState
          }`}</Typography>
        )}
        {deploymentEvents?.map(
          (event) =>
            event.created && (
              <Stack direction="row" columnGap={5} key={event.payload.id}>
                <DeploymentDate date={event.created} />
                <Typography
                  id="deployment"
                  whiteSpace="pre-wrap"
                  sx={{ overflowWrap: 'anywhere' }}
                >
                  {event.payload.text}
                </Typography>
              </Stack>
            )
        )}
        {metadata?.readyState === 'READY' && metadata?.alias[0] && (
          <Typography
            id="deployment"
            mt={1}
            sx={{
              color: READY_STATE_COLORS[metadata.readyState],
            }}
          >
            Deployed successfully to:{' '}
            <NewTabLink typographyId="deployment" url={metadata.alias[0]} />
          </Typography>
        )}
      </Stack>
    </Stack>
  )
}
