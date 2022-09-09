import { Router } from "express";
import {
  getAllThread,
  CreateThread,
  LikeThread,
  UpdateThread,
  DeleteThread,
  SaveThread,
  CommentThread,
  detailThread,
} from "../controllers/ThreadController";
import isAuthorized from "../middlewares/isAuthorized";

const route = Router();

route.post("/thread/create", isAuthorized, CreateThread);
route.get("/thread/page/:skip?", isAuthorized, getAllThread);
route.get("/thread/:id", isAuthorized, detailThread);
route.put("/thread/update", isAuthorized, UpdateThread);
route.delete("/thread/delete", isAuthorized, DeleteThread);
route.post("/thread/like", isAuthorized, LikeThread);
route.post("/thread/comment", isAuthorized, CommentThread);
route.post("/thread/save", isAuthorized, SaveThread);
// route.post("/thread/subscribe", isAuthorized, SubscribeThread);

export default route;
