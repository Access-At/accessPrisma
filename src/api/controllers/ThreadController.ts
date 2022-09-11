import {
	getAllThread,
	getTreadDetail,
	getThreadCreate,
	threadDelete,
	thisThreadLikes,
	threadUpdate,
	threadSave,
	threadComment,
	getThreadDetailLike,
} from "./../models/ThreadModel";
import { Response200, Response204, Response400, Response404 } from "../helpers/Response";

export const GetAllThread = async (req: any, res: any) => {
	let { skip } = req.params;
	if (skip) skip = parseInt(skip);

	const posts = await getAllThread(skip);
	if (typeof posts === "string") return Response400(res, posts);
	return Response200(res, posts);
};

export const DetailThread = async (req: any, res: any) => {
	let { id, skip } = req.params;
	if (skip) skip = parseInt(skip);
	if (!id) return Response404(res, "Not Found Thread");
	const posts = await getTreadDetail(id, skip);
	if (typeof posts === "string") return Response400(res, posts);
	return Response200(res, posts);
};

export const DetailThreadLike = async (req: any, res: any) => {
	let { id, skip } = req.params;
	if (skip) skip = parseInt(skip);
	if (!id) return Response404(res, "Not Found Thread");

	const posts = await getThreadDetailLike(id, skip);
	if (typeof posts === "string") return Response400(res, posts);
	return Response200(res, posts);
};

export const CreateThread = async (req: any, res: any) => {
	const { description } = req.body;
	const authorId = res.get("userId");

	const threads = await getThreadCreate(authorId, description);
	if (typeof threads === "string") return Response400(res, threads);
	return Response200(res, threads);
};

export const UpdateThread = async (req: any, res: any) => {
	const { threadId, description } = req.body;
	const authorId = res.get("userId");

	const updateThread = await threadUpdate(threadId, authorId, description);
	if (typeof updateThread === "string") return Response400(res, updateThread);
	return Response200(res, updateThread);
};

export const DeleteThread = async (req: any, res: any) => {
	const { threadId } = req.body;
	const authorId = res.get("userId");

	const deleteThread = await threadDelete(threadId, authorId);
	if (typeof deleteThread === "string") return Response400(res, deleteThread);
	return Response204(res);
};

export const LikeThread = async (req: any, res: any) => {
	const { threadId } = req.body;
	const authorId = res.get("userId");

	const threads = await thisThreadLikes(threadId, authorId);
	if (typeof threads === "string") return Response400(res, threads);
	return Response200(res, threads);
};

export const SaveThread = async (req: any, res: any) => {
	const { threadId } = req.body;
	const authorId = res.get("userId");

	const threads = await threadSave(threadId, authorId);
	if (typeof threads === "string") return Response400(res, threads);
	return Response200(res, threads);
};

export const CommentThread = async (req: any, res: any) => {
	const { threadId, description } = req.body;
	const userId = res.get("userId");

	const commentThread = await threadComment(threadId, userId, description);
	if (typeof commentThread === "string") return Response400(res, commentThread);
	return Response200(res, commentThread);
};
