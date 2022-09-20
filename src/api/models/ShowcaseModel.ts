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

export const showcase = async (skip: number) => {
	if ((await validationShowcase(skip)) === -1) return "Posts is empty";

	const showcase = await prisma.showCase.findMany({
		skip,
		take: 12,
		orderBy: { createAt: "desc" },
		include: {
			authorShowCase: {
				select: {
					displayName: true, username:true, profileImage:true
				},
			},
			_count: {
				select: { commentShowCase: true, saveShowCase: true, likeShowCase: true },
			},
		},
	});
	return showcase;
};

export const showcaseDetail = async (slug: string, userId: string, skip: number) => {
	if ((await validationShowcaseDetail(slug)) === -1) return "Showcase is empty";

	const showcaseId = await prisma.showCase.findFirst({
		where: { slug },
		select: { id: true, authorId: true },
	});

	const [showcase, skipDuplicates] = await prisma.$transaction([
		prisma.showCase.findFirstOrThrow({
			where: { slug },
			include: {
				authorShowCase: {
					select: {
						username: true,
						displayName: true,
					},
				},
				commentShowCase: {
					select: {
						description: true,
						createAt: true,
						commentBy: { select: { displayName: true, username: true } },
					},
					take: 15,
					skip,
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
		}),
		prisma.viewShowcase.findFirst({
			where: {
				AND: [{ userId }, { showcaseId: showcaseId?.id }],
			},
		}),
	]);

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

export const showcaseDetailLike = async (id: string, skip: number) => {
	if ((await validationShowcaseDetail(id)) === -1) return "Showcase is empty";

	const showcase = await prisma.showCase.findFirst({
		where: { id },
		include: {
			likeShowCase: {
				select: {
					likeBy: {
						select: {
							username: true,
							displayName: true,
							profileImage:true
						},
					},
				},
				take: 15,
				skip,
			},
		},
	});
	return showcase;
};

export const showcaseCreate = async (authorId: string, title: string, description: string, image: any, link: string, linked:any) => {
	if ((await validationShowcaseCreate(authorId, title, description, image, link)) === -1) return "Title can't be empty";
	if ((await validationShowcaseCreate(authorId, title, description, image, link)) === -2) return "Description can't be empty";
	if ((await validationShowcaseCreate(authorId, title, description, image, link)) === -3) return "Link can't be empty (empty ? #)";

	let images = image ? `${linked}/${image.path.replace(/\\/g, "/").replace("public/", "")}` : null


	const slug = slugify(title, {
		replacement: "-",
		remove: undefined,
		lower: true,
		strict: true,
		trim: true,
	});
	const showcaseCreate = await prisma.showCase.create({
		data: {
			authorId,
			title,
			slug,
			description,
			image : images,
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

export const showcaseUpdate = async (showCaseId: string, authorId: string, title: string, description: string, image:any, link:string,linked:any) => {
	if ((await validationShowcaseUpdate(showCaseId, authorId, title, description, image,link)) === -1)
		return "showCaseId, authorId, title,description can't be empty";
	if ((await validationShowcaseUpdate(showCaseId, authorId, title, description, image,link)) === -2) return "showcaseId can't find";
	if ((await validationShowcaseUpdate(showCaseId, authorId, title, description, image,link)) === -3) return "userId can't find";

	let images = image ? `${linked}/${image.path.replace(/\\/g, "/").replace("public/", "")}` : null
	const slugs = slugify(title, {
		replacement: "-",
		remove: undefined,
		lower: true,
		strict: true,
		trim: true,
	});
  

	const update = await prisma.showCase.updateMany({
		where: { 
			// id: showCaseId,
			AND : [
				{
				id: showCaseId,
				authorId
				},
			]
		},
		data: {
			title,
			slug: slugs,
			description,
			image: images,
			link
		},
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
