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
  return <div ref={demoRoot}></div>
}
