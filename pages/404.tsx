import { RobotError } from "@/components/robotError"
import { Typography } from "@mui/material"

export default function Custom404() {
  return (
    <RobotError>
      <Typography component="p">404 - Page Not Found</Typography>
    </RobotError>
  )
}
