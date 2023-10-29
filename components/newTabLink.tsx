import { SxProps, Typography } from "@mui/material"

export const NewTabLink: React.FC<{
  url: string
  sx?: SxProps
  typographyId?: string
}> = ({ url, sx, typographyId }) => {
  let destination = url
  if (url.slice(0, 4) !== "http") destination = `https://${url}`
  return (
    <Typography
      id={typographyId}
      component="span"
      sx={{
        ...sx,
        textDecoration: "underline",
        ":hover": {
          cursor: "pointer",
        },
      }}
      onClick={() => window.open(destination, "_blank", "noopener,noreferrer")}
    >
      {url}
    </Typography>
  )
}
