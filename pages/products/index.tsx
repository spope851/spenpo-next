import { BgImage } from "@/components/bgImage"
import { Button, Stack } from "@mui/material"
import { useRouter } from "next/router"
import React from "react"

const Products: React.FC = () => {
  const router = useRouter()
  return (
    <Stack m={5} rowGap={3}>
      <Stack border="solid 2px" borderRadius={1} direction="row">
        <BgImage src="/images/landing-page.png" width={600} height={300} />
        <Stack rowGap={1}>
          <Button href={`${router.pathname}/landing-page`} variant="contained">
            view details
          </Button>
          <Button
            href={`${router.pathname}/landing-page/design`}
            variant="contained"
          >
            design now
          </Button>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Products
