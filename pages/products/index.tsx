import { BgImage } from "@/components/bgImage"
import { Button, Stack, Typography } from "@mui/material"
import { InferGetServerSidePropsType } from "next"
import { useRouter } from "next/router"
import React from "react"
import prisma from "@/utils/prisma"

const Products: React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  products,
}) => {
  const router = useRouter()
  return (
    <Stack m={5} rowGap={3}>
      {products.map((product) => (
        <Stack key={product.id} border="solid 2px" borderRadius={1} direction="row">
          <BgImage src="/images/landing-page.png" sx={{ height: 300, width: 600 }} />
          <Stack rowGap={1}>
            <Typography variant="h3">{product.name}</Typography>
            <Typography variant="h5">{product.description}</Typography>
            <Typography>{product.price / 100}</Typography>
            <Button href={`${router.pathname}/${product.id}`} variant="contained">
              view details
            </Button>
            <Button
              href={`${router.pathname}/${product.id}/design`}
              variant="contained"
            >
              design now
            </Button>
          </Stack>
        </Stack>
      ))}
    </Stack>
  )
}

export default Products

export async function getServerSideProps() {
  const products = await prisma.product.findMany()
  return {
    props: {
      products,
    },
  }
}
