import React from "react"
import { Landing } from "@/components/landing"
import { useRouter } from "next/router"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import { Button } from "@mui/material"

export default function Home() {
  const router = useRouter()
  return (
    <Landing
      title="investor & entrepreneur"
      name="Spencer Pope"
      subtitle="Building an unconventional life"
      socialUrls={[
        "https://twitter.com/s_pop3",
        "https://github.com/spope851",
        "mailto:spenpo@spenpo.com",
        "https://www.youtube.com/@spope",
        "https://www.twitch.tv/spenpo",
      ]}
      headshotSrc="/images/headshot.jpeg"
      actionClick={() => router.push("/landing-demo")}
      actionText="get a landing page like this one"
      navigateAway={
        <Button
          endIcon={<ChevronRightIcon />}
          variant="contained"
          onClick={() => router.push("/home")}
          sx={{ ml: "auto", mr: 5 }}
        >
          continue to spenpo.com
        </Button>
      }
    />
  )
}
