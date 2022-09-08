import { Router } from "express";
import isAuthorized from "../middlewares/isAuthorized";

const route = Router();

route.get("/thread", isAuthorized, (req, res) => {
  res.json({
    hallo: "asda",
  });
});

export default route;
