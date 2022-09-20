import prisma from "../../../../prisma";
import { createPaginator } from "prisma-pagination";

export const allThreadQuery = async (res: any, req: any, skip: number) => {
	const paginate = createPaginator({ perPage: 12 });

	const result = await paginate(
		prisma.thread,
		{
			orderBy: { createAt: "desc" },
			include: {
				author: { select: { displayName: true, username: true , profileImage:true } },
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
		},
		{ page: skip }
	);
	return result;

	// const thread = await prisma.thread.findMany({
	// 	skip,
	// 	take: 12,
	// 	orderBy: { createAt: "desc" },
	// 	include: {
	// 		author: { select: { displayName: true, username: true } },
	// 		_count: {
	// 			select: { commentThread: true, saveThread: true, likeThread: true },
	// 		},
	// 		likeThread: {
	// 			select: { userId: true },
	// 		},
	// 		saveThread: {
	// 			select: { userId: true },
	// 		},
	// 	},
	// });
	// return thread;
};
