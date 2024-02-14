import { Order } from '../types'
import prisma from '@/app/utils/prisma'

export const recursivelyFetchOrder = async (
  orderId: string,
  productId: string,
  userId: string,
  pause: number = 500
) => {
  const o =
    (await prisma.order.findFirst({
      where: {
        id: orderId,
        productId,
        userId,
      },
    })) ?? undefined
  return new Promise<Order>((resolve) => {
    if (o && (!!o.complete || !!o.error)) {
      resolve(o)
    } else
      setTimeout(async () => {
        resolve(recursivelyFetchOrder(orderId, productId, userId, pause * 2))
      }, pause)
  })
}
