import Landing from "@/components/landingPage"
import { Box } from "@mui/material"
import { useState, ReactNode, useEffect } from "react"

export default function SpenpoLandingDemo() {
  const [spenpoLanding, setSpenpoLanding] = useState<ReactNode>()

  useEffect(() => {
    setSpenpoLanding(<Landing />)
  }, [])

  return (
    <Box component="td" className="projects-table-data">
      <Box id="spenpo-landing-demo" className="app-demo">
        {spenpoLanding}
      </Box>
    </Box>
  )
}
