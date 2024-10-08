'use client'
import { SpenpoLanding, SpenpoLandingCache, SpenpoLandingCms } from 'spenpo-landing'
import React, { ReactNode, useContext, useEffect, useMemo, useState } from 'react'
import {
  Autocomplete,
  Button,
  Checkbox,
  Chip,
  Grid,
  InputLabel,
  Stack,
  TextField,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { BgImage } from '@/app/components/BgImage'
import { CustomizeThemeContext } from '@/app/context/theme'
import { DEFAULT_LANDING_PROPS } from '@/app/products/landing-page/design/components/CMS'

const SPENPO_LANDING_WIDTH_DESKTOP = 880
const LAPTOP_WIDTH = 1200

const DESKTOP_SX = {
  aspectRatio: 5 / 3,
  width: LAPTOP_WIDTH,
  main: {
    minHeight: 'unset',
    width: SPENPO_LANDING_WIDTH_DESKTOP,
    height: 560,
    mx: 'auto',
    mt: '5%',
    borderRadius: 2,
    '#spenpo-landing-headshot': {
      height: 300,
    },
  },
  '#spenpo-landing-editControlPanel': {
    position: 'relative',
    width: SPENPO_LANDING_WIDTH_DESKTOP,
    mt: 7,
    mx: `${(LAPTOP_WIDTH - SPENPO_LANDING_WIDTH_DESKTOP) / 2}px`,
  },
}

const SPENPO_LANDING_WIDTH_MOBILE = 290
const IPHONE_WIDTH = 320

const MOBILE_SX = {
  aspectRatio: 1 / 2,
  width: IPHONE_WIDTH,
  my: 1,
  main: {
    minHeight: 'unset',
    width: SPENPO_LANDING_WIDTH_MOBILE,
    height: 615,
    mx: 'auto',
    mt: 1.5,
    borderRadius: 9,
    overflowY: 'scroll',
  },
  '#spenpo-landing-editControlPanel': {
    width: SPENPO_LANDING_WIDTH_MOBILE,
    mt: 2,
    mx: `${(IPHONE_WIDTH - SPENPO_LANDING_WIDTH_MOBILE) / 2}px`,
  },
  '#spenpo-landing-wrapper': {
    mt: 24,
  },
}

const GRID_ITEM_PROPS = {
  item: true,
  xs: 12,
  sm: 6,
  md: 3,
}

const TEXTFIELD_PROPS: { fullWidth: boolean; size: 'small' } = {
  fullWidth: true,
  size: 'small',
}

export const SpenpoLandingDemo: React.FC = () => {
  const [title, setTitle] = useState<string | undefined>(DEFAULT_LANDING_PROPS.title)
  const [name, setName] = useState<string | undefined>(DEFAULT_LANDING_PROPS.name)
  const [subtitle, setSubtitle] = useState<string | undefined>(
    DEFAULT_LANDING_PROPS.subtitle
  )
  const [actionStatement, setActionStatement] = useState<string | undefined>(
    DEFAULT_LANDING_PROPS.actionStatement
  )
  const [actionDestination, setActionDestination] = useState<string | undefined>(
    DEFAULT_LANDING_PROPS.actionDestination
  )
  const [accentColor, setAccentColor] = useState<string>()
  const [secondaryAccentColor, setSecondaryAccentColor] = useState<string>()
  const [backgroundColor, setBackgroundColor] = useState<string>()
  const [backgroundImage, setBackgroundImage] = useState<string>()
  const [headshotSrc, setHeadshotSrc] = useState<string | undefined>(
    DEFAULT_LANDING_PROPS.headshotSrc
  )
  const [socialUrls, setSocialUrls] = useState<string[] | undefined>(
    DEFAULT_LANDING_PROPS.socialUrls.slice(0, 4)
  )
  const [editable, setEditable] = useState(false)
  const [headshotFile, setHeadshotFile] = useState<File>()

  const cms: SpenpoLandingCms = {
    title: {
      getter: () => title,
      setter: (prop) => setTitle(prop),
    },
    name: {
      getter: () => name,
      setter: (prop) => setName(prop),
    },
    subtitle: {
      getter: () => subtitle,
      setter: (prop) => setSubtitle(prop),
    },
    actionStatement: {
      getter: () => actionStatement,
      setter: (prop) => setActionStatement(prop),
    },
    actionDestination: {
      getter: () => actionDestination,
      setter: (prop) => setActionDestination(prop),
    },
    accentColor: {
      getter: () => accentColor,
      setter: (prop) => setAccentColor(prop),
    },
    secondaryAccentColor: {
      getter: () => secondaryAccentColor,
      setter: (prop) => setSecondaryAccentColor(prop),
    },
    backgroundColor: {
      getter: () => backgroundColor,
      setter: (prop) => setBackgroundColor(prop),
    },
    backgroundImage: {
      getter: () => backgroundImage,
      setter: (prop) => setBackgroundImage(prop),
    },
    headshotSrc: {
      getter: () => headshotSrc,
      setter: (prop) => setHeadshotSrc(prop),
    },
    socialUrls: {
      getter: () => socialUrls,
      setter: (prop) => setSocialUrls(prop || []),
    },
    headshotFile: {
      getter: () => headshotFile,
      setter: (prop) => setHeadshotFile(prop),
    },
  }

  const [topComponents, setTopComponents] = useState<ReactNode>()
  const [editableEnabled, setEditableEnabled] = useState(false)
  const [cacheCallbackEnabled, setCacheCallbackEnabled] = useState(false)

  const cacheCallback = async (cache: SpenpoLandingCache) => {
    if (cacheCallbackEnabled)
      alert(`the following data was cached:  ${JSON.stringify(cache, undefined, 2)}`)
  }

  const { setMuiDrawerStyleOverrides } = useContext(CustomizeThemeContext)

  useEffect(() => {
    document
      .getElementById('spenpo-landing-contentControl-open-btn')
      ?.addEventListener('click', () => {
        setMuiDrawerStyleOverrides({
          '&#spenpo-landing-contentControl-mobile': {
            '& .MuiPaper-root': {
              width: 290,
              margin: `${182 - window.scrollY}px auto 0`,
              borderRadius: '36px 36px 0 0',
              transition: 'none !important',
            },
          },
        })
      })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))

  const Demo = useMemo(
    () => (
      <SpenpoLanding
        {...{
          title,
          name,
          subtitle,
          actionStatement,
          actionDestination,
          accentColor,
          secondaryAccentColor,
          backgroundColor,
          backgroundImage,
          headshotSrc,
          socialUrls,
          topComponents,
          editable: editableEnabled ? [editable, setEditable] : undefined,
          cms,
          cacheCallback,
        }}
      />
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      title,
      name,
      subtitle,
      actionStatement,
      actionDestination,
      accentColor,
      secondaryAccentColor,
      backgroundColor,
      backgroundImage,
      headshotSrc,
      socialUrls,
      topComponents,
      editable,
      editableEnabled,
      cacheCallbackEnabled,
    ]
  )

  return (
    <Stack gap={3}>
      <BgImage
        src={`/images/${isSmallScreen ? 'iphone' : 'laptop'}.png`}
        sx={{
          mx: 'auto',
          ...(isSmallScreen ? MOBILE_SX : DESKTOP_SX),
        }}
      >
        {Demo}
      </BgImage>
      <Grid container spacing={1} p={1}>
        <Grid {...GRID_ITEM_PROPS}>
          <TextField
            {...TEXTFIELD_PROPS}
            label="title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </Grid>
        <Grid {...GRID_ITEM_PROPS}>
          <TextField
            {...TEXTFIELD_PROPS}
            label="name"
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        <Grid {...GRID_ITEM_PROPS}>
          <TextField
            {...TEXTFIELD_PROPS}
            label="subtitle"
            onChange={(e) => setSubtitle(e.target.value)}
          />
        </Grid>
        <Grid {...GRID_ITEM_PROPS}>
          <TextField
            {...TEXTFIELD_PROPS}
            label="actionStatement"
            onChange={(e) => setActionStatement(e.target.value)}
          />
        </Grid>
        <Grid {...GRID_ITEM_PROPS}>
          <TextField
            {...TEXTFIELD_PROPS}
            label="actionDestination"
            placeholder="https://spenpo.com"
            onChange={(e) => setActionDestination(e.target.value)}
          />
        </Grid>
        <Grid {...GRID_ITEM_PROPS}>
          <TextField
            {...TEXTFIELD_PROPS}
            label="accentColor"
            placeholder="#00BB55"
            onChange={(e) => setAccentColor(e.target.value)}
          />
        </Grid>
        <Grid {...GRID_ITEM_PROPS}>
          <TextField
            {...TEXTFIELD_PROPS}
            label="secondaryAccentColor"
            placeholder="#00BB55"
            onChange={(e) => setSecondaryAccentColor(e.target.value)}
          />
        </Grid>
        <Grid {...GRID_ITEM_PROPS}>
          <TextField
            {...TEXTFIELD_PROPS}
            label="backgroundColor"
            placeholder="#00BB55"
            onChange={(e) => setBackgroundColor(e.target.value)}
          />
        </Grid>
        <Grid {...GRID_ITEM_PROPS}>
          <TextField
            {...TEXTFIELD_PROPS}
            label="backgroundImage"
            placeholder="https://..."
            onChange={(e) => setBackgroundImage(e.target.value)}
          />
        </Grid>
        <Grid {...GRID_ITEM_PROPS}>
          <TextField
            {...TEXTFIELD_PROPS}
            label="headshotSrc"
            placeholder="https://..."
            onChange={(e) => setHeadshotSrc(e.target.value)}
          />
        </Grid>
        <Grid {...GRID_ITEM_PROPS} sm={12} md={6}>
          <Autocomplete
            size="small"
            multiple
            freeSolo
            renderInput={(params) => (
              <TextField
                {...params}
                {...TEXTFIELD_PROPS}
                label="socialUrls"
                placeholder="https://www.twitter.com/..."
              />
            )}
            onChange={(_, value) => setSocialUrls(value)}
            options={[]}
            defaultValue={[] as string[]}
            renderTags={(tagValue, getTagProps) => {
              return tagValue.map((option, index) => (
                <Chip
                  sx={{ height: 24 }}
                  {...getTagProps({ index })}
                  key={option}
                  label={option}
                />
              ))
            }}
          />
        </Grid>
        <Grid {...GRID_ITEM_PROPS}>
          <Stack direction="row" alignItems="center">
            <InputLabel>topComponents?</InputLabel>
            <Checkbox
              checked={!!topComponents}
              onChange={(e) => {
                if (e.target.checked) {
                  setTopComponents(
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => {
                        setTopComponents(undefined)
                      }}
                      sx={{
                        position: { xs: 'absolute', md: 'relative' },
                        mb: { xs: 72, md: 0 },
                        ml: { xs: 0, md: 84 },
                      }}
                    >
                      click to remove
                    </Button>
                  )
                } else {
                  setTopComponents(undefined)
                }
              }}
            />
          </Stack>
        </Grid>
        <Grid {...GRID_ITEM_PROPS}>
          <Stack direction="row" alignItems="center">
            <InputLabel>editable?</InputLabel>
            <Checkbox
              checked={!!editableEnabled}
              onChange={(e) => setEditableEnabled(e.target.checked)}
            />
          </Stack>
        </Grid>
        <Grid {...GRID_ITEM_PROPS}>
          <Stack direction="row" alignItems="center">
            <InputLabel>cacheCallback?</InputLabel>
            <Checkbox
              checked={!!cacheCallbackEnabled}
              onChange={(e) => setCacheCallbackEnabled(e.target.checked)}
            />
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  )
}
