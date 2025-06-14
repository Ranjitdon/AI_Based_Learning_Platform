import express, { Application, Request, Response } from "express";
import "dotenv/config";
import { config } from "dotenv";
import userRouter from "./src/routers/userRouter";
import mongodbConnect from "./src/config/mongodbConnect";
import mathRouter from "./src/routers/mathRouter";
import cors from "cors";
import storyRouter from "./src/routers/storyRouter";

config();

const app: Application = express();

// Comprehensive CORS setup for Vercel
const allowedOrigins = [
  /^https:\/\/ai-based-learning-platform-[a-z0-9]+\.vercel\.app$/,
  /^http:\/\/localhost:\d+$/,
  /^https:\/\/localhost:\d+$/,
];

// Primary CORS configuration
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    // Check if origin matches allowed patterns
    const isAllowed = allowedOrigins.some(pattern => pattern.test(origin));
    
    if (isAllowed) {
      callback(null, true);
    } else {
      console.log(`CORS rejected origin: ${origin}`);
      callback(null, false); // Don't throw error, just reject
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Authorization',
    'Cache-Control',
    'X-HTTP-Method-Override'
  ],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

// Additional CORS middleware for extra reliability
app.use((req: Request, res: Response, next) => {
  const origin = req.headers.origin;
  
  // Set CORS headers manually as backup
  if (origin) {
    const isVercelApp = /^https:\/\/ai-based-learning-platform-[a-z0-9]+\.vercel\.app$/.test(origin);
    const isLocalhost = /^https?:\/\/localhost:\d+$/.test(origin);
    
    if (isVercelApp || isLocalhost) {
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, X-HTTP-Method-Override');
    }
  }
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(204).send();
    return;
  }
  
  next();
});

// Connect to MongoDB
mongodbConnect();

// Body parsing middleware (after CORS)
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Health check route
app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "API Working",
    timestamp: new Date().toISOString(),
    cors: "enabled"
  });
});

// Add a specific CORS test endpoint
app.get("/cors-test", (req: Request, res: Response) => {
  res.json({
    message: "CORS test successful",
    origin: req.headers.origin,
    timestamp: new Date().toISOString()
  });
});

// Debug middleware to log all requests
app.use((req: Request, res: Response, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  console.log('Headers:', req.headers);
  next();
});

// Route handlers with debugging
console.log('Registering routers...');
app.use("/users", userRouter);
console.log('Math router being registered...');
app.use("/math", mathRouter);
app.use("/stories", storyRouter);
console.log('All routers registered.');

// 404 handler for unmatched routes
app.use("*", (req: Request, res: Response) => {
  res.status(404).json({
    error: "Route not found",
    path: req.originalUrl,
    method: req.method,
    availableRoutes: ["/", "/cors-test", "/users", "/math", "/stories"]
  });
});

// Global error handling middleware
app.use((err: any, req: Request, res: Response, next: any) => {
  console.error("Server Error:", err);
  
  // Set CORS headers even for errors
  const origin = req.headers.origin;
  if (origin && /vercel\.app$/.test(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }
  
  res.status(500).json({
    error: "Internal server error",
    message: process.env.NODE_ENV === "development" ? err.message : "Something went wrong"
  });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`🌐 CORS enabled for Vercel apps`);
});
