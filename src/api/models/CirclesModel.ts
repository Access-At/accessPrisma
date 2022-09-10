import prisma from "../../../prisma";;

export const circles = async () => {

  const circles = await prisma.user.findMany({
    take: 12,
    select: {
      id: true,
      displayName: true,
      username: true,
      bio:true
    },
    orderBy: {
      updateAt: "desc"
    }
  })
  return circles
}