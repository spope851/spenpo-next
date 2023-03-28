import { Box } from "@mui/material"
import { useRef, useEffect } from "react"

export default function TwoTruthsDemo() {
  const demoRoot = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    let tt: { $destroy: () => void }
    ;(async () => {
      const TwoTruths = (await import("spenpo-svelte/dist/two-truths-bundle"))
        .default
      tt =
        demoRoot &&
        demoRoot.current?.children.length === 0 &&
        new TwoTruths({
          target: demoRoot.current,
        })
    })()
    return () => {
      tt && tt.$destroy()
    }
  }, [])
  return (
    <Box component="td" className="projects-table-data">
      <Box id="two-truths-demo" className="app-demo">
        <Box ref={demoRoot}></Box>
      </Box>
    </Box>
  )
}
