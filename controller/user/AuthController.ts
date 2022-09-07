import prisma from '../../prisma'
import bcrypt from 'bcrypt'
import { json } from '../../helper/Response'

export const getSignIn = async (req: any, res: any, next: any) => {
  try {
    const { username, password } = req.body
    const user = await prisma.user.findUnique({ where: { username } })
    const userToken = await prisma.user.findFirst({ where: { username } })
    const compare = bcrypt.compareSync(password, user?.password || '')
    if (!compare) {
      return res.status(400).json({
        status: false,
        message: 'Password invalid',
      })
    }
    const token = await prisma.session.create({
      data: {
        userId: userToken?.id || '',
      },
      select: {
        token: true,
        userId: true,
      },
    })
    !user ? json(res, 422, { status: false, message: 'Username invalid' }) : json(res, 200, token)
  } catch (error) {
    next(error)
  }
}
export const getSignUp = async (req: any, res: any, next: any) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10)
    const { username, email } = req.body
    const users = await prisma.user.create({
      data: {
        username,
        email,
        password: hash,
      },
    })
    return res.json(users)
  } catch (error) {
    next(error)
  }
}

export const getBannerImage = async (req: any, res: any, next: any) => {}

export const getUpdate = async (req: any, res: any, next: any) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10)
    const { id } = req.params
    const user = await prisma.user.update({
      where: { id },
      data: {
        password: hash,
      },
      select: {
        email: true,
      },
    })
    return res.status(200).json(user)
  } catch (error) {
    next(error)
  }
}
