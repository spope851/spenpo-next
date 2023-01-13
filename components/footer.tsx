import Image from "next/image"
import Link from "next/link"
import github from "../public/images/github.svg"
import twitter from "../public/images/twitter.svg"
import youtube from "../public/images/youtube.svg"
import wordpress from "../public/images/wordpress.svg"
import twitch from "../public/images/twitch.svg"

export default function Footer() {
  return (
    <footer>
      <ul>
        <li>
          <Link href="https://github.com/spope851" target="_blank" rel="noreferrer">
            <Image src={github} width={30} height={30} alt="github" />
          </Link>
        </li>
        <li>
          <Link href="https://twitter.com/s_pop3" target="_blank" rel="noreferrer">
            <Image src={twitter} width={30} height={30} alt="twitter" />
          </Link>
        </li>
        <li>
          <Link
            href="https://www.youtube.com/@spope"
            target="_blank"
            rel="noreferrer"
          >
            <Image src={youtube} width={30} height={30} alt="youtube" />
          </Link>
        </li>
        <li>
          <Link
            href="https://www.introspective20s.com"
            target="_blank"
            rel="noreferrer"
          >
            <Image src={wordpress} width={30} height={30} alt="blog" />
          </Link>
        </li>
        <li>
          <Link href="https://www.twitch.tv/spenpo" target="_blank" rel="noreferrer">
            <Image src={twitch} width={30} height={30} alt="blog" />
          </Link>
        </li>
      </ul>
      <div id="copyright">
        <span>© 2022 Spencer Pope</span>
      </div>
    </footer>
  )
}
