import React, { useState } from "react"
import { Box, Chip, Stack, SxProps } from "@mui/material"
import { ChromePicker } from "react-color"
import CircleIcon from "@mui/icons-material/Circle"

const popover = {
  position: "absolute",
  zIndex: "2",
  transform: "translate(0%, 15%)",
}
const cover = {
  position: "fixed",
  top: "0px",
  right: "0px",
  bottom: "0px",
  left: "0px",
}

export const ColorPicker: React.FC<{
  label: string
  color: [string | undefined, (color?: string) => void]
  defaultColor: string
  sx?: SxProps
}> = ({ label, color: [color, setColor], defaultColor, sx }) => {
  const [showColorPicker, setShowColorPicker] = useState(false)
  return (
    <Stack rowGap={2}>
      <Chip
        sx={sx}
        label={label}
        deleteIcon={
          <CircleIcon
            sx={{ fill: color || defaultColor, stroke: "#fff", strokeWidth: 2 }}
          />
        }
        onDelete={() => 0}
        clickable
        onClick={() => setShowColorPicker(!showColorPicker)}
      />
      {showColorPicker && (
        <Box sx={popover}>
          <Box sx={cover} onClick={() => setShowColorPicker(false)} />
          {/* @ts-expect-error Server Component */}
          <ChromePicker
            color={color || defaultColor}
            onChangeComplete={(e) => {
              setColor(e.hex)
            }}
          />
        </Box>
      )}
    </Stack>
  )
}
