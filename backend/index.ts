import express, { Application, Request, Response } from "express";
import "dotenv/config";
import userRouter from "./src/routers/userRouter";
import mongodbConnect from "./src/config/mongodbConnect";
import mathRouter from "./src/routers/mathRouter";
import cors from "cors";
import storyRouter from "./src/routers/storyRouter";

const app: Application = express();


app.use(cors({
  origin: "https://ai-based-learning-platform-r7k4.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: false  // Since you're NOT using cookies or login here
}));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

mongodbConnect();

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "API Working",
  });
});

app.use("/users", userRouter);
app.use("/math", mathRouter);
app.use("/stories", storyRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
