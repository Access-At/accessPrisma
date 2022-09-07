// import prisma from '../../prisma'

export const json = ((res:any,status:any, json:any) => {
  return res.status(status).json(json)
})

 