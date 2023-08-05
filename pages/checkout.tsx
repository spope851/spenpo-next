import React, { useContext } from "react"
import { Button } from "@mui/material"
import { ShoppingCartContext } from "@/context/shoppingCart"

export default function Checkout() {
  const { deployLandingPageBody } = useContext(ShoppingCartContext)
  console.log(deployLandingPageBody)

  return (
    <Button
      onClick={async () =>
        await fetch("/api/deployLanding", {
          body: JSON.stringify(deployLandingPageBody),
          method: "post",
        })
      }
    >
      deploy
    </Button>
  )
}
