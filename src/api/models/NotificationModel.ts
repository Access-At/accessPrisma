import prisma from "../../../prisma";
import { validationThreadLike } from "../validations/ThreadValidation";

export const notification = async (userId: string) => {
	return await prisma.notifications.count({ where: { targetId: userId } });
};

export const notificationDetail = async (skip: number) => {
	const [notif, seeall] = await prisma.$transaction([
		prisma.notifications.findMany({
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
		}),
		prisma.notifications.updateMany({
			where: { isView: false },
			data: {
				isView: true,
			},
		}),
	]);

	return notif;
};

export const notificationSend = async (
	userId: string,
	description: string,
	showId: any,
	threadId: any,
	status: any
) => {
	if ((await validationThreadLike(threadId, userId)) === -4) return;
	// if ((await validationThreadLike(threadId, userId)) === -4) return; // check like showcase

	const authorThread = await prisma.thread.findFirst({
		where: { id: threadId },
		select: {
			author: {
				select: { id: true },
			},
		},
	});
	const targetId: any = authorThread?.author.id;

	let data: any = {
		userNotif: userId,
		status,
		targetId,
	};

	if (showId) data = { showId, ...data };
	if (threadId) data = { threadId, ...data };
	if (description) data = { description, ...data };

	const notif = await prisma.notifications.create({
		data,
	});

	return notif;
};
