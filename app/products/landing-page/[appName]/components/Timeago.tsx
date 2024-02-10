'use client'
import React from 'react'
import ReactTimeago from 'react-timeago'

export const Timeago: React.FC<{ date: string | number | Date }> = ({ date }) => (
  <ReactTimeago date={date} />
)
