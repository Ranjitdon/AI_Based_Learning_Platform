import express, { Application, Request, Response } from "express";
import "dotenv/config";
import userRouter from "./src/routers/userRouter";
import mongodbConnect from "./src/config/mongodbConnect";
import mathRouter from "./src/routers/mathRouter";
import cors from "cors";
import storyRouter from "./src/routers/storyRouter";

const app: Application = express();

// Connect to MongoDB
mongodbConnect();

// CORS Configuration: Allow any *.vercel.app + localhost for dev
const corsOptions = {
  origin: (origin: string | undefined, callback: Function) => {
    if (
      !origin ||
      origin.includes("localhost") ||
      /\.vercel\.app$/.test(new URL(origin).hostname)
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

// Handle preflight requests
app.options("*", cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Routes
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "API Working" });
});

app.use("/users", userRouter);
app.use("/math", mathRouter);
app.use("/stories", storyRouter);

// Server start
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
