import { Router } from "express";
import { GetAllCircles } from "../controllers/CirclesController";
import isAuthorized from "../middlewares/isAuthorized";

const route = Router();

route.get("/circles", isAuthorized, GetAllCircles);
// route.get("/circles/:username?", isAuthorized, DetailNotification);

export default route;
