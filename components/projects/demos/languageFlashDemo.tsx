import { Box } from "@mui/material"
import { useRef, useEffect } from "react"

export default function LanguageFlashDemo() {
  const demoRoot = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    let lf: { $destroy: () => void }
    ;(async () => {
      const LanguageFlash = (await import("spenpo-svelte")).default
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
  return (
    <Box component="td" className="projects-table-data">
      <Box id="lang-flash" className="app-demo">
        <Box ref={demoRoot}></Box>
      </Box>
    </Box>
  )
}
