'use client'
import React, { ReactNode, useContext } from 'react'
import { Box, Chip, Divider, Stack, Typography } from '@mui/material'
import { ShoppingCartContext } from '../../../../context/shoppingCart'
import { BgImage } from '../../../../components/bgImage'

const BG_SX = {
  height: 200,
  width: 200,
  borderRadius: 2,
  border: 'solid 1px #555',
  m: '2px',
}

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

const SummaryRow: React.FC<{ children: ReactNode }> = ({ children }) => (
  <>
    <Stack
      columnGap={{ xs: 5, sm: 10, md: 15 }}
      direction="row"
      justifyContent="space-between"
    >
      {children}
    </Stack>
    <Divider flexItem />
  </>
)

const DEFAULT_PROPS = {
  BACKGROUND_COLOR: '#E6E1DF',
  BACKGROUND_IMAGE:
    'data:image/svg+xml;charset=utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20512%20512%22%20width%3D%22512%22%20height%3D%22512%22%20preserveAspectRatio%3D%22none%22%3E%20%3Cstyle%3E%20path%20%7B%20fill%3A%20none%3B%20stroke-width%3A%201.01px%3B%20stroke%3A%20rgba(0,0,0,0.09)%3B%20vector-effect%3A%20non-scaling-stroke%3B%20%7D,20%3C%2Fstyle%3E%20%3Cpath%20d%3D%22M448%2C512c0-128-128-128-128-256S448%2C128%2C448%2C0%22%20%2F%3E%20%3Cpath%20d%3D%22M192%2C512c0-128-128-128-128-256S192%2C128%2C192%2C0%22%20%2F%3E%3C%2Fsvg%3E',
  ACCENT_COLOR: '#4f86f7',
  SECONDARY_ACCENT_COLOR: '#5FA052',
}

export const LandingSummary: React.FC = () => {
  const { landingCms, domainName } = useContext(ShoppingCartContext)

  return (
    <Stack rowGap={1}>
      <SummaryRow>
        <Typography>Domain:</Typography>
        <Typography>{domainName[0]}</Typography>
      </SummaryRow>
      <SummaryRow>
        <Typography>Headshot:</Typography>
        <BgImage src={landingCms.headshotSrc.getter()!} sx={BG_SX} />
      </SummaryRow>
      <SummaryRow>
        <Typography>Name:</Typography>
        <Typography>{landingCms.name.getter()}</Typography>
      </SummaryRow>
      <SummaryRow>
        <Typography>Title:</Typography>
        <Typography>{landingCms.title.getter()}</Typography>
      </SummaryRow>
      <SummaryRow>
        <Typography>Subtitle:</Typography>
        <Typography>{landingCms.subtitle.getter()}</Typography>
      </SummaryRow>
      <SummaryRow>
        <Typography>Action Statement:</Typography>
        <Typography>{landingCms.actionStatement.getter()}</Typography>
      </SummaryRow>
      <SummaryRow>
        <Typography>Action Destination:</Typography>
        <Typography>{landingCms.actionDestination.getter()}</Typography>
      </SummaryRow>
      <SummaryRow>
        <Typography>Social URLs:</Typography>
        <Stack rowGap={1}>
          {landingCms.socialUrls.getter()?.map((social) => (
            <Chip key={social} label={social} />
          ))}
        </Stack>
      </SummaryRow>
      <SummaryRow>
        <Typography>Background Image:</Typography>
        <BgImage
          sx={BG_SX}
          src={landingCms.backgroundImage.getter() || DEFAULT_PROPS.BACKGROUND_IMAGE}
        />
      </SummaryRow>
      <SummaryRow>
        <Typography>Background Color:</Typography>
        <ColorExample
          color={
            landingCms.backgroundColor.getter() || DEFAULT_PROPS.BACKGROUND_COLOR
          }
        />
      </SummaryRow>
      <SummaryRow>
        <Typography>Accent Color:</Typography>
        <ColorExample
          color={landingCms.accentColor.getter() || DEFAULT_PROPS.ACCENT_COLOR}
        />
      </SummaryRow>
      <SummaryRow>
        <Typography>Secondary Accent Color:</Typography>
        <ColorExample
          color={
            landingCms.secondaryAccentColor.getter() ||
            DEFAULT_PROPS.SECONDARY_ACCENT_COLOR
          }
        />
      </SummaryRow>
    </Stack>
  )
}
