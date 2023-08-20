import { Stack, Button, Tooltip, Box } from "@mui/material"
import { useRouter } from "next/router"
import React from "react"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import { LandingPageContext } from "@/context/landingPage"

export const TopComponents: React.FC = () => {
  const router = useRouter()

  return (
    <Stack flexDirection="row" justifyContent="space-between" width="100%">
      <Button
        startIcon={<ChevronLeftIcon />}
        variant="contained"
        onClick={() => router.push("/home")}
        sx={{ ml: 5 }}
      >
        return to spenpo.com
      </Button>
      <LandingPageContext.Consumer>
        {({ HEADSHOT_SRC }) => (
          <Tooltip
            title={
              HEADSHOT_SRC ? "" : "Please upload your headshot before checking out"
            }
          >
            <Box component="span">
              <Button
                variant="contained"
                sx={{ mr: 5 }}
                onClick={() => router.push("/checkout")}
                endIcon={<ChevronRightIcon />}
                disabled={!HEADSHOT_SRC}
              >
                add to cart
              </Button>
            </Box>
          </Tooltip>
        )}
      </LandingPageContext.Consumer>
    </Stack>
  )
}
