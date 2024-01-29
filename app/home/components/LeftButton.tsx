'use client'
import { SxProps } from '@mui/material'
import React from 'react'
import { HomeComponentWrapper } from './HomeComponentWraper'
import { LinkPreview } from '@/app/components/linkPreview'

export const LeftButton: React.FC<{ sx?: SxProps }> = () => {
  return (
    <HomeComponentWrapper p={0} border="none">
      <LinkPreview borderRadius={4} url="https://spenpo.com/products/landing-page" />
    </HomeComponentWrapper>
  )
}
