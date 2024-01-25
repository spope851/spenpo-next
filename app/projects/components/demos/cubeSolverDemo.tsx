'use client'
import { Cube, getFacelets } from '3x3-cube'
import { Box } from '@mui/material'

export default function CubeDemo() {
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
