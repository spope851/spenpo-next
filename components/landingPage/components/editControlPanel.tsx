import { ColorPicker } from "@/components/colorPicker"
import { LandingPageContext } from "@/context/landingPage"
import { Box, Drawer, IconButton, Stack, TextField, Tooltip } from "@mui/material"
import React, { useContext, useState } from "react"
import VisibilityIcon from "@mui/icons-material/Visibility"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import WallpaperIcon from "@mui/icons-material/Wallpaper"
import EditOffIcon from "@mui/icons-material/EditOff"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/DeleteOutlined"
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined"
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown"

const VisibilityControl: React.FC = () => {
  const {
    hideButtons: [hideButtons, setHideButtons],
  } = useContext(LandingPageContext)

  return (
    <Tooltip title={`${hideButtons ? "show" : "hide"} extra buttons`}>
      <IconButton
        sx={{ position: "absolute", right: 0 }}
        onClick={() => setHideButtons(!hideButtons)}
      >
        {hideButtons ? <VisibilityOffIcon /> : <VisibilityIcon />}
      </IconButton>
    </Tooltip>
  )
}

const EditControl: React.FC = () => {
  const { editable } = useContext(LandingPageContext)

  return (
    <Tooltip title={editable?.[0] ? "preview" : "edit"}>
      <IconButton
        sx={{
          position: "absolute",
          right: 40,
          ml: { xs: "auto" },
        }}
        onClick={() => editable?.[1](!editable[0])}
      >
        {editable?.[0] ? <EditIcon /> : <EditOffIcon />}
      </IconButton>
    </Tooltip>
  )
}

const ContentControl: React.FC = () => {
  const {
    cms,
    editable,
    BACKGROUND_COLOR,
    ACCENT_COLOR,
    SECONDARY_ACCENT_COLOR,
    hideNewBackground: [hideNewBackground, setHideNewBackground],
    newBackground: [newBackground, setNewBackground],
  } = useContext(LandingPageContext)
  return (
    <>
      {cms && editable && (
        <Stack
          direction={{ xl: "row", lg: "row", md: "row" }}
          sx={{
            position: {
              xl: "absolute",
              lg: "absolute",
              md: "absolute",
              sm: "absolute",
              xs: "block",
            },
            display: editable[0] ? "flex" : "none",
          }}
          mt={1}
          ml={1}
          mb={{ xs: 1 }}
          rowGap={2}
          alignItems={{ md: "center", sm: "flex-start" }}
        >
          <Stack
            direction={{ xl: "row", lg: "row", md: "row", sm: "row" }}
            columnGap={2}
            rowGap={2}
          >
            <ColorPicker
              label="Background Color"
              color={[BACKGROUND_COLOR, cms.backgroundColor.setter]}
              defaultColor="#E6E1DF"
              sx={{ mr: "auto" }}
            />
            <ColorPicker
              label="Accent Color"
              color={[ACCENT_COLOR, cms.accentColor.setter]}
              defaultColor="#325D80"
              sx={{ mr: "auto" }}
            />
            <ColorPicker
              label="Secondary Color"
              color={[SECONDARY_ACCENT_COLOR, cms.secondaryAccentColor.setter]}
              defaultColor="#5FA052"
              sx={{ mr: "auto" }}
            />
          </Stack>
          <Stack direction="row" columnGap={2}>
            <Tooltip title="change background image">
              <IconButton onClick={() => setHideNewBackground(!hideNewBackground)}>
                <WallpaperIcon />
              </IconButton>
            </Tooltip>
            <TextField
              sx={{ display: hideNewBackground ? "none" : "flex" }}
              fullWidth
              size="small"
              label="Background Image Url"
              value={newBackground}
              onChange={(e) => setNewBackground(e.target.value)}
            />
            <IconButton
              sx={{ my: "auto", display: hideNewBackground ? "none" : "flex" }}
              onClick={() => {
                cms?.backgroundImage.setter(newBackground)
                setHideNewBackground(true)
                setNewBackground("")
              }}
            >
              {newBackground ? <CheckCircleOutlinedIcon /> : <DeleteIcon />}
            </IconButton>
          </Stack>
        </Stack>
      )}
    </>
  )
}

export const EditControlPanel: React.FC = () => {
  const [open, setOpen] = useState(false)
  const { editable } = useContext(LandingPageContext)
  return (
    <>
      <Box
        display={{ xl: "block", lg: "block", md: "block", sm: "block", xs: "none" }}
      >
        <ContentControl />
      </Box>
      <Box
        display={
          editable?.[0] ? { xl: "none", lg: "none", md: "none", sm: "none" } : "none"
        }
      >
        <IconButton onClick={() => setOpen(true)} sx={{ position: "absolute" }}>
          <KeyboardDoubleArrowDownIcon />
        </IconButton>
        <Drawer anchor="top" open={open} onClose={() => setOpen(false)}>
          <ContentControl />
        </Drawer>
      </Box>
      {editable && (
        <>
          <VisibilityControl />
          <EditControl />
        </>
      )}
    </>
  )
}
