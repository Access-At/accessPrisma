import { Router } from 'express'
import { getAllThread, CreateThread, LikeThread, UpdateThread, DeleteThread } from '../controllers/ThreadController'
import isAuthorized from '../middlewares/isAuthorized'

const route = Router()

route.get('/thread/:skip?', isAuthorized, getAllThread)
route.post('/thread/create', isAuthorized, CreateThread)
route.post('/thread/like', isAuthorized, LikeThread)
route.post('/thread/update', isAuthorized, UpdateThread)
route.delete('/thread/delete', isAuthorized, DeleteThread)

export default route
