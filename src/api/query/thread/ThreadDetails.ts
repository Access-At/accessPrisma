import prisma from "../../../../prisma";

export const ThreadDetails = async (id: string) => {
	const thread = await prisma.thread.findFirst({
		where: { id },
		include: {
			author: { select: { displayName: true, username: true, profileImage: true } },
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
