import { Router } from "express";
import { DetailNotification, GetNotification } from "../controllers/NotificationRoute";
import isAuthorized from "../middlewares/isAuthorized";

const route = Router();

route.get("/notification/get", isAuthorized, GetNotification);
route.get("/notification", isAuthorized, DetailNotification);

export default route;
