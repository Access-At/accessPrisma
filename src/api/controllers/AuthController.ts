import { Response200, Response400 } from "../helpers/Response";
import { signIn, signOut, signUp } from "../models/UserModel";

export const GetSignIn = async (req: any, res: any) => {
	const { username, password } = req.body;
	const signin = await signIn(username, password);

	if (typeof signin === "string") return Response400(res, signin);
	return Response200(res, signin);
};

export const GetSignUp = async (req: any, res: any) => {
	const { username, email, password } = req.body;
	const signup = await signUp(username, email, password);

	if (typeof signup === "string") return Response400(res, signup);
	return Response200(res, signup);
};

export const GetSignOut = async (req: any, res: any) => {
	const signout = await signOut(res.get("userId"));
	if (typeof signout === "string") return Response400(res, signout);
	return Response200(res, signout);
};
