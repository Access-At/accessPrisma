import prisma from '../../prisma'
import bcrypt from 'bcrypt'
import { json } from '../../helper/response'

const getUsersAll = (async(res:any,next:any) => {
  try {
    const users = await prisma.user.findMany()
    return res.json({
      users
    })
  } catch (error) {
    next(error)
  }
})
const getSignIn = (async (req:any, res:any, next:any) => {
  try {
    const { username, password } = req.body
    const user = await prisma.user.findUnique({ where: { username } })
    const userToken = await prisma.user.findFirst({ where: { username } })
    const compare = bcrypt.compareSync(password, user?.password || '')
    if (!user) {
      return res.status(422).json({
        status: false,
        message: 'Username invalid',
      })
    }
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
    json(res,200, token)
  } catch (error) {
    next(error)
  }
})
const getSignUp = (async (req:any, res:any, next:any) => {
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
})

const getBannerImage = (async (req: any, res: any, next: any) => {
  
})

module.exports = {
  getSignIn, getSignUp, getBannerImage, getUsersAll
}