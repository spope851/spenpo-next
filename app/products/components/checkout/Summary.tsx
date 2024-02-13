import { Box, Stack, Divider, Typography } from '@mui/material'
import { ReactNode } from 'react'

const ColorExample: React.FC<{ color: string; opacity?: number }> = ({
  color,
  opacity = 1,
}) => {
  return (
    <Box
      height={20}
      width={80}
      bgcolor={color}
      sx={{ opacity }}
      border="solid 1px #555"
      borderRadius={1}
    />
  )
}

const SummaryRow: React.FC<{ children: ReactNode }> = ({ children }) => (
  <>
    <Stack
      columnGap={{ xs: 5, sm: 10, md: 15 }}
      direction="row"
      justifyContent="space-between"
    >
      {children}
    </Stack>
    <Divider flexItem />
  </>
)

const WarningSummaryRow: React.FC<{ title: string; data: ReactNode }> = ({
  title,
  data,
}) => (
  <SummaryRow>
    <Typography>{title}:</Typography>
    <Typography color={data ? 'inherit' : 'red'}>
      {data || 'No value provided'}
    </Typography>
  </SummaryRow>
)

export { ColorExample, SummaryRow, WarningSummaryRow }
