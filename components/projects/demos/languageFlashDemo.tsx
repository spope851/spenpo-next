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
  return <div ref={demoRoot}></div>
}
