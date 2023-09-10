import React, { useContext } from "react"
import { Button, Stack, TextField } from "@mui/material"
import { ShoppingCartContext } from "@/context/shoppingCart"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import { useRouter } from "next/router"
import { LandingStepper } from "@/components/products/landing-page/stepper"

const Password: React.FC = () => {
  const router = useRouter()
  const { setPassword, passwordSet } = useContext(ShoppingCartContext)

  return (
    <Stack rowGap={1} m={5}>
      <Stack direction="row" justifyContent="space-between" columnGap={10}>
        <LandingStepper activeStep={2} />
        <Button
          endIcon={<ChevronRightIcon />}
          variant="contained"
          onClick={() => router.push("checkout")}
          disabled={!passwordSet}
        >
          checkout
        </Button>
      </Stack>
      <Stack direction="row" justifyContent="space-around" m={5}>
        <Stack rowGap={1}>
          <TextField
            label="password"
            type="password"
            onChange={async (e) => {
              const req = await fetch("/api/hashString", {
                method: "post",
                body: JSON.stringify({ string: e.target.value }),
              })
              const password = await req.json()
              setPassword(password.hash)
            }}
          />
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Password
