import {
	showcase,
	showcaseDetail,
	showcaseCreate,
	showcaseDelete,
	showcaseLikes,
	showcaseUpdate,
	showcaseSave,
	showcaseComment,
	showcaseDetailLike,
} from "./../models/ShowcaseModel";
import { Response200, Response204, Response400, Response404 } from "../helpers/Response";

export const GetAllShowcase = async (req: any, res: any) => {
	let { skip } = req.params;
	if (skip) skip = parseInt(skip);

	const posts = await showcase(skip);
	if (typeof posts === "string") return Response400(res, posts);
	return Response200(res, posts);
};

export const DetailShowcase = async (req: any, res: any) => {
	let { slug, skip } = req.params;
	if (skip) skip = parseInt(skip);
	if (!slug) return Response404(res, "Not Found Showcase");

	const userId = res.get("userId");

	const posts = await showcaseDetail(slug, userId, skip);
	if (typeof posts === "string") return Response400(res, posts);
	return Response200(res, posts);
};

export const DetailShowcaseLike = async (req: any, res: any) => {
	let { id, skip } = req.params;
	if (skip) skip = parseInt(skip);
	if (!id) return Response404(res, "Not Found Showcase");

	const posts = await showcaseDetailLike(id, skip);
	if (typeof posts === "string") return Response400(res, posts);
	return Response200(res, posts);
};

export const CreateShowcase = async (req: any, res: any) => {
	const { title, description, link } = req.body;
	const authorId = res.get("userId");
	// const image = req.file;
	// const linked = `${req.protocol}://${req.get("host")}`;

	const showcases = await showcaseCreate(authorId, title, description, link);
	if (typeof showcases === "string") return Response400(res, showcases);
	return Response200(res, showcases);
};

export const UpdateShowcase = async (req: any, res: any) => {
	const { showcaseId, title, description, link } = req.body;
	const authorId = res.get("userId");
	const image = req.file;
	const linked = `${req.protocol}://${req.get("host")}`;
	const updateShowcase = await showcaseUpdate(showcaseId, authorId, title, description, image, link, linked);
	if (typeof updateShowcase === "string") return Response400(res, updateShowcase);
	// if (error) return Response400(res, error);
	return Response200(res, updateShowcase);
};

export const DeleteShowcase = async (req: any, res: any) => {
	const { showcaseId } = req.body;
	const authorId = res.get("userId");

	const deleteShowcase = await showcaseDelete(showcaseId, authorId);
	if (typeof deleteShowcase === "string") return Response400(res, deleteShowcase);
	return Response204(res);
};

export const LikeShowcase = async (req: any, res: any) => {
	const { showcaseId } = req.body;
	const authorId = res.get("userId");

	const showcases = await showcaseLikes(showcaseId, authorId);
	if (typeof showcases === "string") return Response400(res, showcases);
	return Response200(res, showcases);
};

export const SaveShowcase = async (req: any, res: any) => {
	const { showcaseId } = req.body;
	const authorId = res.get("userId");

	const showcases = await showcaseSave(showcaseId, authorId);
	if (typeof showcases === "string") return Response400(res, showcases);
	return Response200(res, showcases);
};

export const CommentShowcase = async (req: any, res: any) => {
	const { showcaseId, description } = req.body;
	const userId = res.get("userId");

	const commentShowcase = await showcaseComment(showcaseId, userId, description);
	if (typeof commentShowcase === "string") return Response400(res, commentShowcase);
	return Response200(res, commentShowcase);
};
