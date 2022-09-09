import { Router } from "express";
import { GetProfile, GetUpdate } from "../controllers/UserController";
import isAuthorized from "../middlewares/isAuthorized";

const route = Router();

route.get("/user/profile/:username?", isAuthorized, GetProfile);
route.put("/user/profile", isAuthorized, GetUpdate);

export default route;
