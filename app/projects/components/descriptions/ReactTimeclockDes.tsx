import { METADATA } from '@/app/constants/projects'
import React from 'react'

export const ReactTimeclockDes: React.FC = () => {
  return (
    <ul>
      <li>description: {METADATA['react-timeclock'].description}</li>
      <ul>
        <li>
          clock in/out when working on your site and record what you&apos;ve done
        </li>
        <li>
          add to a site during development to easily track how long you&apos;ve
          worked
        </li>
      </ul>
      <li>
        <a
          href="https://www.npmjs.com/package/react-timeclock"
          target="_blank"
          rel="noreferrer"
        >
          npm
        </a>
      </li>
      <li>
        <a
          href="https://github.com/spope851/react-timeclock"
          target="_blank"
          rel="noreferrer"
        >
          github
        </a>
      </li>
      <li>architecture:</li>
      <ul>
        <li>
          <strong>storage</strong>:{' '}
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage"
            target="_blank"
            rel="noreferrer"
          >
            local storage
          </a>
        </li>
        <li>
          <strong>ui</strong>:{' '}
          <a href="https://reactjs.org" target="_blank" rel="noreferrer">
            react
          </a>
        </li>
      </ul>
      <li>next steps:</li>
      <ul>
        <li>allow user to store their data and pass in via props</li>
        <li>display weekly/monthly totals and averages in hours</li>
        <li>allow user to export their data</li>
      </ul>
    </ul>
  )
}
