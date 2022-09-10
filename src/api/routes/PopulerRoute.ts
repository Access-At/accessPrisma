import { Router } from "express";
import { GetPopuler } from "../controllers/PopulerController";
import isAuthorized from "../middlewares/isAuthorized";

const route = Router();

route.get("/populer", isAuthorized, GetPopuler);

export default route;
