import React, { useContext, useState } from "react"
import { Button } from "@mui/material"
import { ShoppingCartContext } from "@/context/shoppingCart"
import { Deployment } from "@/components/deployment"

export default function Checkout() {
  const { deployLandingPageBody } = useContext(ShoppingCartContext)
  const [loading, setLoading] = useState(false)
  const [hideDeployment, setHideDeployment] = useState(true)
  console.log(deployLandingPageBody)

  return (
    <>
      {hideDeployment && (
        <Button
          onClick={async () => {
            setLoading(true)
            await fetch("/api/deployLanding", {
              body: JSON.stringify(deployLandingPageBody),
              method: "post",
            }).then((res) => res.status === 200 && setHideDeployment(false))
          }}
          variant="contained"
          sx={{
            m: "auto",
          }}
        >
          {loading ? "...deploying" : "deploy"}
        </Button>
      )}
      {!hideDeployment && <Deployment app={deployLandingPageBody.project.name} />}
    </>
  )
}
