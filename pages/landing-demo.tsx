import { Landing } from "@/components/landing"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import {
  Autocomplete,
  Box,
  Button,
  IconButton,
  Modal,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import UploadIcon from "@mui/icons-material/Upload"
import Dropzone from "react-dropzone"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import { ColorPicker } from "@/components/colorPicker"
import VisibilityIcon from "@mui/icons-material/Visibility"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import InfoIcon from "@mui/icons-material/Info"
import { ShoppingCartContext } from "@/context/shoppingCart"

export default function Demo() {
  const router = useRouter()
  const {
    setProjectName,
    setClientName,
    setTitle: setContextTitle,
    setSubtitle: setContextSubtitle,
    setSocialUrls: setContextSocialUrls,
    setAction: setContextAction,
    setActionStatement: setContextActionStatement,
    setHeadshotContent,
    setFileExtension,
    setBackgroundColor,
    setBackgroundImage: setContextBackgroundImage,
    setAccentColor,
    setSecondaryAccentColor,
  } = useContext(ShoppingCartContext)
  const [modalOpen, setModalOpen] = useState(false)
  const [title, setTitle] = useState("your title")
  const [name, setName] = useState("Your Name")
  const [subtitle, setSubtitle] = useState("Your subtitle")
  const [socialUrls, setSocialUrls] = useState([
    "https://twitter.com",
    "https://www.instagram.com",
    "https://www.facebook.com",
    "https://www.youtube.com",
    "https://www.twitch.tv",
    "mailto:e@mail.com",
    "https://github.com",
    "https://reddit.com",
    "https://whatsapp.com",
    "https://spotify.com",
  ])
  const [headshotSrc, setHeadshotSrc] = useState<string>()
  const [actionStatement, setActionStatement] = useState("your action statement")
  const [action, setAction] = useState<string>()
  const [backgroundImage, setBackgroundImage] = useState<string>()
  const backgroundColor = useState<string>()
  const accentColor = useState<string>()
  const secondaryAccentColor = useState<string>()

  const [hideButtons, setHideButtons] = useState(false)

  useEffect(() => {
    setClientName(name)
    setProjectName(
      `${name
        .replace(/['".,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
        .replaceAll(" ", "")
        .toLocaleLowerCase()}-landing`
    )
  }, [name])

  useEffect(() => {
    setContextTitle(title)
  }, [title])

  useEffect(() => {
    setContextSubtitle(subtitle)
  }, [subtitle])

  useEffect(() => {
    setContextSocialUrls(JSON.stringify(socialUrls))
  }, [socialUrls])

  useEffect(() => {
    setContextAction(action)
  }, [action])

  useEffect(() => {
    setContextActionStatement(actionStatement)
  }, [actionStatement])

  useEffect(() => {
    setBackgroundColor(backgroundColor[0])
  }, [backgroundColor[0]])

  useEffect(() => {
    setContextBackgroundImage(backgroundImage)
  }, [backgroundImage])

  useEffect(() => {
    setAccentColor(accentColor[0])
  }, [accentColor[0]])

  useEffect(() => {
    setSecondaryAccentColor(secondaryAccentColor[0])
  }, [secondaryAccentColor[0]])

  return (
    <>
      <Tooltip title={`${hideButtons ? "show" : "hide"} extra buttons`}>
        <IconButton
          sx={{ position: "absolute", right: 0, borderRadius: 50, m: 1 }}
          onClick={() => setHideButtons(!hideButtons)}
        >
          {hideButtons ? <VisibilityOffIcon /> : <VisibilityIcon />}
        </IconButton>
      </Tooltip>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Stack
          sx={{
            width: 1000,
            height: 600,
            m: "auto",
            bgcolor: "#fff",
            p: 8,
            borderRadius: 2,
            position: "absolute" as const,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            boxShadow: 24,
          }}
          rowGap={5}
          justifyContent="space-evenly"
        >
          <Stack flexDirection="row" columnGap={5}>
            <Stack rowGap={2} alignItems="center" justifyContent="center">
              <Dropzone
                maxFiles={1}
                onDropAccepted={(acceptedFiles: Array<File>) => {
                  const reader = new FileReader()
                  reader.onabort = () =>
                    /* eslint-disable no-console */ console.log(
                      "file reading was aborted"
                    )
                  reader.onerror = () =>
                    /* eslint-disable no-console */ console.log(
                      "file reading has failed"
                    )
                  reader.readAsBinaryString(acceptedFiles[0])
                  reader.onload = () => {
                    setHeadshotSrc(URL.createObjectURL(acceptedFiles[0]))
                    setHeadshotContent(String(reader.result))
                    setFileExtension(acceptedFiles[0].name.split(".").at(-1))
                  }
                }}
              >
                {({ getRootProps, getInputProps }) => (
                  <Box
                    {...getRootProps()}
                    sx={{ ":hover": { cursor: "pointer" }, height: 400 }}
                  >
                    <input {...getInputProps()} />
                    <Box
                      height={400}
                      width={400}
                      sx={{
                        backgroundImage: `url(${
                          headshotSrc || "/images/headshot.jpeg"
                        })`,
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
                        transform: "translate(350%, -450%)",
                      }}
                    />
                  </Box>
                )}
              </Dropzone>
              <Stack flexDirection="row" columnGap={2}>
                <ColorPicker
                  label="Background Color"
                  color={backgroundColor}
                  defaultColor="#E6E1DF"
                />
                <ColorPicker
                  label="Accent Color"
                  color={accentColor}
                  defaultColor="#325D80"
                />
                <ColorPicker
                  label="Secondary Color"
                  color={secondaryAccentColor}
                  defaultColor="#5FA052"
                />
              </Stack>
              <TextField
                fullWidth
                label="Background Image Url"
                value={backgroundImage || ""}
                onChange={(e) => setBackgroundImage(e.target.value)}
              />
            </Stack>
            <Stack height="100%" rowGap={2} justifyContent="center">
              <TextField
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                label="Subtitle"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
              />
              <TextField
                label="Action Statement"
                value={actionStatement}
                onChange={(e) => setActionStatement(e.target.value)}
              />
              <TextField
                label="Action Destination"
                value={action || ""}
                onChange={(e) => setAction(e.target.value)}
                placeholder="ex. https://google.com"
                InputProps={{
                  endAdornment: (
                    <Tooltip title="Add the URL you want to navigate to from your landing page, or leave this field blank if you'd like to integrate and alternative flow. We'll reach out about that separately.">
                      <InfoIcon />
                    </Tooltip>
                  ),
                }}
              />
              <Autocomplete
                options={[]}
                freeSolo
                autoSelect
                multiple
                value={socialUrls}
                onChange={(_, value) => setSocialUrls(value as string[])}
                renderInput={(params) => (
                  <Box>
                    <TextField
                      {...params}
                      label="Socials"
                      variant="outlined"
                      InputProps={{
                        ...params.InputProps,
                        inputProps: { ...params.inputProps },
                      }}
                    />
                  </Box>
                )}
              />
            </Stack>
          </Stack>
          <Button
            variant="contained"
            sx={{ mx: "auto" }}
            onClick={() => setModalOpen(false)}
          >
            preview
          </Button>
        </Stack>
      </Modal>
      <Landing
        title={title}
        name={name}
        subtitle={subtitle}
        socialUrls={socialUrls}
        headshotSrc={headshotSrc || "/images/headshot.jpeg"}
        actionText={actionStatement}
        actionClick={() =>
          action
            ? window.open(action, "_blank", "noopener,noreferrer")
            : alert("your action")
        }
        backgroundColor={backgroundColor[0]}
        backgroundImage={backgroundImage || undefined}
        accentColor={accentColor[0]}
        secondaryAccentColor={secondaryAccentColor[0]}
        navigateAway={
          !hideButtons && (
            <Stack flexDirection="row" justifyContent="space-between" width="100%">
              <Button
                startIcon={<ChevronLeftIcon />}
                variant="contained"
                onClick={() => router.push("/home")}
                sx={{ ml: 5 }}
              >
                return to spenpo.com
              </Button>
              <Button variant="contained" onClick={() => setModalOpen(true)}>
                edit content
              </Button>
              <Tooltip
                title={
                  headshotSrc
                    ? ""
                    : "Please upload your headshot before checking out"
                }
              >
                <Box component="span">
                  <Button
                    variant="contained"
                    sx={{ mr: 5 }}
                    onClick={() => router.push("/checkout")}
                    endIcon={<ChevronRightIcon />}
                    disabled={!headshotSrc}
                  >
                    add to cart
                  </Button>
                </Box>
              </Tooltip>
            </Stack>
          )
        }
      />
    </>
  )
}
