import { useRouter } from "next/router"
import { Breadcrumbs as MuiBreadcrumbs, Typography } from "@mui/material"
import Link from "next/link"
import { styled } from "@mui/material/styles"
import { useCallback, useState } from "react"

const StyledLink = styled(Link)(() => ({
  color: "#555",
  padding: "0px !important",
  "&:hover": {
    textDecoration: "underline",
    backgroundColor: "transparent !important",
  },
}))

export const Breadcrumbs: React.FC = () => {
  const router = useRouter()
  const [crumbWidth, setCrumbWidth] = useState(100)

  let linkPath = router.asPath.split("/")
  linkPath = linkPath.slice(1)

  const calculateCrumbWidth = useCallback((node: HTMLDivElement) => {
    if (!node) return
    const resizeObserver = new ResizeObserver(() => {
      setCrumbWidth((node.offsetWidth - linkPath.length * 20) / linkPath.length)
    })
    resizeObserver.observe(node)
    return resizeObserver.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <MuiBreadcrumbs
      ref={calculateCrumbWidth}
      sx={{
        "& .MuiBreadcrumbs-separator, .MuiBreadcrumbs-li": {
          border: "none",
        },
        "& .MuiBreadcrumbs-li": {
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          maxWidth: crumbWidth,
        },
      }}
    >
      {linkPath.slice(0, linkPath.length - 1).map((crumb, i) => (
        <StyledLink key={crumb} href={"/" + linkPath.slice(0, i + 1).join("/")}>
          {crumb}
        </StyledLink>
      ))}
      <Typography
        color="text.primary"
        sx={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {linkPath.at(-1)}
      </Typography>
    </MuiBreadcrumbs>
  )
}
