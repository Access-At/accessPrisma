import { bookmarkGet } from "./../models/BookmarkModel";
import { Response200, Response204, Response400, Response404 } from "../helpers/Response";

export const getBookmark = async (req: any, res: any) => {
	const userId = res.get("userId");

	const threads = await bookmarkGet(userId);
	if (typeof threads === "string") return Response400(res, threads);
	return Response200(res, threads);
};
