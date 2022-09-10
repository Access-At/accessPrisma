import { Router } from "express";
import { GetAllCircles } from "../controllers/CirclesController";
import isAuthorized from "../middlewares/isAuthorized";

const route = Router();

route.get("/circles/:skip?", isAuthorized, GetAllCircles);

export default route;
