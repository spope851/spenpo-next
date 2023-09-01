import { BgImage } from "@/components/bgImage"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Button, Stack, Typography } from "@mui/material"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"

const LandingPageProduct: React.FC = () => {
  const router = useRouter()
  const session = useSession()
  return (
    <Stack m={5} rowGap={3}>
      <Stack direction="row" justifyContent="space-between">
        <Breadcrumbs />
        {session.status === "authenticated" && (
          <Typography>
            <Link href="/products/landing-page/my-sites">click here</Link> to view
            your sites
          </Typography>
        )}
      </Stack>
      <Stack m="auto" direction="row" columnGap={5}>
        <BgImage src="/images/landing-page.png" height={400} width={800} />
        <Button
          href={`${router.pathname}/design`}
          variant="contained"
          sx={{ m: "auto" }}
        >
          design now
        </Button>
      </Stack>
    </Stack>
  )
}

export default LandingPageProduct
