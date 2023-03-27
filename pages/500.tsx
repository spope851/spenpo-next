import { RobotError } from "@/components/robotError"
import { Typography } from "@mui/material"

export default function Custom500() {
  return (
    <RobotError>
      <Typography component="p">500 - deepest apologies,</Typography>
      <Typography component="p">somethings wrong with our server</Typography>
    </RobotError>
  )
}
