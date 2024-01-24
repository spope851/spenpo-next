'use client'
import React from 'react'
import { SpenpoLanding } from 'spenpo-landing'
import { RootTopComponents } from './components/RootTopComponents'

export default function Root() {
  const name = 'Spencer Pope'
  const title = 'Developer & Entrepreneur'

  return (
    <SpenpoLanding
      title={title}
      name={name}
      subtitle="Striving to be useful"
      socialUrls={[
        'https://twitter.com/s_pop3',
        'https://github.com/spope851',
        'mailto:spenpo@spenpo.com',
        'https://www.youtube.com/@spope',
        'https://www.twitch.tv/spenpo',
      ]}
      headshotSrc="/images/headshot.jpeg"
      actionDestination="products/landing-page"
      actionStatement="let's build your website"
      topComponents={<RootTopComponents />}
    />
  )
}
