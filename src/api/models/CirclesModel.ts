import prisma from "../../../prisma";
import { createPaginator } from "prisma-pagination";

export const circles = async (userId: string, skip: number) => {
  
  const paginate = createPaginator({ perPage: 12 });

	const result = await paginate(
		prisma.user,
		{
			orderBy: { createAt: "desc" },
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
		},
		{ page: skip }
	);
  // const circle = await prisma.user.findMany({
  //   take: 15,
  //   skip,
  //   select: {
  //     id: true,
  //     displayName: true,
  //     username: true,
  //     bio: true,
  //     profileImage:true
  //   },
  //   where: {
  //     NOT: {
  //       id:userId
  //     }
  //   },
  //   orderBy: {
  //     createAt: "desc"
  //   }
  // })
  return result
}