import { getChangePassword } from './../controllers/UserController';
import { Router } from "express";
import { GetProfile, GetUpdate, getMyProfile } from "../controllers/UserController";
import isAuthorized from "../middlewares/isAuthorized";

const route = Router();

route.get("/user/profile/:username?", isAuthorized, GetProfile);
route.get("/profile", isAuthorized, getMyProfile);
route.put("/profile", isAuthorized, GetUpdate);
route.put("/profile/password", isAuthorized, getChangePassword);


export default route;
