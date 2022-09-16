import prisma from "../../../prisma";

export const bookmarkGet = async (userId: string, skip: number) => {
	const bookmark = await prisma.user.findMany({
		where: { id: userId },
		include: {
			saveThread: {
				take: 12,
				skip,
				where: { userId },
				include: {
					thread: {
						select: {
							author: { select: { displayName: true, username: true } },
							description: true,
							createAt: true,
						},
					},
				},
			},
			SaveShowCase: {
				take: 12,
				skip,
				where: { userId },
				include: {
					showCase: {
						select: {
							authorShowCase: { select: { displayName: true, username: true } },
							title: true,
							description: true,
							createAt: true,
							slug: true,
						},
					},
				},
			},
		},
	});

	// const userWithoutPassword = exclude(bookmark, "password");

	return bookmark;
};
