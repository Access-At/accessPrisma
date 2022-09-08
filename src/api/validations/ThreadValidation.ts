import prisma from '../../../prisma'
import validator from 'validator'

export const validationThread = async (skip: number) => {
  const thread = await prisma.thread.findMany({ skip, take: 12, orderBy: { createAt: 'asc' } })
  if (!thread.length) return -1
}

export const validationThreadCreate = async (authorId: string, description: string) => {
  if (!authorId || !description) return -1
}
