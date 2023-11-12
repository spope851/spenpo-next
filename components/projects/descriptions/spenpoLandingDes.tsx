export default function SpenpoLandingDes() {
  return (
    <ul>
      <li>description: customizable landing page product</li>
      <ul>
        <li>
          client side SPA that displays an image and additional configurable
          information
        </li>
        <li>
          admin access allows the content to be updated and redeployed directly from
          the site
        </li>
      </ul>
      <li>
        <a
          href="https://github.com/spenpo-landing/landing-template"
          target="_blank"
          rel="noreferrer"
        >
          github
        </a>
      </li>
      <li>architecture:</li>
      <ul>
        <li>
          <strong>ui</strong>:{" "}
          <a href="https://nextjs.org" target="_blank" rel="noreferrer">
            next.js
          </a>
        </li>
        <li>
          <strong>auth</strong>:{" "}
          <a href="https://next-auth.js.org" target="_blank" rel="noreferrer">
            next-auth
          </a>
        </li>
      </ul>
      <li>next steps:</li>
      <ul>
        <li>
          productize it. this component by itself can be a modular website that
          non-technical people can configure and deploy for themselves without coding
        </li>
        <ul>
          <li>
            <a href="https://github.com/spenpo-landing/landing-template">
              prototype
            </a>
          </li>
          <li>
            <a href="https://landing-template-five.vercel.app">demo</a>
          </li>
        </ul>
        <li>publish module to NPM for ease of third party integration</li>
        <li>add further UI config features</li>
        <li>font, element placement, navigation</li>
      </ul>
      <li>
        <a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fspenpo-landing%2Flanding-template&env=NEXT_PUBLIC_NAME,NEXT_AUTH_USERNAME,NEXT_AUTH_PASSWORD,NEXTAUTH_SECRET,NEXT_PUBLIC_TITLE,NEXT_PUBLIC_HEADSHOT,NEXT_PUBLIC_GH_TOKEN,NEXT_PUBLIC_VERCEL_TOKEN,NEXT_PUBLIC_PROJECT_NAME,NEXT_PUBLIC_ACTION&envDescription=API%20keys%20for%20automation%20purposes.%20Next-auth%20variables%20for%20access%20to%20admin%20features.%20Public%20variables%20for%20UI%20configuration&envLink=https%3A%2F%2Fspenpo.com%2Fprojects%2Fspenpo-landing&project-name=spenpo-landing&repository-name=spenpo-landing-clone&redirect-url=https%3A%2F%2Fspenpo.com%2Fprojects%2Fspenpo-landing&developer-id=oac_Azb9vDNgtYCb7HFWpi3lGkyd&demo-title=spenpo-landing&demo-description=a%20customizable%20landing%20page&demo-url=https%3A%2F%2Flanding-template-five.vercel.app%2F&demo-image=https%3A%2F%2Fwww.pngitem.com%2Fpimgs%2Fm%2F618-6183618_transparent-unknown-person-png-transparent-background-female-user.png">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://vercel.com/button" alt="Deploy with Vercel" />
        </a>
      </li>
    </ul>
  )
}
