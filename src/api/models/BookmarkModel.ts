import prisma from "../../../prisma";
import { createPaginator } from "prisma-pagination";

export const bookmarkGet = async (userId: string, skip: number) => {
	const paginate = createPaginator({ perPage: 12 });

	const result = await paginate(
		prisma.user,
		{
			where: { id: userId },
			include: {
				saveThread: {
					where: { userId },
					include: {
						thread: {
							select: {
								author: { select: { displayName: true, username: true, profileImage: true } },
								description: true,
								createAt: true,
							},
						},
					},
				},
				SaveShowCase: {
					where: { userId },
					include: {
						showCase: {
							select: {
								authorShowCase: { select: { displayName: true, username: true, profileImage: true } },
								title: true,
								description: true,
								createAt: true,
								slug: true,
							},
						},
					},
				},
			},
		},
		{ page: skip }
	);
	return result;

	// const bookmark = await prisma.user.findFirst({
	// 	where: { id: userId },
	// 	include: {
	// 		saveThread: {
	// 			take: 12,
	// 			skip,
	// 			where: { userId },
	// 			include: {
	// 				thread: {
	// 					select: {
	// 						author: { select: { displayName: true, username: true, profileImage: true } },
	// 						description: true,
	// 						createAt: true,
	// 					},
	// 				},
	// 			},
	// 		},
	// 		SaveShowCase: {
	// 			take: 12,
	// 			skip,
	// 			where: { userId },
	// 			include: {
	// 				showCase: {
	// 					select: {
	// 						authorShowCase: { select: { displayName: true, username: true, profileImage: true } },
	// 						title: true,
	// 						description: true,
	// 						createAt: true,
	// 						slug: true,
	// 					},
	// 				},
	// 			},
	// 		},
	// 	},
	// });

	// const userWithoutPassword = exclude(bookmark, "password");

	// return bookmark;
};
