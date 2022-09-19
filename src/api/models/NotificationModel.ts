import prisma from "../../../prisma";
import { validationThreadLike } from "../validations/ThreadValidation";
import { validationShowcaseLike } from "../validations/ShowcaseValidation";

export const notification = async (userId: string) => {
	return await prisma.notifications.count({
		where: {
			NOT: {
				userNotif: userId,
			},
			targetId: userId,
			isView: false,
		},
	});
};

export const notificationDetail = async (userId: string, skip: number) => {
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
			where: {
				NOT: {
					userNotif: userId,
				},
				targetId: userId,
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
	if (status === "Like" && threadId !== "" && (await validationThreadLike(threadId, userId)) === -4) return;
	if (status === "Like" && showId !== "" && (await validationShowcaseLike(showId, userId)) === -4) return;

	let author: any = "";

	if (threadId) {
		author = await prisma.thread.findFirst({
			where: { id: threadId },
			select: {
				author: {
					select: { id: true },
				},
			},
		});
	} else {
		author = await prisma.showCase.findFirst({
			where: {
				id: showId,
			},
			select: {
				authorShowCase: { select: { id: true } },
			},
		});
	}

	author = author?.author || author?.authorShowCase;

	const targetId: any = author.id;

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
