import React from 'react'
import { OneThingLayout } from './OneThingLayout'
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined'

export const RobotError: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <OneThingLayout>
    <SmartToyOutlinedIcon />
    {children}
  </OneThingLayout>
)
