import Landing from "@/components/landingPage"
import { useContext, useState } from "react"
import { ShoppingCartContext } from "@/context/shoppingCart"
import { TopComponents } from "@/components/landingPage/components/topComponents"

export default function Demo() {
  const { landingCms } = useContext(ShoppingCartContext)
  const editable = useState(true)

  return (
    <Landing
      cms={landingCms}
      editable={editable}
      topComponents={<TopComponents />}
    />
  )
}
