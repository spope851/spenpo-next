import Script from "next/script"

export default function LanguageFlashDemo() {
  return (
    <>
      language flash demo
      {/* <Script src="/static/svelte-apps/lang-flash-bundle.js" />
      <Script
        dangerouslySetInnerHTML={{
          __html: `
        const lfTarget = document.getElementById("lang-flash")
        console.log(lfTarget)

        new LanguageFlash({
          target: lfTarget,
        })
      `,
        }}
      /> */}
    </>
  )
}
