import { Router } from "express";
import {
	GetAllShowcase,
	CreateShowcase,
	LikeShowcase,
	UpdateShowcase,
	DeleteShowcase,
	SaveShowcase,
	CommentShowcase,
	DetailShowcase,
	DetailShowcaseLike,
} from "../controllers/ShowcaseController";
import isAuthorized from "../middlewares/isAuthorized";

const route = Router();

route.post("/showcase/create", isAuthorized, CreateShowcase);
route.get("/showcase/page/:skip?", isAuthorized, GetAllShowcase);
route.get("/showcase/:id/:skip?", isAuthorized, DetailShowcase);
route.get("/showcase/:id/like/:skip?", isAuthorized, DetailShowcaseLike);

route.put("/showcase/update", isAuthorized, UpdateShowcase);
route.delete("/showcase/delete", isAuthorized, DeleteShowcase);
route.post("/showcase/like", isAuthorized, LikeShowcase);
route.post("/showcase/comment", isAuthorized, CommentShowcase);
route.post("/showcase/save", isAuthorized, SaveShowcase);

export default route;