// import { Router } from "express";
// import prisma from "../../../prisma";
// import { getSignIn, getSignUp, getUpdate } from "../controllers/UserController";

// const route = Router();

// // get user gabisa gi auth controller karna ada userId yang true, jadi gua pindahin ke sini
// route.get("/users/getAll", async (req, res, next) => {
//   try {
//     const users = await prisma.user.findMany();
//     return res.json({
//       users,
//     });
//   } catch (error) {
//     next(error);
//   }
// });

// route.post("/users/sign-up", getSignUp);

// route.post("/users/sign-in", getSignIn);

// route.put("/user/:id", getUpdate);

// export default route;
