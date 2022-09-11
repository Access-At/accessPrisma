import { Router } from "express";
import resize from "../../resize";

const route = Router();

route.get("/image", (req, res) => {
	res.type("image/png");
	// resize("nodeJs.png").pipe(res);
});

export default route;
