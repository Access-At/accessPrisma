import prisma from "../../../prisma";
import validator from "validator";

export const validationThread = async (skip: number) => {
	const thread = await prisma.thread.findMany({
		skip,
		take: 12,
		orderBy: { createAt: "desc" },
	});
	if (!thread.length) return -1;
};

export const validationThreadDetail = async (id: string) => {
	const thread = await prisma.thread.findFirst({ where: { id } });
	if (!thread) return -1;
};

export const validationThreadCreate = async (authorId: string, description: string) => {
	if (!authorId || !description) return -1;
};

export const validationThreadLike = async (threadId: string, userId: string) => {
	if (!threadId || !userId) return -1;
	const thread = await prisma.thread.findFirst({
		where: {
			id: threadId,
		},
	});
	if (!thread) return -2;
	const user = await prisma.user.findFirst({
		where: {
			id: userId,
		},
	});

	if (!user) return -3;
	const isLike = await prisma.likeThread.findFirst({
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
	if (isLike) return -4;
};

export const validationThreadSave = async (threadId: string, userId: string) => {
	if (!threadId || !userId) return -1;
	const thread = await prisma.thread.findFirst({
		where: {
			id: threadId,
		},
	});
	if (!thread) return -2;
	const user = await prisma.user.findFirst({
		where: {
			id: userId,
		},
	});

	if (!user) return -3;
	const isSave = await prisma.saveThread.findFirst({
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
	if (isSave) return -4;
};

export const validationThreadUpdate = async (threadId: string, authorId: string, description: string) => {
	if (!threadId || !authorId || !description) return -1;

	const thread = await prisma.thread.findFirst({ where: { id: threadId } });
	if (!thread) return -2;

	const user = await prisma.thread.findFirst({ where: { authorId } });
	if (!user) return -3;
};

export const validationThreadDelete = async (threadId: string, authorId: string) => {
	if (!threadId || !authorId) return -1;

	const thread = await prisma.thread.findFirst({ where: { id: threadId } });
	if (!thread) return -2;

	const user = await prisma.thread.findFirst({ where: { authorId } });
	if (!user) return -3;
};

export const validationThreadComment = async (threadId: string, userId: string, description: string) => {
	if (!threadId || !userId || !description) return -1;

	const thread = await prisma.thread.findFirst({ where: { id: threadId } });
	if (!thread) return -2;
};
