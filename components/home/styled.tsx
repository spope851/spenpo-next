import { Box } from "@mui/material"
import { styled } from "@mui/material/styles"

const ProjectsLinkButton = styled(Box)(() => ({
  ":hover": {
    cursor: "pointer",
    backgroundColor: "#ddd",
  },
  border: "solid #aaa",
  borderRadius: "15px",
  padding: "25px",
  margin: "20px 30px auto",
}))

const LeftContentWrapper = styled(Box)(({ theme }) => ({
  paddingLeft: "50px",
  paddingRight: "40px",
  display: "flex",
  flexDirection: "column",
  flex: "1 1 70%",
  [theme.breakpoints.down("md")]: {
    padding: "0px 50px",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "0px 20px 20px",
  },
}))

const WhatsNewComponentWrapper = styled(Box)(() => ({
  display: "flex",
  alignItems: "stretch",
  flex: "1 1",
  margin: "0px 30px",
}))

const WhatsNewWrapper = styled(Box)(({ theme }) => ({
  marginTop: "50px",
  display: "flex",
  flexDirection: "column",
  border: "solid #ccc",
  borderRadius: "5px",
  padding: "20px",
  textAlign: "center",
  justifyContent: "space-between",
  flex: "1 1 0px",
  width: "0px",
  [theme.breakpoints.up("lg")]: {
    marginRight: "25px",
  },
}))

const ProjectsLinkWrapper = styled(Box)(({ theme }) => ({
  marginTop: "50px",
  display: "flex",
  flexDirection: "column",
  border: "solid #ccc",
  borderRadius: "5px",
  padding: "20px",
  textAlign: "center",
  justifyContent: "space-between",
  flex: "1 1 0px",
  width: "0px",
  [theme.breakpoints.up("lg")]: {
    marginLeft: "25px",
  },
}))

const ContactFormWrapper = styled(Box)(() => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  padding: "20px 50px",
  border: "solid #ccc",
  borderRadius: "5px",
  justifyContent: "space-between",
  textAlign: "center",
}))

const ContactWrapper = styled(Box)(({ theme }) => ({
  margin: "50px 0px",
  display: "flex",
  flexGrow: 1,
  [theme.breakpoints.down("md")]: {
    marginBottom: "20px",
  },
}))

const TwitterFeedWrapper = styled(Box)(({ theme }) => ({
  flex: "1 1",
  minWidth: "30%",
  display: "flex",
  alignSelf: "stretch",
  [theme.breakpoints.down("md")]: {
    margin: "20px 40px 0px",
  },
  [theme.breakpoints.down("sm")]: {
    margin: "0px 10px",
  },
}))

export {
  ProjectsLinkButton,
  LeftContentWrapper,
  WhatsNewComponentWrapper,
  WhatsNewWrapper,
  ProjectsLinkWrapper,
  ContactFormWrapper,
  ContactWrapper,
  TwitterFeedWrapper,
}
