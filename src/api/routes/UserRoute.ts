import { Router } from "express";
import { GetProfile, GetUpdate, getMyProfile, getChangePassword, getProfileImage } from "../controllers/UserController";
import isAuthorized from "../middlewares/isAuthorized";
import upload from "../middlewares/isUpload";
const route = Router();

route.get("/user/profile/:username?", isAuthorized, GetProfile);
route.get("/profile", isAuthorized, getMyProfile);
route.put("/profile", isAuthorized, GetUpdate);
route.put("/profile/password", isAuthorized, getChangePassword);
route.put("/profile/change/profile", upload.single("profileImage"), isAuthorized, getProfileImage);

export default route;
