import { Router } from 'express'
import prisma from '../../client'
import bcrypt from 'bcrypt'

const route = Router()

route.get('/users', async (req, res, next) => {
  try {
    const users = await prisma.user.findMany()
    return res.json(users)
  } catch (error) {
    next(error)
  }
})

// Register
route.post('/users', async (req, res, next) => {
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

// Login
route.post('/user', async (req, res, next) => {
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
    return res.status(200).json(token)
  } catch (error) {
    next(error)
  }
})

// Update
route.put('/user/:id', async (req, res, next) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10)
    const { id } = req.params
    const { username } = req.body
    const user = await prisma.user.update({
      where: { id },
      data: {
        username,
        password: hash,
      },
      select: {
        email: true,
        username: true,
      },
    })
    return res.status(200).json(user)
  } catch (error) {
    next(error)
  }
})

export default route
