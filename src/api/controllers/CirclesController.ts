import { Response200, Response204, Response400, Response404 } from "../helpers/Response";
import { circles } from "../models/CirclesModel";

export const GetAllCircles = async (res:any) => {
  
  const circle = await circles();
	return Response200(res, circle);
}