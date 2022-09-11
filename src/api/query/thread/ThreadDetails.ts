import prisma from "../../../../prisma";

export const ThreadDetails = async (id:string, skip: number) => {
 const thread = await prisma.thread.findFirst({
		where: { id },
		include: {
			author: { select: { displayName: true, username:true } },
			commentThread: {
				select: {
					description: true,
					createAt: true,
					commentBy: { select: { displayName: true, username: true } },
				},
				take: 15,
				skip,
			},
			_count: {
				select: { commentThread: true, saveThread: true, likeThread: true },
			},
		},
	});
  return thread
}