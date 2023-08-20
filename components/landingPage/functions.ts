const SOCIAL_ICON_SX = (accent: string) => {
  return {
    "& .social-svg-background": {
      stroke: `${accent} !important`,
    },
    "& .social-svg-mask": {
      fill: "transparent !important",
    },
    "& .social-svg-icon": {
      fill: `${accent} !important`,
    },
  }
}

export { SOCIAL_ICON_SX }
