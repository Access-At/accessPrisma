import { Router } from "express";
import {
	GetAllThread,
	CreateThread,
	LikeThread,
	UpdateThread,
	DeleteThread,
	SaveThread,
	CommentThread,
	DetailThread,
	DetailThreadLike,
} from "../controllers/ThreadController";
import isAuthorized from "../middlewares/isAuthorized";

const route = Router();

route.post("/thread/create", isAuthorized, CreateThread);

route.get("/thread/page/:skip?", isAuthorized, GetAllThread);
route.get("/thread/:id/:skip?", isAuthorized, DetailThread);
route.get("/thread/:id/like/:skip?", isAuthorized, DetailThreadLike);

route.put("/thread/update", isAuthorized, UpdateThread);
route.delete("/thread/delete", isAuthorized, DeleteThread);
route.post("/thread/like", isAuthorized, LikeThread);
route.post("/thread/comment", isAuthorized, CommentThread);
route.post("/thread/save", isAuthorized, SaveThread);

route.get("/thread/filter", (req: any, res: any) => {
	console.log(req.params)
})

export default route;
