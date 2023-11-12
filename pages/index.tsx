import React from "react"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import { Button } from "@mui/material"
import Landing from "@/components/landingPage"

const Home: React.FC = () => {
  return (
    <Landing
      title="developer & entrepreneur"
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
      actionDestination="contact"
      actionStatement="email me"
      linkNewTab={true}
      topComponents={
        <Button
          endIcon={<ChevronRightIcon />}
          variant="contained"
          href="/home"
          sx={{ ml: "auto", mr: 5, mt: 5 }}
        >
          continue to spenpo.com
        </Button>
      }
    />
  )
}

export default Home
