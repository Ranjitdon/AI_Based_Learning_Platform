import express, { Router } from "express";
import storyController from "../controllers/storyController";

const storyRouter: Router = express.Router();

storyRouter.post("/saveStory" , storyController.saveStory);
storyRouter.get("/getStories", storyController.getStories);
export default storyRouter;
