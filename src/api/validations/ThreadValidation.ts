import prisma from '../../../prisma'
import validator from 'validator'

export const validationThread = async (skip: number) => {
  const thread = await prisma.thread.findMany({ skip, take: 12, orderBy: { createAt: 'asc' } })
  if (!thread.length) return -1
}

export const validationThreadCreate = async (authorId: string, description: string) => {
  if (!authorId || !description) return -1
}

export const validationThreadLike = async (threadId: string, userId: string) => {
  
  if (!threadId || !userId) return -1
  const thread = await prisma.thread.findFirst({
    where: {
      id: threadId,
    }
  })
  if (!thread) return -2
  const user = await prisma.user.findFirst({
    where: {
      id :userId
    }
  })

  if (!user) return -3 
  const isLike = await prisma.likeThread.findFirst({
    where: {
      AND: [
        {
          threadId
        }, {
          userId
        }
      ]
    }
  })
  if (isLike) return -4
}

export const validationThreadUpdate = () => {}
export const validationThreadDelete = () => {}
