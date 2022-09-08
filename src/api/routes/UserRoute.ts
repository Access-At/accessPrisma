import { Router } from 'express'
import { getProfile, getUpdate } from '../controllers/UserController'
import isAuthorized from '../middlewares/isAuthorized'

const route = Router()

route.get('/user/profile/:username?', isAuthorized, getProfile)
route.put('/user/profile', isAuthorized, getUpdate)

export default route
