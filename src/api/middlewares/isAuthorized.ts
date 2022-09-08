import prisma from '../../../prisma'
import { Response401 } from '../helpers/Response'

const isAuthorized = async (req: any, res: any, next: any) => {
  try {
    const headerAuth = req.headers.authorization
    if (headerAuth) {
      const token = headerAuth.split(' ')[1]
      const user = await prisma.session.findFirst({ where: { token } })
      req.userId = user?.id
      res.set('userId', user?.userId)
      next()
    } else {
      Response401(res, 'Unauthorized')
    }
  } catch (error) {
    Response401(res, 'Unauthorized')
  }
}

export default isAuthorized
