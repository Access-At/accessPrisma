import prisma from "../../../../prisma";

export const ThreadDetailLikes = async (id:string, skip: number) => {
  const thread = await prisma.thread.findFirst({
		where: { id },
		include: {
			likeThread: {
				select: {
					likeBy: {
						select: {
							bio: true,
							username: true,
							displayName: true,
						},
					},
				},
				take: 15,
				skip,
			},
		},
	});
  return thread
}