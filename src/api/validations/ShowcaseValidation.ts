import prisma from "../../../prisma";
import validator from "validator";

export const validationShowcase = async (skip: number) => {
	const showcase = await prisma.showCase.findMany({
		skip,
		take: 12,
		orderBy: { createAt: "desc" },
	});
	if (!showcase.length) return -1;
};

export const validationShowcaseDetail = async (slug: string) => {
	const showcase = await prisma.showCase.findFirstOrThrow({ where: { slug } });
	if (!showcase) return -1;
};

export const validationShowcaseCreate = async (authorId: string, title: string, description: string, image:any) => {
	if (!authorId || !title) return -1;
	if (!authorId || !description) return -2;
	if (!authorId || !image) return -3;
};

export const validationShowcaseLike = async (showCaseId: string, userId: string) => {
	if (!showCaseId || !userId) return -1;
	const showcase = await prisma.showCase.findFirst({
		where: {
			id: showCaseId,
		},
	});
	if (!showcase) return -2;
	const user = await prisma.user.findFirst({
		where: {
			id: userId,
		},
	});

	if (!user) return -3;
	const isLike = await prisma.likeShowCase.findFirst({
		where: {
			AND: [
				{
					showCaseId,
				},
				{
					userId,
				},
			],
		},
	});
	if (isLike) return -4;
};

export const validationShowcaseSave = async (showCaseId: string, userId: string) => {
	if (!showCaseId || !userId) return -1;
	const showcase = await prisma.showCase.findFirst({
		where: {
			id: showCaseId,
		},
	});
	if (!showcase) return -2;
	const user = await prisma.user.findFirst({
		where: {
			id: userId,
		},
	});

	if (!user) return -3;
	const isSave = await prisma.saveShowCase.findFirst({
		where: {
			AND: [
				{
					showCaseId,
				},
				{
					userId,
				},
			],
		},
	});
	if (isSave) return -4;
};

export const validationShowcaseUpdate = async (
	showCaseId: string,
	authorId: string,
	title: string,
	description: string
) => {
	if (!showCaseId || !authorId || !title || !description) return -1;

	const showcase = await prisma.showCase.findFirst({ where: { id: showCaseId } });
	if (!showcase) return -2;

	const user = await prisma.showCase.findFirst({ where: { authorId } });
	if (!user) return -3;
};

export const validationShowcaseDelete = async (showcaseId: string, authorId: string) => {
	if (!showcaseId || !authorId) return -1;

	const showcase = await prisma.showCase.findFirst({ where: { id: showcaseId } });
	if (!showcase) return -2;

	const user = await prisma.showCase.findFirst({ where: { authorId } });
	if (!user) return -3;
};

export const validationShowcaseComment = async (showcaseId: string, userId: string, description: string) => {
	if (!showcaseId || !userId || !description) return -1;

	const showcase = await prisma.showCase.findFirst({ where: { id: showcaseId } });
	if (!showcase) return -2;
};
