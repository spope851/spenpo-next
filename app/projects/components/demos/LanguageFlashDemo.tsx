'use client'
import { Box } from '@mui/material'
import React, { useRef, useEffect } from 'react'

export const LanguageFlashDemo: React.FC = () => {
  const demoRoot = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    let lf: { $destroy: () => void }
    ;(async () => {
      const LanguageFlash = (await import('spenpo-svelte')).default
      lf =
        demoRoot &&
        demoRoot.current?.children.length === 0 &&
        new LanguageFlash({
          target: demoRoot.current,
        })
    })()
    return () => {
      lf && lf.$destroy()
    }
  }, [])
  return <Box ref={demoRoot}></Box>
}
