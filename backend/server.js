const express = require("express");
const cors = require("cors");
// const serverless = require("serverless-http");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const goalRoutes = require("./routes/goalRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(
  cors({
    origin:
      process.env.FRONTEND_URL || "https://smart-task-planner-a2l6.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

connectDB();

app.use("/api", goalRoutes);

app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Server is running on {PORT}" });
});

app.use((err, req, res, next) => {
  console.error("❌ Unhandled error:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: err.message,
  });
});


module.exports = app;