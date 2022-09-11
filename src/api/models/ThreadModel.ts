
import {
	validationThreadCreate,
	validationThreadDelete,
	validationThreadLike,
	validationThreadUpdate,
	validationThreadSave,
	validationThreadComment,
	validationThreadDetail,
} from "./../validations/ThreadValidation";
import prisma from "../../../prisma";
import { validationThread } from "../validations/ThreadValidation";
import { notificationCreate } from "./NotificationModel";
import { allThreadQuery } from "../query/thread/ThreadAll";

export const thread = async (skip: number) => {
	if ((await validationThread(skip)) === -1) return "Posts is empty";

	const threadsQueryAll = await allThreadQuery(skip)
	return threadsQueryAll;
};

export const threadDetail = async (id: string, skip: number) => {
	if ((await validationThreadDetail(id)) === -1) return "Thread is empty";

	const thread = await prisma.thread.findFirst({
		where: { id },
		include: {
			author: { select: { displayName: true, username:true } },
			commentThread: {
				select: {
					description: true,
					createAt: true,
					commentBy: { select: { displayName: true, username: true } },
				},
				take: 15,
				skip,
			},
			_count: {
				select: { commentThread: true, saveThread: true, likeThread: true },
			},
		},
	});
	return thread;
};

export const threadDetailLike = async (id: string, skip: number) => {
	if ((await validationThreadDetail(id)) === -1) return "Thread is empty";

	const thread = await prisma.thread.findFirst({
		where: { id },
		include: {
			likeThread: {
				select: {
					likeBy: {
						select: {
							bio: true,
							username: true,
							displayName: true,
						},
					},
				},
				take: 15,
				skip,
			},
		},
	});
	return thread;
};

export const threadCreate = async (authorId: string, description: string) => {
	if ((await validationThreadCreate(authorId, description)) === -1) return "Description can't be empty";

	const threadCreate = await prisma.thread.create({
		data: {
			authorId,
			description,
		},
	});
	return threadCreate;
};

export const threadLikes = async (threadId: string, userId: string) => {
	if ((await validationThreadLike(threadId, userId)) === -1) return "Can't be empty";
	if ((await validationThreadLike(threadId, userId)) === -2) return "Can't find thread";
	if ((await validationThreadLike(threadId, userId)) === -3) return "Can't find user";
	if ((await validationThreadLike(threadId, userId)) === -4) {
		const disLike = await prisma.likeThread.deleteMany({
			where: {
				AND: [
					{
						threadId,
					},
					{
						userId,
					},
				],
			},
		});
		return disLike;
	}

	const threadLike = await prisma.likeThread.create({
		data: {
			threadId,
			userId,
		},
	});

	await notificationCreate(userId, "", "", threadId, "Like");

	return threadLike;
};

export const threadSave = async (threadId: string, userId: string) => {
	if ((await validationThreadSave(threadId, userId)) === -1) return "Can't be empty";
	if ((await validationThreadSave(threadId, userId)) === -2) return "Can't find thread";
	if ((await validationThreadSave(threadId, userId)) === -3) return "Can't find user";

	if ((await validationThreadSave(threadId, userId)) === -4) {
		const disSave = await prisma.saveThread.deleteMany({
			where: {
				AND: [
					{
						threadId,
					},
					{
						userId,
					},
				],
			},
		});
		return disSave;
	}

	const threadSave = await prisma.saveThread.create({
		data: {
			threadId,
			userId,
		},
	});
	return threadSave;
};

export const threadUpdate = async (threadId: string, authorId: string, description: string) => {
	if ((await validationThreadUpdate(threadId, authorId, description)) === -1)
		return "threadId, authorId, description can't be empty";
	if ((await validationThreadUpdate(threadId, authorId, description)) === -2) return "threadId can't find";
	if ((await validationThreadUpdate(threadId, authorId, description)) === -3) return "userId can't find";
	const update = await prisma.thread.update({
		where: { id: threadId },
		data: {
			description,
		},
	});

	return update;
};

export const threadDelete = async (threadId: string, authorId: string) => {
	if ((await validationThreadDelete(threadId, authorId)) === -1) return "threadId and authorId can't be empty";
	if ((await validationThreadDelete(threadId, authorId)) === -2) return "threadId can't find";
	if ((await validationThreadDelete(threadId, authorId)) === -3) return "userId can't find";

	const deleted = await prisma.thread.delete({ where: { id: threadId } });
	return deleted;
};

export const threadComment = async (threadId: string, userId: string, description: string) => {
	if ((await validationThreadComment(threadId, userId, description)) === -1)
		return "threadId, authorId, description can't be empty";
	if ((await validationThreadComment(threadId, userId, description)) === -2) return "threadId can't find";

	const threadComment = await prisma.commentThread.create({
		data: {
			threadId,
			userId,
			description,
		},
	});

	await notificationCreate(userId, description, "", threadId, "Comment");

	return threadComment;
};
