import { profile, profileUpdate } from '../models/UserModel'
import { Response200, Response400 } from '../helpers/Response'

export const getProfile = async (req: any, res: any, next: any) => {
  const { username } = req.params
  const profiles = await profile(username)

  if (typeof profiles === 'string') return Response400(res, profiles)
  return Response200(res, profiles)
}

export const getUpdate = async (req: any, res: any, next: any) => {
  const userId = res.get('userId')
  const { displayName, bio } = req.body
  const update = await profileUpdate(userId, displayName, bio)

  if (typeof update === 'string') return Response400(res, update)
  return Response200(res, profile)
}

// export const getBannerImage = async (req: any, res: any, next: any) => {}
