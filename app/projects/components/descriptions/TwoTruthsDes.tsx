import { METADATA } from '@/app/constants/projects'
import React from 'react'

export const TwoTruthsDes: React.FC = () => {
  return (
    <ul>
      <li>description: {METADATA['two-truths'].description}</li>
      <ul>
        <li>choose the two you think are true</li>
        <li>replay button resets the game with new values</li>
        <ul>
          <li>pass in your own data through props</li>
        </ul>
      </ul>
      <li>
        <a
          href="https://www.npmjs.com/package/two-truths"
          target="_blank"
          rel="noreferrer"
        >
          npm
        </a>
      </li>
      <li>
        <a
          href="https://github.com/spope851/two-truths"
          target="_blank"
          rel="noreferrer"
        >
          github
        </a>
      </li>
      <li>architecture:</li>
      <ul>
        <li>
          <strong>data</strong>: personal truths and lies recorded{' '}
          <a
            href="https://github.com/spope851/meDotCom/blob/main/database/sql/insert_truths.sql"
            target="_blank"
            rel="noreferrer"
          >
            here
          </a>
        </li>
        <ul>
          <li>
            integration through the following{' '}
            <a
              href="https://github.com/spope851/meDotCom/blob/main/database/Dockerfile"
              target="_blank"
              rel="noreferrer"
            >
              docker image
            </a>
          </li>
        </ul>
        <li>
          <strong>storage</strong>:{' '}
          <a href="https://www.postgresql.org/" target="_blank" rel="noreferrer">
            postgres
          </a>
        </li>
        <li>
          <strong>backend</strong>:{' '}
          <a href="https://nodejs.org/en/" target="_blank" rel="noreferrer">
            node
          </a>
        </li>
        <li>
          <strong>ui</strong>:{' '}
          <a href="https://svelte.dev" target="_blank" rel="noreferrer">
            svelte
          </a>
        </li>
      </ul>
    </ul>
  )
}
