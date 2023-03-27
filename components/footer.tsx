import Image from "next/image"
import Link from "next/link"
import github from "../public/images/github.svg"
import twitter from "../public/images/twitter.svg"
import youtube from "../public/images/youtube.svg"
import wordpress from "../public/images/wordpress.svg"
import twitch from "../public/images/twitch.svg"
import mail from "../public/images/mail.svg"
import { Box } from "@mui/material"

export default function Footer() {
  return (
    <Box component="footer">
      <Box component="ul">
        <Box component="li">
          <Link href="https://github.com/spope851" target="_blank" rel="noreferrer">
            <Image src={github} width={30} height={30} alt="github" />
          </Link>
        </Box>
        <Box component="li">
          <Link href="mailto:spenpo@spenpo.com" target="_blank" rel="noreferrer">
            <Image src={mail} width={30} height={30} alt="mail" />
          </Link>
        </Box>
        <Box component="li">
          <Link href="https://twitter.com/s_pop3" target="_blank" rel="noreferrer">
            <Image src={twitter} width={30} height={30} alt="twitter" />
          </Link>
        </Box>
        <Box component="li">
          <Link
            href="https://www.youtube.com/@spope"
            target="_blank"
            rel="noreferrer"
          >
            <Image src={youtube} width={30} height={30} alt="youtube" />
          </Link>
        </Box>
        <Box component="li">
          <Link
            href="https://www.introspective20s.com"
            target="_blank"
            rel="noreferrer"
          >
            <Image src={wordpress} width={30} height={30} alt="blog" />
          </Link>
        </Box>
        <Box component="li">
          <Link href="https://www.twitch.tv/spenpo" target="_blank" rel="noreferrer">
            <Image
              src={twitch}
              width={30}
              height={30}
              alt="twitch"
              style={{ borderRadius: "25px" }}
            />
          </Link>
        </Box>
      </Box>
      <Box id="copyright">
        <Box component="span">© 2023 Spencer Pope</Box>
      </Box>
    </Box>
  )
}
