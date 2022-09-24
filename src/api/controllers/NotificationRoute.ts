import { Response200, Response204, Response400, Response404 } from "../helpers/Response";
import { notification, notificationDetail } from "../models/NotificationModel";

export const GetNotification = async (req: any, res: any) => {
	const userId = res.get("userId");
	const notifCount = await notification(userId);

	return Response200(res, notifCount);
};

export const DetailNotification = async (req: any, res: any) => {
	const userId = res.get("userId");

	const posts = await notificationDetail(userId);
	if (typeof posts === "string") return Response400(res, posts);
	return Response200(res, posts);
};
