import { useState, ReactNode, useEffect } from "react"
import { Timeclock } from "react-timeclock"

export default function ReactTimeclockDemo() {
  const [timeclock, setTimeclock] = useState<ReactNode>()

  useEffect(() => {
    setTimeclock(<Timeclock />)
  }, [])
  return timeclock
}
