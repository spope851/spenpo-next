import { Box, IconButton, Stack, TextField, Tooltip } from "@mui/material"
import React, { Fragment, useContext } from "react"
import { ICON_BTN_TOOLTIP_PROPS } from "../constants"
import { LandingPageContext } from "@/context/landingPage"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined"
import DeleteIcon from "@mui/icons-material/DeleteOutlined"
import { SOCIAL_ICON_SX } from "../functions"
import { SocialBtn } from "./socialBtn"

export const Socials: React.FC = () => {
  const {
    SOCIAL_URLS,
    ACCENT_COLOR,
    SECONDARY_ACCENT_COLOR,
    editable,
    cms,
    newSocial: [newSocial, setNewSocial],
    hideNewSocial: [hideNewSocial, setHideNewSocial],
    ADD_BTN_SX,
  } = useContext(LandingPageContext)

  return (
    <>
      <Stack
        flexDirection="row"
        sx={SOCIAL_ICON_SX(ACCENT_COLOR)}
        justifyContent="center"
        alignItems="center"
        columnGap={1}
      >
        {SOCIAL_URLS?.map((url) => {
          const icon = <SocialBtn url={url} color={SECONDARY_ACCENT_COLOR} />
          return cms && editable && editable[0] ? (
            <Tooltip key={url} title={url} placement="top">
              <Box>
                <Tooltip
                  componentsProps={ICON_BTN_TOOLTIP_PROPS}
                  title={
                    <IconButton
                      sx={{ mt: -1.5 }}
                      onClick={() => {
                        cms.socialUrls.setter(
                          SOCIAL_URLS.filter((social) => social !== url)
                        )
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  {icon}
                </Tooltip>
              </Box>
            </Tooltip>
          ) : (
            <Fragment key={url}>{icon}</Fragment>
          )
        })}
        {newSocial && <SocialBtn url={newSocial} color={SECONDARY_ACCENT_COLOR} />}
        {cms && editable && editable[0] && (
          <IconButton onClick={() => setHideNewSocial(false)}>
            <AddCircleOutlineIcon sx={ADD_BTN_SX} />
          </IconButton>
        )}
      </Stack>
      {!hideNewSocial && (
        <Stack direction="row" columnGap={1}>
          <TextField
            label="New Social Link"
            placeholder="URL"
            value={newSocial}
            onChange={(e) => setNewSocial(e.target.value)}
            fullWidth
          />
          <IconButton
            sx={{ my: "auto" }}
            onClick={() => {
              if (newSocial) {
                const newUrls = SOCIAL_URLS ? SOCIAL_URLS : []
                cms?.socialUrls.setter([...newUrls, newSocial])
                setNewSocial("")
              }
              setHideNewSocial(true)
            }}
          >
            {newSocial ? <CheckCircleOutlinedIcon /> : <DeleteIcon />}
          </IconButton>
        </Stack>
      )}
    </>
  )
}

SocialBtn.displayName = "SocialBtn"
