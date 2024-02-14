import { Prisma } from '@prisma/client'

type Order = {
  id: string
  userId: string
  productId: string
  metadata: Prisma.JsonValue
  complete: boolean
  error: Prisma.JsonValue
  environment: string
}

export type { Order }
