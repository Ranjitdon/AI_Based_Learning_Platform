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

// CORS Configuration
const allowedOrigins = [
  "https://ai-based-learning-platform-qfuc.vercel.app", // frontend on vercel
  "http://localhost:3000", // local dev
];

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

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
