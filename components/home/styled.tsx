import { Stack, StackProps } from "@mui/material"
import { forwardRef } from "react"

const HomeComponentWrapper: React.FC<StackProps> = forwardRef(
  ({ children, ...stackProps }, ref) => (
    <Stack
      {...stackProps}
      ref={ref}
      p={5}
      gap={5}
      flex={1}
      border="solid #ccc"
      borderRadius={1}
      textAlign="center"
    >
      {children}
    </Stack>
  )
)

HomeComponentWrapper.displayName = "HomeComponentWrapper"

export { HomeComponentWrapper }
