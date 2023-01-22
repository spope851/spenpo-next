import { useRef, useEffect } from "react"
import TwoTruths from "spenpo-svelte/dist/two-truths-bundle"

export default function TwoTruthsDemo() {
  const demoRoot = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const tt =
      demoRoot &&
      new TwoTruths({
        target: demoRoot.current,
      })

    return () => {
      tt.$destroy()
    }
  }, [])
  return <div ref={demoRoot}></div>
}
