import React, { useContext, useEffect, useState } from "react"
import { Button, Divider, Stack } from "@mui/material"
import { ShoppingCartContext } from "@/context/shoppingCart"
import { LandingSummary } from "@/components/products/landing-page/checkout/landingSummary"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import { CheckoutForm } from "@/components/products/landing-page/checkout/checkoutForm"
import { useSession } from "next-auth/react"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { LandingStepper } from "@/components/products/landing-page/stepper"

// useEffect(() => {
//   if (app) {
//     const pollingId = window.setInterval(async () => {
//       // fetch deployment
//       const projectDeployments = await getProjectDeployments(app).catch((err) => {
//         console.log(err)
//         return err
//       })

//       const deployments = await projectDeployments.json()

//       if (deployments.deployments.length > 0) {
//         const latestDeployment = await getDeployment(
//           deployments.deployments[0].uid
//         ).catch((err) => {
//           console.log(err)
//           return err
//         })
//         const deployment = await latestDeployment.json()
//         if (!["READY", "CANCELED", "ERROR"].includes(deployment.readyState)) {
//           router.push(
//             `deployments/${deployment.id}?createdAt=${deployment.createdAt}`
//           )
//         }
//       }
//     }, 1000)

//     return () => {
//       clearInterval(pollingId)
//     }
//   }
//   /* eslint-disable-next-line react-hooks/exhaustive-deps */
// }, [app])

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripe = loadStripe(
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
    : "pk_test_51Njln3I7AtbqQ3Lr6n0d27jT87hAlb7nUSrBOMo0cY3t3rFzLr65z2k23ijJg8d0wskm9J0so7lLQPW05mbEHIUO00FDfE5RIc"
)

const Checkout: React.FC = () => {
  const session = useSession()
  const {
    paymentIntentMetadata,
    file: [file],
  } = useContext(ShoppingCartContext)

  const [clientSecret, setClientSecret] = useState("")

  useEffect(() => {
    if (!clientSecret) {
      // Create PaymentIntent as soon as the page loads
      const init = async () =>
        fetch("/api/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: 99,
            metadata: paymentIntentMetadata,
            userId: session.data?.user.id,
          }),
        })
          .then((res) => res.json())
          .then(async (data) => {
            setClientSecret(data.clientSecret)
            await fetch(
              `/api/get-signed-s3-url?filename=${data.id}.${file?.name
                .split(".")
                .at(-1)}&filetype=${file?.type}`,
              {
                method: "get",
              }
            ).then(async (res) => {
              const data = await res.json()
              await fetch(data.url, {
                method: "put",
                headers: { "Content-Type": file?.type! },
                body: file,
              })
            })
          })
      init()
    }
  }, [clientSecret])

  const appearance: { theme: "stripe" | "night" | "flat" | undefined } = {
    theme: "stripe",
  }
  const options = {
    clientSecret,
    appearance,
  }

  return (
    <Stack rowGap={1} m={5}>
      <LandingStepper activeStep={3} />
      <Stack direction="row" justifyContent="space-around" mt={5}>
        <LandingSummary />
        <Divider orientation="vertical" flexItem />
        <Stack rowGap={1} my={5}>
          {clientSecret && (
            <Elements stripe={stripe} options={options}>
              <CheckoutForm />
            </Elements>
          )}
          <Button variant="contained" href="design">
            cancel
          </Button>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Checkout
