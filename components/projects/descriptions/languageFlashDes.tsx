export default function LanguageFlashDes() {
  return (
    <ul>
      <li>description: flashcards for studying a new language</li>
      <ul>
        <li>choose how many words to study at a time</li>
        <li>
          choose how many times you must get the definition right before moving on
        </li>
        <li>I&apos;ve supplied it with data on Mandarin Chinese for this demo</li>
        <ul>
          <li>
            you can pass in data on any language you&apos;re able to get it for
            through props. just import the{" "}
            <a
              href="https://www.npmjs.com/package/language-flash"
              target="_blank"
              rel="noreferrer"
            >
              npm package
            </a>
          </li>
        </ul>
      </ul>
      <li>
        <a
          href="https://github.com/spope851/language-flash"
          target="_blank"
          rel="noreferrer"
        >
          github
        </a>
      </li>
      <li>
        <a
          href="https://twitter.com/s_pop3/status/1547753107668381696"
          target="_blank"
          rel="noreferrer"
        >
          tweet storm
        </a>
      </li>
      <li>architecture:</li>
      <ul>
        <li>
          <strong>data</strong>: 906 most common Mandarin words found{" "}
          <a
            href="https://en.wiktionary.org/wiki/Appendix:Mandarin_Frequency_lists/1-1000"
            target="_blank"
            rel="noreferrer"
          >
            here
          </a>
        </li>
        <ul>
          <li>
            <a
              href="https://github.com/spope851/meDotCom/blob/main/postgres/scraper/mandarin.py"
              target="_blank"
              rel="noreferrer"
            >
              python web scraper
            </a>{" "}
            built with{" "}
            <a
              href="https://www.crummy.com/software/BeautifulSoup/bs4/doc/"
              target="_blank"
              rel="noreferrer"
            >
              bs4
            </a>
          </li>
          <li>
            integration through the following{" "}
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
          <strong>storage</strong>:{" "}
          <a href="https://www.postgresql.org/" target="_blank" rel="noreferrer">
            postgres
          </a>
        </li>
        <li>
          <strong>backend</strong>:{" "}
          <a href="https://nodejs.org/en/" target="_blank" rel="noreferrer">
            node
          </a>
        </li>
        <li>
          <strong>ui</strong>:{" "}
          <a href="https://svelte.dev" target="_blank" rel="noreferrer">
            svelte
          </a>
        </li>
      </ul>
    </ul>
  )
}
