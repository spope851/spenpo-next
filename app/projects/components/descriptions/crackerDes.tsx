import { METADATA } from '@/app/constants/projects'

export default function CrackerDes() {
  return (
    <ul>
      <li>
        description: {METADATA.cracker.description}
        <ul>
          <li>track three data points each night</li>
          <li>
            find macro trends in your habits with the dashboard feature
            <ul>
              <li>creativity KPIs from your quantitative data</li>
              <li>flexible wordcloud from your qualitative data</li>
            </ul>
          </li>
        </ul>
      </li>
      <li>
        <a
          href="https://github.com/spope851/cracker"
          target="_blank"
          rel="noreferrer"
        >
          github
        </a>
      </li>
      <li>
        <a
          href="https://reflective-hour.vercel.app"
          target="_blank"
          rel="noreferrer"
        >
          demo
        </a>
      </li>
      <li>architecture:</li>
      <ul>
        <li>
          frontend
          <ul>
            <li>
              <strong>ui</strong>:{' '}
              <a href="https://nextjs.org" target="_blank" rel="noreferrer">
                next.js
              </a>
            </li>
            <li>
              <strong>auth</strong>:{' '}
              <a href="https://next-auth.js.org" target="_blank" rel="noreferrer">
                next-auth
              </a>
            </li>
          </ul>
        </li>
        <li>
          backend
          <ul>
            <li>
              <a
                href="https://www.apollographql.com/docs/apollo-server/"
                target="_blank"
                rel="noreferrer"
              >
                apollo server
              </a>
            </li>
            <li>
              <a href="https://typegraphql.com/" target="_blank" rel="noreferrer">
                TypeGraphQL
              </a>
            </li>
            <li>
              <a
                href="https://the-guild.dev/graphql/codegen"
                target="_blank"
                rel="noreferrer"
              >
                graphql codegen
              </a>
            </li>
          </ul>
        </li>
        <li>
          storage
          <ul>
            <li>
              <a href="https://postgresql.org" target="_blank" rel="noreferrer">
                postgresql
              </a>
            </li>
            <li>
              <strong>cache</strong>:{' '}
              <a href="https://redis.com" target="_blank" rel="noreferrer">
                redis
              </a>
            </li>
          </ul>
        </li>
      </ul>
      <li>next steps:</li>
      <ul>
        <li>integrate and ORM to improve client side type support</li>
        <li>
          integrate a large language model that provides AI insights on user data
        </li>
      </ul>
    </ul>
  )
}
