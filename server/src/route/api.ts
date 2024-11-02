import express from "express";
import { isAuthtenticated } from "../middleware/auth-middleware";
import userController from "../controller/user-controller";
import productController from "../controller/product-controller";

const userRouter = express.Router();
userRouter.use(isAuthtenticated);

// User API
userRouter.get("/api/users/current", userController.cuurentUser);
userRouter.get("/api/users/current/:id", productController.getUserToko);
// userRouter.patch("/api/users/current", userController.update);
userRouter.post("/auth/logout", userController.logout);

export { userRouter };
