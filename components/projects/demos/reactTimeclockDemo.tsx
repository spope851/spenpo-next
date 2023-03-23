import { useState, ReactNode, useEffect } from "react"
import { Timeclock } from "react-timeclock"

export default function ReactTimeclockDemo() {
  const [timeclock, setTimeclock] = useState<ReactNode>()

  useEffect(() => {
    setTimeclock(<Timeclock />)
  }, [])
  return (
    <td className="projects-table-data">
      <div id="react-timeclock-demo" className="app-demo">
        {timeclock}
      </div>
    </td>
  )
}
