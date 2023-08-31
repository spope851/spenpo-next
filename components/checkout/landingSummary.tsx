import React, { useContext } from "react"
import { Box, Chip, Stack, Typography } from "@mui/material"
import { ShoppingCartContext } from "@/context/shoppingCart"
import { DEFAULT_PROPS } from "@/components/landingPage/constants"

const ColorExample: React.FC<{ color: string; opacity?: number }> = ({
  color,
  opacity = 1,
}) => {
  return (
    <Box
      height={20}
      width={80}
      bgcolor={color}
      sx={{ opacity }}
      border="solid 1px #555"
      borderRadius={1}
    />
  )
}

const BgImage: React.FC<{ src: string; opacity?: number }> = ({
  src,
  opacity = 1,
}) => {
  return (
    <Box
      height={200}
      width={200}
      m="2px"
      sx={{
        backgroundImage: `url(${src})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        opacity,
      }}
      borderRadius={2}
      border="solid 1px #555"
    />
  )
}

export const LandingSummary: React.FC = () => {
  const { landingCms } = useContext(ShoppingCartContext)

  return (
    <Stack direction="row" columnGap={10}>
      <Stack rowGap={1}>
        <Stack direction="row" justifyContent="space-between">
          <Typography>Headshot:</Typography>
          <BgImage src={landingCms.headshotSrc.getter()!} />
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography>Name:</Typography>
          <Typography>{landingCms.name.getter()}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography>Title:</Typography>
          <Typography>{landingCms.title.getter()}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography>Subtitle:</Typography>
          <Typography>{landingCms.subtitle.getter()}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography>Action Statement:</Typography>
          <Typography>{landingCms.actionStatement.getter()}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography>Action Destination:</Typography>
          <Typography>{landingCms.actionDestination.getter()}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography>Link to:</Typography>
          <Typography>
            {landingCms.linkNewTab.getter() ? "New Tab" : "Same Tab"}
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography>Social URLs:</Typography>
          <Stack rowGap={1}>
            {landingCms.socialUrls.getter()?.map((social) => (
              <Chip key={social} label={social} />
            ))}
          </Stack>
        </Stack>
        <Stack direction="row" justifyContent="space-between" columnGap={5}>
          <Typography>Background Image:</Typography>
          <BgImage
            src={
              landingCms.backgroundImage.getter() || DEFAULT_PROPS.BACKGROUND_IMAGE
            }
          />
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography>Background Color:</Typography>
          <ColorExample
            color={
              landingCms.backgroundColor.getter() || DEFAULT_PROPS.BACKGROUND_COLOR
            }
          />
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography>Accent Color:</Typography>
          <ColorExample
            color={landingCms.accentColor.getter() || DEFAULT_PROPS.ACCENT_COLOR}
          />
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography>Secondary Accent Color:</Typography>
          <ColorExample
            color={
              landingCms.secondaryAccentColor.getter() ||
              DEFAULT_PROPS.SECONDARY_ACCENT_COLOR
            }
          />
        </Stack>
      </Stack>
    </Stack>
  )
}
