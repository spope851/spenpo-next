import { Box, Divider } from "@mui/material"
import React, { useContext } from "react"
import { LandingPageContext } from "@/context/landingPage"
import { ActionBtn } from "./actionBtn"
import { EditableText } from "./editableText"
import { Socials } from "./socials"

export const Info: React.FC = () => {
  const { ACCENT_COLOR, cms, NAME, SUBTITLE, TITLE } = useContext(LandingPageContext)

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        textAlign: "center",
        alignSelf: "stretch",
      }}
    >
      <EditableText
        getSet={cms?.title}
        sx={{
          textTransform: "uppercase",
          color: ACCENT_COLOR,
          fontFamily: "'Inter', sans-serif",
          letterSpacing: "0.3rem",
          fontSize: "0.875em",
          lineHeight: "40px",
          fontWeight: 300,
        }}
        label="Title"
        text={TITLE}
      />
      <Divider sx={{ width: 50, borderBottomWidth: "medium", mx: "auto" }} />
      <EditableText
        getSet={cms?.name}
        sx={{
          color: "rgba(0,0,0,0.702)",
          fontFamily: "'Fraunces', serif",
          letterSpacing: "-0.025rem",
          fontSize: "3em",
          lineHeight: "72px",
          fontWeight: 700,
        }}
        label="Name"
        text={NAME}
      />
      <EditableText
        getSet={cms?.subtitle}
        sx={{
          color: "rgba(0,0,0,0.49)",
          fontFamily: "'Inter', sans-serif",
          fontSize: "1em",
          lineHeight: "32px",
          fontWeight: 300,
        }}
        label="Subtitle"
        text={SUBTITLE}
      />
      <ActionBtn />
      <Socials />
    </Box>
  )
}
