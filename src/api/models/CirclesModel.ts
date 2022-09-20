import prisma from "../../../prisma";

export const circles = async (userId: string, skip: number) => {
  
  const circle = await prisma.user.findMany({
    take: 15,
    skip,
    select: {
      id: true,
      displayName: true,
      username: true,
      bio: true,
      profileImage:true
    },
    where: {
      NOT: {
        id:userId
      }
    },
    orderBy: {
      createAt: "desc"
    }
  })
  return circle
}