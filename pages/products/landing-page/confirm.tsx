import React from "react"
import { Button, Stack } from "@mui/material"
import { useRouter } from "next/router"

const Confirm: React.FC = () => {
  const router = useRouter()

  return (
    <Stack rowGap={1} m={5}>
      <Button onClick={() => router.push(`${router.pathname.split("/confirm")[0]}?mysites=1`)} variant="contained">
        View all sites
      </Button>
    </Stack>
  )
}

export default Confirm
