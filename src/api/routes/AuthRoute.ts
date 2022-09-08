import { Router } from "express";
import { getSignIn, getSignUp } from "../controllers/AuthController";

const route = Router();

route.post("/auth/sign-up", getSignUp);
route.post("/auth/sign-in", getSignIn);

export default route;
