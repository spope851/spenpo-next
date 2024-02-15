'use client'
import { Cube, getFacelets } from '3x3-cube'
import { Box } from '@mui/material'
import React from 'react'

export const CubeDemo: React.FC = () => {
  return (
    <Box p={1}>
      <Cube
        solve={async () =>
          await fetch(`/api/solveCube?facelets=${getFacelets()}`).then((res) =>
            res.json()
          )
        }
      />
    </Box>
  )
}
