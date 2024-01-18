import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material'

const props = {
  'title?': 'string',
  'name?': 'string',
  'subtitle?': 'string',
  'actionStatement?': 'string',
  'actionDestination?': 'string',
  'accentColor?': 'string',
  'secondaryAccentColor?': 'string',
  'backgroundColor?': 'string',
  'backgroundImage?': 'string',
  'headshotSrc?': 'string',
  'socialUrls?': 'string[]',
  'topComponents?': 'ReactNode',
  'editable?': '[boolean, Dispatch<SetStateAction<boolean>>]',
  'cms?': 'SpenpoLandingCms',
  'cache?': 'SpenpoLandingCache',
  'cacheCallback?': '(cache: SpenpoLandingCache) => Promise<void>',
}

export default function SpenpoLandingDes() {
  return (
    <Stack>
      <ul>
        <li>description: customizable landing page product</li>
        <ul>
          <li>
            client side SPA that displays an image and additional configurable
            information
          </li>
          <li>
            admin access allows the content to be updated and redeployed directly
            from the site
          </li>
        </ul>
        <li>
          <a href="https://www.npmjs.com/package/spenpo-landing">npm</a>
        </li>
        <li>
          <a
            href="https://github.com/spope851/spenpo-landing"
            target="_blank"
            rel="noreferrer"
          >
            github
          </a>
        </li>
        <li>architecture:</li>
        <ul>
          <li>
            <strong>ui</strong>:{' '}
            <a href="https://reactjs.org" target="_blank" rel="noreferrer">
              react
            </a>
          </li>
        </ul>
        <li>next steps:</li>
        <ul>
          <li>publish module to NPM for ease of third party integration ✅</li>
          <li>add further UI config features</li>
          <li>font, element placement, navigation</li>
          <li>
            productize it. this component by itself can be a modular website that
            non-technical people can configure and deploy for themselves without
            coding ✅
          </li>
          <ul>
            <li>
              <a href="https://www.spenpo.com/products/landing-page">product</a>
            </li>
            <li>
              <a href="https://github.com/spenpo-landing/landing-template">
                prototype
              </a>
            </li>
            <li>
              <a
                href="https://github.com/spenpo-landing/landing-template"
                target="_blank"
                rel="noreferrer"
              >
                github
              </a>
            </li>
            <li>
              <a href="https://landing-template-five.vercel.app">demo</a>
            </li>
          </ul>
        </ul>
      </ul>
      <Stack gap={2} m={1} pl={2}>
        <a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fspenpo-landing%2Flanding-template&env=AWS_SECRET_ACCESS_KEY,AWS_ACCESS_KEY_ID,AWS_LANDING_S3,VERCEL_TEAM,VERCEL_TOKEN,GH_TOKEN,NEXT_AUTH_USERNAME,NEXT_AUTH_PASSWORD,NEXT_PUBLIC_PROJECT_NAME,NEXT_PUBLIC_NAME&envDescription=Content%20and%20API%20Keys&envLink=https%3A%2F%2Fgithub.com%2Fspenpo-landing%2Flanding-template&redirect-url=https%3A%2F%2Fspenpo.com%2Fprojects%2Fspenpo-landing&demo-title=Spenpo%20Landing&demo-description=A%20full%20stack%20implementation%20of%20the%20spenpo-landing%20React%20component&demo-url=https%3A%2F%2Flanding-template-five.vercel.app%2F&demo-image=https%3A%2F%2Fwww.pngitem.com%2Fpimgs%2Fm%2F618-6183618_transparent-unknown-person-png-transparent-background-female-user.png">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://vercel.com/button" alt="Deploy with Vercel" />
        </a>
        <strong>props:</strong>
      </Stack>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>prop</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(props).map(([key, val]) => (
            <TableRow key={key}>
              <TableCell>{key}</TableCell>
              <TableCell>
                <code>{val}</code>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Stack>
  )
}
