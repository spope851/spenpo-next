import { useRef, useEffect } from "react"
import LanguageFlash from "spenpo-svelte"

export default function LanguageFlashDemo() {
  const demoRoot = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const lf =
      demoRoot &&
      new LanguageFlash({
        target: demoRoot.current,
      })

    return () => {
      lf.$destroy()
    }
  }, [])
  return <div ref={demoRoot}></div>
}
