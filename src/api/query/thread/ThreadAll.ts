import prisma from "../../../../prisma";

export const allThreadQuery = async (skip: number) => {
	// const randomPick = (values: string[]) => {
	// 	const random = Math.floor(Math.random() * values.length);
	// 	return values[random];
	// };
	// const orderBy = randomPick(["id", "description", "createAt", "updateAt"]);
	// const orderRandom = randomPick([`asc`, `desc`]);
	// const q = req.query
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
		},
	});
	return thread;
};
