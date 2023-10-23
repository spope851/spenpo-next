import { Cube, getFacelets } from "3x3-cube"
import { Box } from "@mui/material"

export default function CubeDemo() {
  return (
    <Box maxWidth={{ xs: "unset", md: "calc(75vw - 36px)" }}>
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
