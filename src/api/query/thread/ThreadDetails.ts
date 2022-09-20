import prisma from "../../../../prisma";
import { createPaginator } from "prisma-pagination";

export const ThreadDetails = async (id: string, skip: number) => {
	const paginate = createPaginator({ perPage: 12 });

	const thread = await paginate(prisma.thread, {
		where: { id },
		include: {
			author: { select: { displayName: true, username: true, profileImage:true } },
			commentThread: {
				select: {
					description: true,
					createAt: true,
					commentBy: { select: { displayName: true, username: true } },
				},
			},
			_count: {
				select: { commentThread: true, saveThread: true, likeThread: true },
			},
		},
	});

	return thread;
};
