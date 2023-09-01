import { Stack, Button, Tooltip, Box, Typography } from "@mui/material"
import { useRouter } from "next/router"
import React from "react"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import { LandingPageContext } from "@/context/landingPage"
import { useSession } from "next-auth/react"
import { useCachedSignin } from "@/hooks/useCachedSignin"

export const TopComponents: React.FC = () => {
  const router = useRouter()
  const session = useSession()
  const { routeToSignin } = useCachedSignin()

  const tooltipTitle = (HEADSHOT_SRC?: string) => {
    if (session.status === "unauthenticated")
      return (
        <Stack direction="row" columnGap={1}>
          <Typography>please</Typography>
          <Typography
            onClick={() => routeToSignin()}
            sx={{
              ":hover": {
                cursor: "pointer",
              },
              color: "#0000ee",
              textDecoration: "underline",
            }}
          >
            sign in
          </Typography>
          <Typography>before checking out</Typography>
        </Stack>
      )
    else if (!HEADSHOT_SRC) return "Please upload your headshot before checking out"
    return ""
  }

  return (
    <Stack flexDirection="row" justifyContent="space-between" width="100%">
      <Button
        startIcon={<ChevronLeftIcon />}
        variant="contained"
        onClick={() => router.push("/products/landing-page")}
        sx={{ ml: 5 }}
      >
        return to products
      </Button>
      <LandingPageContext.Consumer>
        {({ HEADSHOT_SRC }) => (
          <Tooltip title={tooltipTitle(HEADSHOT_SRC)}>
            <Box component="span">
              <Button
                variant="contained"
                sx={{ mr: 5 }}
                onClick={() => router.push("set-password")}
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
