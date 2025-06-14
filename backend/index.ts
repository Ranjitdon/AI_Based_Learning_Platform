import express, { Application, Request, Response } from "express";
import "dotenv/config";
import cors from "cors";

// Routers
import userRouter from "./src/routers/userRouter";
import mathRouter from "./src/routers/mathRouter";
import storyRouter from "./src/routers/storyRouter";

// MongoDB Connection
import mongodbConnect from "./src/config/mongodbConnect";

// Initialize Express app
const app: Application = express();

// Connect to MongoDB
mongodbConnect();

// ✅ CORS Configuration: Allow all *.vercel.app and localhost
const corsOptions = {
  origin: (origin: string | undefined, callback: Function) => {
    if (
      !origin || // allow tools like curl or Postman
      origin.includes("localhost") || // local dev
      /\.vercel\.app$/.test(new URL(origin).hostname) // any subdomain.vercel.app
    ) {
      callback(null, true);
    } else {
      callback(new Error("❌ Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// Apply CORS
app.use(cors(corsOptions));

// Handle preflight (OPTIONS) requests globally
app.options("*", cors(corsOptions));

// ✅ Body parsing middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// ✅ Test endpoint
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "🚀 API Working" });
});

// ✅ Mount routers
app.use("/users", userRouter);
app.use("/math", mathRouter);
app.use("/stories", storyRouter);

// ✅ Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
