import React, { useContext, useEffect, useState } from "react"
import { Button, Stack, TextField, Typography } from "@mui/material"
import { ShoppingCartContext } from "@/context/shoppingCart"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import { formatDomain } from "@/utils/string"
import { useRouter } from "next/router"
import { LandingStepper } from "@/components/products/landing-page/stepper"

const Domain: React.FC = () => {
  const router = useRouter()
  const { projectName, landingCms } = useContext(ShoppingCartContext)
  const [domainName, setDomainName] = useState(
    formatDomain(landingCms.name.getter() || "")
  )

  useEffect(() => {
    projectName[1](domainName)
  }, [domainName, projectName])

  return (
    <Stack rowGap={1} m={5}>
      <Stack direction="row" justifyContent="space-between" columnGap={10}>
        <LandingStepper activeStep={1} />
        <Button
          endIcon={<ChevronRightIcon />}
          variant="contained"
          onClick={() => router.push("password")}
          disabled={!projectName[0]}
        >
          continue
        </Button>
      </Stack>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="flex-end"
        m={5}
        columnGap={1}
      >
        <TextField
          label="domain"
          value={projectName[0]}
          type="url"
          onChange={(e) => setDomainName(formatDomain(e.target.value))}
        />
        <Typography>.vercel.app</Typography>
      </Stack>
    </Stack>
  )
}

export default Domain
