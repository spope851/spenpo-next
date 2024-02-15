'use client'
import React, { useState, ReactNode, useEffect } from 'react'
import { Timeclock } from 'react-timeclock'

export const ReactTimeclockDemo: React.FC = () => {
  const [timeclock, setTimeclock] = useState<ReactNode>()

  useEffect(() => {
    setTimeclock(<Timeclock />)
  }, [])
  return <>{timeclock}</>
}
