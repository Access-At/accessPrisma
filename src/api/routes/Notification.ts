import { Router } from "express";
import { DetailNotification, GetNotification } from "../controllers/Notification";
import isAuthorized from "../middlewares/isAuthorized";

const route = Router();

route.get("/notification/get", isAuthorized, GetNotification);
route.get("/notification/:skip?", isAuthorized, DetailNotification);

export default route;
