import React from 'react'

export const FileFeedDes: React.FC = () => {
  return (
    <ul>
      <li>
        description: a feed of files stored in my{' '}
        <a href="https://pope.love/pub" target="_blank" referrerPolicy="no-referrer">
          public sharing directory
        </a>{' '}
        . It integrates relevant metadata like file size, type, and date last
        modified. It integrates user generated data like description text and the
        option to make content private. It also supports capabilities like viewing
        the file in your browser and downloading a copy to your computer. Posts can
        be sorted by date.
      </li>
      <li>
        <strong>for now, this project is closed source.</strong>
      </li>
      <li>architecture:</li>
      <ul>
        <li>
          <strong>data</strong>:
          <ul>
            <li>
              filenames are referenced in a{' '}
              <a href="https://www.php.net/" target="_blank" rel="noreferrer">
                PHP
              </a>{' '}
              array where all other user generated data is hard coded. After
              uploading new files, they must be manually added to the array before
              they show up in the feed.
            </li>
            <li>
              <strong>name</strong> is the only required field for each file.
            </li>
            <li>
              PHP loops through the array and serves the parsed data as{' '}
              <a
                href="https://en.wikipedia.org/wiki/XML"
                target="_blank"
                rel="noreferrer"
              >
                XML
              </a>
              .
            </li>
          </ul>
        </li>
        <li>
          <strong>ui</strong>:{' '}
          <a
            href="https://en.wikipedia.org/wiki/XSLT"
            target="_blank"
            rel="noreferrer"
          >
            XSLT
          </a>
          <ul>
            <li>the stylesheet conditionally renders the XML data.</li>
            <li>
              sorting is enabled through{' '}
              <a
                href="https://en.wikipedia.org/wiki/JavaScript"
                target="_blank"
                rel="noreferrer"
              >
                JavaScript
              </a>
              .
            </li>
          </ul>
        </li>
      </ul>
      <li>next steps:</li>
      <ul>
        <li>enable remote posting via the UI.</li>
        <li>open source the code and publicize self-hosted social media.</li>
      </ul>
    </ul>
  )
}
