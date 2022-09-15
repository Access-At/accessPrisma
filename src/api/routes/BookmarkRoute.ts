import { Router } from "express";
// import { GetSignIn, GetSignUp, GetSignOut } from "../controllers/AuthController";
import isAuthorized from "../middlewares/isAuthorized";
import { getBookmark } from "../controllers/BookmarkController";

const route = Router();

route.get("/bookmark/:skip?", isAuthorized, getBookmark);

export default route;
