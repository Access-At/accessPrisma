import prisma from "../../../prisma";
import { Response401 } from "../helpers/Response";

const isAuthorized = async (req: any, res: any, next: any) => {
	try {
		const headerAuth = req.headers.authorization;
		const token = headerAuth.split(" ")[1];
		const user = await prisma.session.findFirst({ where: { token } });

		if (!user) return Response401(res, "Unauthorized");
		res.set("userId", user?.userId);
		next();
		// console.log(split[1]);
	} catch (error) {
		Response401(res, "Unauthorized");
	}
};

export default isAuthorized;
