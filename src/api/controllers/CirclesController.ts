import { Response200, Response204, Response400, Response404 } from "../helpers/Response";
import { circles } from "../models/CirclesModel";

export const GetAllCircles = async (req: any, res: any) => {
  let { skip } = req.params;
  if (skip) skip = parseInt(skip);

  const userId = res.get("userId");

  const circle = await circles(userId,skip);
	return Response200(res, circle);
}