import { Response200, Response400 } from '../helpers/Response'
import { thread } from '../models/ThreadModel'

export const getAllThread = async (req: any, res: any) => {
  let { skip } = req.params
  if (skip) skip = parseInt(skip)

  const posts = await thread(skip)
  if (typeof posts === 'string') return Response400(res, posts)
  return Response200(res, posts)
}

export const getThreadCreate = async (req: any, res: any) => {}
