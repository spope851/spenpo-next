import Link from "next/link"
import Github from "@/images/svg/github.svg"
import Twitter from "@/images/svg/twitter.svg"
import Youtube from "@/images/svg/youtube.svg"
import Wordpress from "@/images/svg/wordpress.svg"
import Twitch from "@/images/svg/twitch.svg"
import Mail from "@/images/svg/mail.svg"
import { Stack, SvgIcon, Typography } from "@mui/material"

const socials = [
  { href: "https://github.com/spope851", icon: Github },
  { href: "mailto:spenpo@spenpo.com", icon: Mail },
  { href: "https://twitter.com/s_pop3", icon: Twitter },
  { href: "https://www.youtube.com/@spope", icon: Youtube },
  { href: "https://www.introspective20s.com", icon: Wordpress },
  { href: "https://www.twitch.tv/spenpo", icon: Twitch },
]

export default function Footer() {
  return (
    <Stack
      component="footer"
      direction="row"
      bgcolor="#555"
      justifyContent="space-evenly"
      alignItems="center"
      mt="auto"
      py={3}
    >
      <Stack direction="row" gap={1}>
        {socials.map(({ href, icon: Icon }) => (
          <Link key={href} href={href} target="_blank" rel="noreferrer">
            <SvgIcon sx={{ height: 30, width: 30, borderRadius: "25px" }}>
              <Icon />
            </SvgIcon>
          </Link>
        ))}
      </Stack>
      <Typography
        color="white"
        display={{ xs: "none", sm: "block" }}
        component="span"
      >
        © 2023 Spencer Pope
      </Typography>
    </Stack>
  )
}
