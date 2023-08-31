import { SxProps, Typography } from "@mui/material"

export const NewTabLink: React.FC<{ url: string; sx?: SxProps }> = ({ url, sx }) => {
  let destination = url
  if (url.slice(0, 4) !== "http") destination = `https://${url}`
  return (
    <Typography
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
