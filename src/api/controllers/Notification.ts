import { Response200, Response204, Response400, Response404 } from "../helpers/Response";
import { notification, notificationDetail } from "../models/Notification";

export const GetNotification = async (req: any, res: any) => {
	const userId = res.get("userId");
	const notifCount = await notification(userId);

	return Response200(res, notifCount);
};

export const DetailNotification = async (req: any, res: any) => {
	let { skip } = req.params;
	if (skip) skip = parseInt(skip);
	// if (!id) return Response404(res, "Not Found Thread");

	const posts = await notificationDetail(skip);
	if (typeof posts === "string") return Response400(res, posts);
	return Response200(res, posts);
};
