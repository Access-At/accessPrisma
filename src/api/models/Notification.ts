import prisma from "../../../prisma";

export const notification = async (userId: string) => {
	return await prisma.notifications.count({ where: { targetId: userId } });
};

export const notificationDetail = async (skip: number) => {
	const notif = await prisma.notifications.findMany({
		skip,
		take: 15,
		orderBy: { createAt: "desc" },
		select: {
			status: true,
			notifBy: {
				select: { displayName: true },
			},
			targetThread: { select: { id: true } },
			targetShow: { select: { id: true } },
			description: true,
		},
	});
	return notif;
};

export const notificationCreate = async (
	userId: string,
	description: string,
	showId: string,
	threadId: string,
	targetId: string,
	status: any
) => {
	const notif = await prisma.notifications.create({
		data: {
			userId,
			targetId,
			description,
			showId,
			threadId,
			status,
		},
	});
};
