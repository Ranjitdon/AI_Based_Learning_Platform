import express, { Router } from "express";
import mathController from "../controllers/mathController";

const mathRouter: Router = express.Router();

mathRouter.post("/", mathController.postMathItems);

mathRouter.post("/fromai", mathController.getQuizFromApi);

mathRouter.get("/", mathController.getMathItems);

export default mathRouter;
 
