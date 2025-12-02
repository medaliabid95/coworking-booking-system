import { PrismaConfig } from '@prisma/client'

export const prismaConfig: PrismaConfig = {
  adapter: process.env.DATABASE_URL,
}