import prisma from "../../../../prisma";

export const ThreadDetailLikes = async (id: string) => {
	const thread = await prisma.thread.findFirst({
		where: { id },
		select: {
			likeThread: {
				select: {
					likeBy: {
						select: {
							bio: true,
							username: true,
							displayName: true,
							profileImage: true,
						},
					},
				},
			},
		},
	});
	return thread;
};
