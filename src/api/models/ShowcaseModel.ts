import {
	validationShowcase,
	validationShowcaseDetail,
	validationShowcaseCreate,
	validationShowcaseLike,
	validationShowcaseSave,
	validationShowcaseUpdate,
	validationShowcaseDelete,
	validationShowcaseComment,
} from "./../validations/ShowcaseValidation";
import prisma from "../../../prisma";
import { notificationSend } from "./NotificationModel";
import slugify from "slugify";
import { createPaginator } from "prisma-pagination";

const paginate = createPaginator({ perPage: 12 });

export const showcase = async (skip: number) => {
	if ((await validationShowcase(skip)) === -1) return "Showcase is empty";
	const paginate = createPaginator({ perPage: 12 });

	const result = await paginate(
		prisma.showCase,
		{
			orderBy: { createAt: "desc" },
			include: {
				authorShowCase: {
					select: {
						displayName: true,
						username: true,
						profileImage: true,
					},
				},
				_count: {
					select: { commentShowCase: true, saveShowCase: true, likeShowCase: true },
				},
			},
		},
		{ page: skip }
	);

	// const showcase = await prisma.showCase.findMany({
	// 	skip,
	// 	take: 12,
	// 	orderBy: { createAt: "desc" },
	// 	include: {
	// 		authorShowCase: {
	// 			select: {
	// 				displayName: true, username:true, profileImage:true
	// 			},
	// 		},
	// 		_count: {
	// 			select: { commentShowCase: true, saveShowCase: true, likeShowCase: true },
	// 		},
	// 	},
	// });
	return result;
};

export const showcaseDetail = async (slug: string, userId: string) => {
	if ((await validationShowcaseDetail(slug)) === -1) return "Showcase is empty";

	const showcaseId = await prisma.showCase.findFirst({
		where: { slug },
		select: { id: true, authorId: true },
	});

	const skipDuplicates = await prisma.viewShowcase.findFirst({
		where: {
			AND: [{ userId }, { showcaseId: showcaseId?.id }],
		},
	});

	const showcase = await prisma.showCase.findFirst({
		where: { slug },
		include: {
			authorShowCase: {
				select: {
					username: true,
					displayName: true,
					profileImage: true,
				},
			},
			_count: {
				select: { commentShowCase: true, saveShowCase: true, likeShowCase: true },
			},
			likeShowCase: {
				select: { userId: true },
			},
			saveShowCase: {
				select: { userId: true },
			},
		},
	});

	if (!skipDuplicates) {
		await prisma.viewShowcase.create({
			data: {
				userId,
				showcaseId: showcaseId?.id,
			},
		});
	}

	return showcase;
};

export const showcaseDetailLike = async (slug: string) => {
	if ((await validationShowcaseDetail(slug)) === -1) return "Showcase is empty";

	const showcaseId = await prisma.showCase.findFirst({
		where: { slug },
	});

	const showcase = await prisma.showCase.findFirst({
		where: { slug },
		select: {
			likeShowCase: {
				select: {
					likeBy: {
						select: {
							displayName: true,
							username: true,
							bio: true,
							profileImage: true,
						},
					},
				},
			},
		},
	});

	return showcase;
};

export const showcaseDetailComment = async (slug: string, skip: number) => {
	if ((await validationShowcaseDetail(slug)) === -1) return "Showcase is empty";

	const showcaseId = await prisma.showCase.findFirst({
		where: { slug },
	});

	const showcase = await paginate(
		prisma.commentShowCase,
		{
			where: { showCaseId: showcaseId?.id },
			select: {
				commentBy: { select: { displayName: true, username: true, profileImage: true } },
				description: true,
				createAt: true,
			},
			orderBy: { createAt: "desc" },
		},
		{ page: skip }
	);

	return showcase;
};

