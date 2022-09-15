import prisma from "../../../../prisma";

export const allThreadQuery = async (res:any, req:any,skip: number) => {
	const thread = await prisma.thread.findMany({
		skip,
		take: 12,
		orderBy: { createAt: "desc" },
		include: {
			author: { select: { displayName: true, username: true } },
			_count: {
				select: { commentThread: true, saveThread: true, likeThread: true },
			},
			likeThread: {
				select: { userId: true },
			},
			saveThread: {
				select: { userId: true },
			},
		},
	});
	return thread;
};
