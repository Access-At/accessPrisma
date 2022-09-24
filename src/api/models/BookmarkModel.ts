import prisma from "../../../prisma";

export const bookmarkGet = async (userId: string) => {
	const bookmark = await prisma.user.findFirst({
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
							image: true,
						},
					},
				},
			},
		},
	});

	return bookmark;
};