export const showcaseCreate = async (authorId: string, title: string, description: string, link: string) => {
	if ((await validationShowcaseCreate(authorId, title, description, link)) === -1) return "Title can't be empty";
	if ((await validationShowcaseCreate(authorId, title, description, link)) === -2) return "Description can't be empty";
	if ((await validationShowcaseCreate(authorId, title, description, link)) === -3)
		return "Link can't be empty (empty ? #)";
	if ((await validationShowcaseCreate(authorId, title, description, link)) === -4) return "Input link valid!";

	// let images = image ? `${linked}/${image.path.replace(/\\/g, "/").replace("public/", "")}` : null;
	if (title.length < 3) return "Title min 3 character ";

	const slug = slugify(title, {
		replacement: "-",
		lower: true,
		strict: true,
		trim: true,
	});

	const showcaseCheck = await prisma.showCase.findFirst({
		where: { slug },
	});

	if (showcaseCheck) return "the title of the showcase is the same another showcase";

	const showcaseCreate = await prisma.showCase.create({
		data: {
			authorId,
			title,
			slug,
			description,
			link,
		},
	});
	return showcaseCreate;
};

export const showcaseLikes = async (showCaseId: string, userId: string) => {
	if ((await validationShowcaseLike(showCaseId, userId)) === -1) return "Can't be empty";
	if ((await validationShowcaseLike(showCaseId, userId)) === -2) return "Can't find showCaseId";
	if ((await validationShowcaseLike(showCaseId, userId)) === -3) return "Can't find user";
	if ((await validationShowcaseLike(showCaseId, userId)) === -4) {
		const disLike = await prisma.likeShowCase.deleteMany({
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
		return disLike;
	}

	await notificationSend(userId, "", showCaseId, "", "Like");

	const showcaseLike = await prisma.likeShowCase.create({
		data: {
			showCaseId,
			userId,
		},
	});

	return showcaseLike;
};

export const showcaseSave = async (showCaseId: string, userId: string) => {
	if ((await validationShowcaseSave(showCaseId, userId)) === -1) return "Can't be empty";
	if ((await validationShowcaseSave(showCaseId, userId)) === -2) return "Can't find thread";
	if ((await validationShowcaseSave(showCaseId, userId)) === -3) return "Can't find user";

	if ((await validationShowcaseSave(showCaseId, userId)) === -4) {
		const disSave = await prisma.saveShowCase.deleteMany({
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
		return disSave;
	}

	const showcaseSave = await prisma.saveShowCase.create({
		data: {
			showCaseId,
			userId,
		},
	});
	return showcaseSave;
};

export const showcaseUpdate = async (
	showCaseId: string,
	authorId: string,
	title: string,
	description: string,
	imageData: any,
	link: string,
	linked: any
) => {
	if ((await validationShowcaseUpdate(showCaseId, authorId, title, description, link)) === -1)
		return "showCaseId, authorId, title,description can't be empty";
	if ((await validationShowcaseUpdate(showCaseId, authorId, title, description, link)) === -2)
		return "showcaseId can't find";
	if ((await validationShowcaseUpdate(showCaseId, authorId, title, description, link)) === -3)
		return "userId can't find";

	let images: any = imageData ? `${linked}/${imageData.path.replace(/\\/g, "/").replace("public/", "")}` : null;
	const slugs = slugify(title, {
		replacement: "-",
		remove: undefined,
		lower: true,
		strict: true,
		trim: true,
	});

	let data: any = {
		title,
		slug: slugs,
		description,
		link,
	};

	if (images) data = { ...data, image: images };

	const update = await prisma.showCase.updateMany({
		where: {
			// id: showCaseId,
			AND: [
				{
					id: showCaseId,
					authorId,
				},
			],
		},
		data,
	});

	return update;
};

export const showcaseDelete = async (showCaseId: string, authorId: string) => {
	if ((await validationShowcaseDelete(showCaseId, authorId)) === -1) return "showcaseId and authorId can't be empty";
	if ((await validationShowcaseDelete(showCaseId, authorId)) === -2) return "showcaseId can't find";
	if ((await validationShowcaseDelete(showCaseId, authorId)) === -3) return "userId can't find";
	const deleted = await prisma.showCase.delete({
		where: {
			id: showCaseId,
		},
	});
	return deleted;
};

export const showcaseComment = async (showCaseId: string, userId: string, description: string) => {
	if ((await validationShowcaseComment(showCaseId, userId, description)) === -1)
		return "showCaseId, authorId, description can't be empty";
	if ((await validationShowcaseComment(showCaseId, userId, description)) === -2) return "showCaseId can't find";

	await notificationSend(userId, description, showCaseId, "", "Comment");

	const showcaseComment = await prisma.commentShowCase.create({
		data: {
			showCaseId,
			userId,
			description,
		},
	});

	return showcaseComment;
};
