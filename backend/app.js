// Import packages
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./configs/db.config");
require("dotenv").config();

// Initialize app
const app = express();

// Load environment variables
const MONGODB_URL = process.env.MONGODB_URL;
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(express.json());
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:8000",
  // "http://your-production-url.com",
];
app.use(
  cors({
    credentials: true,
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(cookieParser());

// Routes
const authRoutes = require("./routes/auth.routes");
app.use("/api/auth", authRoutes);

// Test api
app.get("/", (req, res) => {
  res.status(200).json({
    message: "API is working correctly...",
  });
});

// Start the server
const startServer = async () => {
  try {
    await connectDB(MONGODB_URL);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err.message);
    process.exit(1); // Exit process with failure
  }
};

startServer();
