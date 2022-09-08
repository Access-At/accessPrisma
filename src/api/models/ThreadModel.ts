import prisma from '../../../prisma'
import { validationThread } from '../validations/ThreadValidation'

export const thread = async (skip: number) => {
  if ((await validationThread(skip)) === -1) return 'Posts is empty'

  const thread = await prisma.thread.findMany({
    skip,
    take: 12,
    orderBy: { createAt: 'asc' },
    include: { author: { select: { displayName: true } }, _count: { select: { commentThread: true, saveThread: true, likeThread: true } } },
  })
  return thread
}

export const threadCreate = async (title: string, authorId: string, description: string) => {}
