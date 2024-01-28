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
  BACKGROUND_IMAGE: 'https://spenpo-landing.s3.amazonaws.com/default-background.svg',
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
