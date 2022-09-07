import { Router } from 'express'
import prisma from '../../prisma'
import bcrypt from 'bcrypt'
const  { 
  getSignIn, getSignUp, getUsersAll
} = require('../../controller/user/AuthController')

const route = Router()

route.get('/users/get',getUsersAll)

route.post('/users/sign-up', getSignUp)

route.post('/users/sign-in', getSignIn)

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
