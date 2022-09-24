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
	DetailShowcaseComment,
} from "../controllers/ShowcaseController";
import isAuthorized from "../middlewares/isAuthorized";
import upload from "../middlewares/isUpload";

const route = Router();

route.post("/showcase/create", isAuthorized, CreateShowcase);
route.get("/showcase/page/:skip?", isAuthorized, GetAllShowcase);

route.get("/showcase/:slug", isAuthorized, DetailShowcase);
route.get("/showcase/:slug/like", isAuthorized, DetailShowcaseLike);
route.get("/showcase/:slug/comment/:skip?", isAuthorized, DetailShowcaseComment);

route.put("/showcase/update", isAuthorized, upload.single("image"), UpdateShowcase);
route.post("/showcase/delete", isAuthorized, DeleteShowcase);
route.post("/showcase/like", isAuthorized, LikeShowcase);
route.post("/showcase/comment", isAuthorized, CommentShowcase);
route.post("/showcase/save", isAuthorized, SaveShowcase);

export default route;
