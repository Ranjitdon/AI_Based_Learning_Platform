import express, { Router, Request, Response } from "express";
import mathController from "../controllers/mathController";

const mathRouter: Router = express.Router();

// Add debugging middleware for this router
mathRouter.use((req: Request, res: Response, next) => {
  console.log(`Math Router: ${req.method} ${req.path}`);
  console.log(`Full URL: ${req.originalUrl}`);
  console.log(`Headers:`, req.headers);
  next();
});

// Test route to verify router is working
mathRouter.get("/test", (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Math router is working!",
    path: req.path,
    originalUrl: req.originalUrl,
    timestamp: new Date().toISOString()
  });
});

// Existing routes
mathRouter.post("/", mathController.postMathItems);
mathRouter.get("/", mathController.getMathItems);

// AI Quiz routes - Add both GET (for testing) and POST (for actual use)
mathRouter.get("/fromai", (req: Request, res: Response) => {
  console.log("GET /fromai route hit");
  res.json({
    success: true,
    message: "AI Quiz endpoint is accessible! Use POST method to generate quizzes.",
    method: "GET",
    endpoint: "/math/fromai",
    instructions: "Send POST request with quiz parameters to this endpoint",
    timestamp: new Date().toISOString()
  });
});

mathRouter.post("/fromai", (req: Request, res: Response) => {
  console.log("POST /fromai route hit");
  console.log("Request body:", req.body);
  
  // Add CORS headers explicitly for this route
  const origin = req.headers.origin;
  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  }
  
  try {
    mathController.getQuizFromApi(req, res);
  } catch (error) {
    console.error("Error in /fromai route:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error in fromai route",
      message: error instanceof Error ? error.message : "Unknown error"
    });
  }
});

// Handle OPTIONS request for CORS preflight
mathRouter.options("/fromai", (req: Request, res: Response) => {
  console.log("OPTIONS /fromai route hit - CORS preflight");
  const origin = req.headers.origin;
  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  }
  res.status(204).send();
});

console.log("Math router initialized with routes: /, /test, /fromai");

export default mathRouter;
