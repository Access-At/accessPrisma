import { validationThreadCreate, validationThreadDelete, validationThreadLike, validationThreadUpdate } from './../validations/ThreadValidation'
import prisma from '../../../prisma'
import { validationThread } from '../validations/ThreadValidation'

export const thread = async (skip: number) => {
  if ((await validationThread(skip)) === -1) return 'Posts is empty'

  const thread = await prisma.thread.findMany({
    skip,
    take: 12,
    orderBy: { createAt: 'desc' },
    include: { author: { select: { displayName: true } }, _count: { select: { commentThread: true, saveThread: true, likeThread: true } } },
  })
  return thread
}

export const threadCreate = async (authorId: string, description: string) => {
  if ((await validationThreadCreate(authorId, description)) === -1) return "Description can't be empty"

  const threadCreate = await prisma.thread.create({
    data: {
      authorId,
      description,
    },
  })
  return threadCreate
}

export const threadLikes = async (threadId: string, userId: string) => {
  if ((await validationThreadLike(threadId, userId)) === -1) return "Can't be empty"
  if ((await validationThreadLike(threadId, userId)) === -2) return "Can't find thread"
  if ((await validationThreadLike(threadId, userId)) === -3) return "Can't find user"
  if ((await validationThreadLike(threadId, userId)) === -4) {
    const disLike = await prisma.likeThread.deleteMany({
      where: {
        AND: [
          {
            threadId,
          },
          {
            userId,
          },
        ],
      },
    })
    return disLike
  }

  const threadLike = await prisma.likeThread.create({
    data: {
      threadId,
      userId,
    },
  })
  return threadLike
}

export const threadUpdate = async (threadId: string, authorId: string, description: string) => {
  // if ((await validationThreadUpdate(threadId, authorId)) === -1) return "threadId and authorId can't be empty"
  // if ((await validationThreadUpdate(threadId, authorId)) === -2) return "threadId can't find"
  // if ((await validationThreadUpdate(threadId, authorId)) === -3) return "userId can't find"
  // const update = await prisma.thread.update({
  //   where: { id: threadId },
  //   data: {
  //     description,
  //   },
  // })
  // console.log(update)
}

export const threadDelete = async (threadId: string, authorId: string) => {
  if ((await validationThreadDelete(threadId, authorId)) === -1) return 'data ini gada!!!'

  const deleted = await prisma.thread.delete({ where: { id: threadId } })
  return deleted
}
