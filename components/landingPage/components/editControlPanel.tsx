import { IconButton, Stack, TextField, Tooltip } from "@mui/material"
import React, { useContext } from "react"
import { ColorPicker } from "@/components/colorPicker"
import VisibilityIcon from "@mui/icons-material/Visibility"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import WallpaperIcon from "@mui/icons-material/Wallpaper"
import EditOffIcon from "@mui/icons-material/EditOff"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/DeleteOutlined"
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined"
import { LandingPageContext } from "@/context/landingPage"

export const EditControlPanel: React.FC = () => {
  const {
    cms,
    editable,
    BACKGROUND_COLOR,
    ACCENT_COLOR,
    SECONDARY_ACCENT_COLOR,
    hideNewBackground: [hideNewBackground, setHideNewBackground],
    newBackground: [newBackground, setNewBackground],
    hideButtons: [hideButtons, setHideButtons],
  } = useContext(LandingPageContext)
  return (
    <>
      {cms && editable && (
        <>
          <Stack
            flexDirection="row"
            columnGap={2}
            sx={{ position: "absolute", display: editable[0] ? "flex" : "none" }}
            mt={1}
            ml={1}
            alignItems="center"
          >
            <ColorPicker
              label="Background Color"
              color={[BACKGROUND_COLOR, cms.backgroundColor.setter]}
              defaultColor="#E6E1DF"
            />
            <ColorPicker
              label="Accent Color"
              color={[ACCENT_COLOR, cms.accentColor.setter]}
              defaultColor="#325D80"
            />
            <ColorPicker
              label="Secondary Color"
              color={[SECONDARY_ACCENT_COLOR, cms.secondaryAccentColor.setter]}
              defaultColor="#5FA052"
            />
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
          <Tooltip title={`${hideButtons ? "show" : "hide"} extra buttons`}>
            <IconButton
              sx={{ position: "absolute", right: 0 }}
              onClick={() => setHideButtons(!hideButtons)}
            >
              {hideButtons ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </Tooltip>
          <Tooltip title={editable[0] ? "preview" : "edit"}>
            <IconButton
              sx={{ position: "absolute", right: 40 }}
              onClick={() => editable[1](!editable[0])}
            >
              {editable[0] ? <EditIcon /> : <EditOffIcon />}
            </IconButton>
          </Tooltip>
        </>
      )}
    </>
  )
}
