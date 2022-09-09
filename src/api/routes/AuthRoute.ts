import { Router } from "express";
import { GetSignIn, GetSignUp, GetSignOut } from "../controllers/AuthController";
import isAuthorized from "../middlewares/isAuthorized";

const route = Router();

route.post("/auth/sign-up", GetSignUp);
route.post("/auth/sign-in", GetSignIn);
route.post("/auth/sign-out", isAuthorized, GetSignOut);

export default route;
