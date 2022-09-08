import { singIn, signUp } from "../models/userModel";
import { Response200, Response400 } from "../helpers/Response";

export const getSignIn = async (req: any, res: any) => {
  const { username, password } = req.body;
  const signin = await singIn(username, password);

  if (typeof signin === "string") return Response400(res, signin);
  return Response200(res, signin);
};

export const getSignUp = async (req: any, res: any) => {
  const { username, email, password } = req.body;
  const signup = await signUp(username, email, password);

  if (typeof signup === "string") return Response400(res, signup);
  return Response200(res, signup);
};
