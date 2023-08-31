import { useRouter } from "next/router"
import { Breadcrumbs as MuiBreadcrumbs, Typography } from "@mui/material"
import Link from "next/link"
import { styled } from "@mui/material/styles"

const StyledLink = styled(Link)(() => ({
  color: "#555",
  padding: "0px !important",
  "&:hover": {
    "text-decoration": "underline",
    "background-color": "transparent !important",
  },
}))

export const Breadcrumbs: React.FC = () => {
  const router = useRouter()

  let linkPath = router.asPath.split("/")
  linkPath = linkPath.slice(1)

  return (
    <MuiBreadcrumbs
      sx={{
        "& .MuiBreadcrumbs-separator, .MuiBreadcrumbs-li": {
          border: "none",
        },
      }}
    >
      {linkPath.slice(0, linkPath.length - 1).map((crumb, i) => (
        <StyledLink href={"/" + linkPath.slice(0, i + 1).join("/")}>
          {crumb}
        </StyledLink>
      ))}
      <Typography color="text.primary">{linkPath.at(-1)}</Typography>
    </MuiBreadcrumbs>
  )
}
