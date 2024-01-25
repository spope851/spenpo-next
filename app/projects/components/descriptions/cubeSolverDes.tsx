export default function CubeDes() {
  return (
    <ul>
      <li>description: solve a 3x3 puzzle cube</li>
      <ul>
        <li>
          click each square and use the color picker to set the colors to match your
          cube
        </li>
        <li>
          each time a color is changed validation is performed to ensure the cube can
          be solved
        </li>
        <ul>
          <li>
            the solve button will be disabled if the color orientation is invalid
          </li>
        </ul>
        <li>solution will be printed below with a description of each step</li>
      </ul>
      <li>
        <a
          href="https://www.npmjs.com/package/3x3-cube"
          target="_blank"
          rel="noreferrer"
        >
          npm
        </a>
      </li>
      <li>
        <a href="https://github.com/spope851/cube" target="_blank" rel="noreferrer">
          github
        </a>
      </li>
      <li>architecture:</li>
      <ul>
        <li>
          <strong>storage</strong>: not persistent. local state stored in{' '}
          <a
            href="https://reactjs.org/docs/context.html#api"
            target="_blank"
            rel="noreferrer"
          >
            context api
          </a>
        </li>
        <li>
          <strong>ui</strong>:{' '}
          <a href="https://reactjs.org" target="_blank" rel="noreferrer">
            react
          </a>
        </li>
        <li>
          <strong>backend</strong>:{' '}
          <a href="https://nodejs.org/en/" target="_blank" rel="noreferrer">
            node
          </a>{' '}
          and{' '}
          <a
            href="https://www.npmjs.com/package/cubejs"
            target="_blank"
            rel="noreferrer"
          >
            cubejs
          </a>
        </li>
        <ul>
          <li>
            use api of your choice by passing <code>solve</code> function in with{' '}
            <code>props</code>
          </li>
          <li>
            get a{' '}
            <a
              href="https://www.npmjs.com/package/cubejs#cubefromstringstr"
              target="_blank"
              rel="noreferrer"
            >
              string of current facelets
            </a>{' '}
            from <code>getFacelets()</code> exported module
          </li>
        </ul>
      </ul>
      <li>next steps:</li>
      <ul>
        <li>add proper error handline</li>
        <li>develop my own backend solve function</li>
      </ul>
    </ul>
  )
}
