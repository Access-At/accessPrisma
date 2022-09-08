import { Router } from "express";
import { getSignIn, getSignUp, getSignOut } from "../controllers/AuthController";
import isAuthorized from "../middlewares/isAuthorized";

const route = Router();

route.post("/auth/sign-up", getSignUp);
route.post("/auth/sign-in", getSignIn);
route.post("/auth/sign-out", isAuthorized, getSignOut);

export default route;
