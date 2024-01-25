import prisma from '@/app/utils/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from './auth/[...nextauth]'

const getOrder = async (req: NextApiRequest, res: NextApiResponse) => {
  // console.log('GET order ', req.query)

  const session = await getServerSession(req, res, authOptions)
  if (session) {
    if (req.query.orderId) {
      const order = await prisma.order.findFirst({
        where: { userId: session.user.id, id: req.query.orderId?.toString() },
      })
      return res.status(200).send({ order })
    }
  }
}

export default getOrder
