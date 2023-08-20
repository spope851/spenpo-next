import { Box } from "@mui/material"
import React, { useContext } from "react"
import { LandingPageContext } from "@/context/landingPage"
import Dropzone from "react-dropzone"
import UploadIcon from "@mui/icons-material/Upload"

export const Headshot: React.FC = () => {
  const { HEADSHOT_SRC, SECONDARY_ACCENT_COLOR, cms, editable } =
    useContext(LandingPageContext)
  return editable && editable[0] ? (
    <Dropzone
      maxFiles={1}
      onDropAccepted={(acceptedFiles: Array<File>) => {
        const reader = new FileReader()
        reader.onabort = () =>
          /* eslint-disable no-console */ console.log("file reading was aborted")
        reader.onerror = () =>
          /* eslint-disable no-console */ console.log("file reading has failed")
        reader.readAsBinaryString(acceptedFiles[0])
        reader.onload = () => {
          cms?.headshotSrc.setter(URL.createObjectURL(acceptedFiles[0]))
          cms?.headshotContent.setter(String(reader.result))
          cms?.headshotFileName.setter(
            `headshot.${acceptedFiles[0].name.split(".").at(-1)}`
          )
        }
      }}
    >
      {({ getRootProps, getInputProps }) => (
        <Box {...getRootProps()}>
          <input {...getInputProps()} />
          <Box
            height={480}
            width={480}
            m="2px"
            sx={{
              ":hover": {
                cursor: "pointer",
                border: `dashed ${SECONDARY_ACCENT_COLOR} 2px`,
                m: 0,
              },
              backgroundImage: `url(${HEADSHOT_SRC || "/images/headshot.jpeg"})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              opacity: 0.6,
            }}
            borderRadius={1}
          />
          <UploadIcon
            sx={{
              fontSize: 50,
              position: "absolute",
              transform: "translate(450%, -500%)",
            }}
          />
        </Box>
      )}
    </Dropzone>
  ) : (
    <Box
      height={480}
      width={480}
      sx={{
        backgroundImage: `url(${HEADSHOT_SRC || "/images/headshot.jpeg"})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      borderRadius={1}
    />
  )
}
