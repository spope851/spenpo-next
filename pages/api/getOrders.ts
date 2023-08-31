import prisma from "@/utils/prisma"
import type { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"
import { authOptions } from "./auth/[...nextauth]"

export interface Truth {
  id: number
  is_true: string
  sentence: string
}

const getOrders = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("GET orders ", req.query)

  const session = await getServerSession(req, res, authOptions)
  if (session) {
    const orders = await prisma.order.findMany({
      where: { userId: session.user.id, complete: true },
    })

    return res.status(200).send({ orders })
  }
}

export default getOrders
