import { SpenpoLanding } from 'spenpo-landing'
import React, { useState, ReactNode, useEffect } from 'react'

export default function SpenpoLandingDemo() {
  const [spenpoLanding, setSpenpoLanding] = useState<ReactNode>()

  useEffect(() => {
    setSpenpoLanding(<SpenpoLanding />)
  }, [])

  return <>{spenpoLanding}</>
}
