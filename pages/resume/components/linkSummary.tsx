import { AccordionSummary, Typography, Box, Link } from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import React from "react"

const LinkSummary: React.FC<{
  title: string
  href: string
  linkTitle: string
  subTitle: string
}> = ({ title, href, linkTitle, subTitle }) => {
  return (
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
      <Typography
        component={Box}
        sx={{ justifyContent: "space-between", display: "flex", width: "100%" }}
      >
        <Box component="span" sx={{ fontWeight: "bold" }}>
          {title && `${title}:`}{" "}
          <Link href={href} target="_blank">
            {linkTitle}
          </Link>
        </Box>
        <Box
          component="span"
          sx={(theme) => ({ [theme.breakpoints.down("md")]: { display: "none" } })}
        >
          {subTitle}
        </Box>
      </Typography>
    </AccordionSummary>
  )
}

export default LinkSummary
