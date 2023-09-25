import { BgImage } from "@/components/bgImage"
import { Button, Grid, Stack, Typography } from "@mui/material"
import { InferGetServerSidePropsType } from "next"
import { useRouter } from "next/router"
import React from "react"
import prisma from "@/utils/prisma"

const Products: React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  products,
}) => {
  const router = useRouter()

  return (
    <Stack p={5} gap={5} flex={1}>
      <Grid item xs={12}>
        <Typography variant="h4" textAlign="center" fontStyle="italic">
          spenpo.shop
        </Typography>
      </Grid>
      <Grid container>
        {products.map(({ price, id, name, description }) => (
          <Grid
            item
            md={4}
            key={id}
            borderRadius={1}
            gap={2}
            display="flex"
            direction="column"
            bgcolor="#eee"
            border="solid 1px #ddd"
            p={3}
          >
            <BgImage src={`/images/${id}.png`} sx={{ minHeight: 200, flex: 1 }} />
            <Stack gap={1}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-end"
              >
                <Typography variant="h6">{name}</Typography>
                <Typography>${price / 100}</Typography>
              </Stack>
              <Typography>{description}</Typography>
              <Stack gap={1} ml="auto" direction="row">
                <Button href={`${router.pathname}/${id}`} variant="text">
                  learn more
                </Button>
                <Button href={`${router.pathname}/${id}/design`} variant="contained">
                  buy now
                </Button>
              </Stack>
            </Stack>
          </Grid>
        ))}
      </Grid>
      <Stack flex={1} justifyContent="flex-end">
        <Typography sx={{ ml: "auto" }}>{`displaying ${products.length} product${
          products.length > 1 ? "s" : ""
        } of ${products.length}`}</Typography>
      </Stack>
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
