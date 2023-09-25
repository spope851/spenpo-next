import { Stack, StackProps } from "@mui/material"

const HomeComponentWrapper: React.FC<StackProps> = ({ children, ...stackProps }) => (
  <Stack
    {...stackProps}
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

export { HomeComponentWrapper }
