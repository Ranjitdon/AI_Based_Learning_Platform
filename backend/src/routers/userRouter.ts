import express, { Router } from "express";
import userController from "../controllers/userController";

const userRouter: Router = express.Router();

userRouter.post("/", userController.createUser);

userRouter.get("/:userId", userController.getUser);

export default userRouter;
