import { Response200, Response204, Response400, Response404 } from "../helpers/Response";
import { populer } from "../models/PopulerModel";

export const GetPopuler = async (req: any, res: any) => {
	const populerList = await populer();
	return Response200(res, populerList);
};
