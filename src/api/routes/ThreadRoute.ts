import { Router } from 'express'
import { getAllThread, getThreadCreate } from '../controllers/ThreadController'
import isAuthorized from '../middlewares/isAuthorized'

const route = Router()

route.get('/thread/:skip?', isAuthorized, getAllThread)
route.post('/thread/create', isAuthorized, getThreadCreate)

export default route
