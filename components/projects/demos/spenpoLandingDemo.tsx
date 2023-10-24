import Landing from "@/components/landingPage"
import { useState, ReactNode, useEffect } from "react"

export default function SpenpoLandingDemo() {
  const [spenpoLanding, setSpenpoLanding] = useState<ReactNode>()

  useEffect(() => {
    setSpenpoLanding(<Landing />)
  }, [])

  return <>{spenpoLanding}</>
}
