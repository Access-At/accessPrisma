import { Router } from "express";
import isAuthorized from "../middlewares/isAuthorized";
import prisma from "../../../prisma";

const route = Router();

route.get("/thread", isAuthorized, (async (req: any, res: any, next:any) => {
   try {
     const userId = res.get("userId")
     const users = await prisma.user.findFirst({
       where: {
      id : userId
    }});
    return res.json({
      users,
    });
  } catch (error) {
    next(error);
  }
}))

export default route;
