import { threadCreate, threadLikes } from './../models/ThreadModel';
import { Response200, Response400 } from '../helpers/Response'
import { thread } from '../models/ThreadModel'

export const getAllThread = async (req: any, res: any) => {
  let { skip } = req.params
  if (skip) skip = parseInt(skip)

  const posts = await thread(skip)
  if (typeof posts === 'string') return Response400(res, posts)
  return Response200(res, posts)
}

export const CreateThread = async (req: any, res: any) => {
  const { description } = req.body
  const authorId = res.get("userId")
  
  const threads = await threadCreate(authorId, description)
  if (typeof threads === 'string') return Response400(res, threads)
  return Response200(res, threads)
}

export const LikeThread = async (req: any, res: any) => {
  const { threadId } = req.body
  const authorId = res.get("userId")
  
  const threads = await threadLikes(threadId,authorId)
  if (typeof threads === 'string') return Response400(res, threads)
  return Response200(res, threads)
}

export const UpdateThread = () => {}
export const DeleteThread = () => {}
