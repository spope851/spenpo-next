import { Box } from "@mui/material"
import { useState, ReactNode, useEffect } from "react"
import { Timeclock } from "react-timeclock"

export default function ReactTimeclockDemo() {
  const [timeclock, setTimeclock] = useState<ReactNode>()

  useEffect(() => {
    setTimeclock(<Timeclock />)
  }, [])
  return (
    <Box component="td" pb={3} className="projects-table-data">
      <Box id="react-timeclock-demo" className="app-demo">
        {timeclock}
      </Box>
    </Box>
  )
}
