// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const { GoogleGenAI } = require("@google/genai");
// require("dotenv").config();

// const app = express();
// const PORT = process.env.PORT || 5000;
// app.use(cors());
// app.use(express.json());

// const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// // Optional MongoDB Schema
// const GoalSchema = new mongoose.Schema({
//   goal: String,
//   plan: Object,
//   createdAt: { type: Date, default: Date.now },
// });
// const Goal = mongoose.model("Goal", GoalSchema);

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch((err) => console.error("MongoDB error:", err));

// const buildPrompt = (goal) => `
// You are a smart project planner AI.
// Break down the goal "${goal}" into clear, actionable tasks with dependencies and estimated durations.
// Respond in JSON:
// {
//   "goal": "...",
//   "total_estimated_time": "...",
//   "tasks": [
//     { "id": 1, "task": "...", "duration": "...", "depends_on": [], "priority": "..." }
//   ],
//   "insights": ["...", "..."]
// }
// `;

// app.post("/api/plan", async (req, res) => {
//   try {
//     const { goal } = req.body;
//     if (!goal)
//       return res
//         .status(400)
//         .json({ success: false, message: "Goal is required." });

//     const prompt = buildPrompt(goal);
//     const result = await ai.models.generateContent({
//       model: "gemini-2.0-flash",
//       contents: [{ role: "user", parts: [{ text: prompt }] }],
//     });

//     const text = result.candidates[0].content.parts[0].text;
//     let plan;

//     try {
//       const jsonMatch =
//         text.match(/```json\n([\s\S]*?)\n```/) || text.match(/\{[\s\S]*\}/);
//       plan = JSON.parse(jsonMatch[1] || jsonMatch[0]);
//     } catch (err) {
//       plan = { error: "Invalid format", raw: text };
//     }

//     // Save to MongoDB (optional)
//     const savedGoal = await Goal.create({ goal, plan });

//     res.json({ success: true, data: savedGoal });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, error: "Failed to generate plan." });
//   }
// });

// app.get("/api/goals", async (req, res) => {
//   const goals = await Goal.find().sort({ createdAt: -1 });
//   res.json({ success: true, data: goals });
// });

// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));





// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const { GoogleGenAI } = require("@google/genai");
// require("dotenv").config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Initialize Gemini AI
// const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// // MongoDB Schema
// const GoalSchema = new mongoose.Schema({
//   goal: { type: String, required: true },
//   plan: { type: Object, default: {} },
//   createdAt: { type: Date, default: Date.now },
// });

// const Goal = mongoose.model("Goal", GoalSchema);

// // Connect to MongoDB
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch((err) => console.error("❌ MongoDB error:", err));

// // Build prompt for LLM
// const buildPrompt = (goal) => `
// You are a smart project planner AI that breaks down goals into actionable tasks.
// Create a comprehensive plan for: "${goal}"

// Respond ONLY with valid JSON (no markdown, no extra text):
// {
//   "goal": "${goal}",
//   "total_estimated_time": "Estimated duration (e.g., '3-6 months')",
//   "tasks": [
//     {
//       "id": 1,
//       "task": "Task name",
//       "duration": "Time estimate",
//       "priority": "HIGH or MEDIUM or LOW"
//     }
//   ],
//   "insights": [
//     "Strategic insight 1",
//     "Strategic insight 2",
//     "Strategic insight 3"
//   ]
// }
// `;

// // POST - Generate Plan
// app.post("/api/plan", async (req, res) => {
//   try {
//     const { goal } = req.body;

//     // Validate input
//     if (!goal || goal.trim().length === 0) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Goal is required." });
//     }

//     console.log(`📝 Generating plan for: ${goal}`);

//     // Call Gemini API
//     const prompt = buildPrompt(goal);
//     const result = await ai.models.generateContent({
//       model: "gemini-2.0-flash",
//       contents: [{ role: "user", parts: [{ text: prompt }] }],
//     });

//     // Extract text from response
//     const text = result.candidates[0].content.parts[0].text;

//     let plan;
//     try {
//       // Try to parse JSON (handle both markdown and plain JSON)
//       const jsonMatch =
//         text.match(/```json\n([\s\S]*?)\n```/) ||
//         text.match(/```\n([\s\S]*?)\n```/) ||
//         text.match(/\{[\s\S]*\}/);

//       plan = JSON.parse(jsonMatch ? jsonMatch[1] || jsonMatch[0] : text);
//     } catch (parseErr) {
//       console.error("JSON Parse Error:", parseErr);
//       return res.status(500).json({
//         success: false,
//         message: "Failed to parse AI response",
//         raw: text,
//       });
//     }

//     // Save to MongoDB
//     const savedGoal = await Goal.create({ goal, plan });

//     console.log(`✅ Plan saved with ID: ${savedGoal._id}`);
//     res.json({ success: true, data: savedGoal });
//   } catch (error) {
//     console.error("❌ Error generating plan:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to generate plan.",
//       error: error.message,
//     });
//   }
// });

// // GET - Fetch All Goals
// app.get("/api/goals", async (req, res) => {
//   try {
//     const goals = await Goal.find().sort({ createdAt: -1 });
//     console.log(`📋 Fetched ${goals.length} goals`);
//     res.json({ success: true, data: goals });
//   } catch (error) {
//     console.error("❌ Error fetching goals:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch goals",
//       error: error.message,
//     });
//   }
// });

// // GET - Single Goal by ID
// app.get("/api/goals/:id", async (req, res) => {
//   try {
//     const { id } = req.params;

//     // Validate MongoDB ID
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid goal ID",
//       });
//     }

//     const goal = await Goal.findById(id);

//     if (!goal) {
//       return res.status(404).json({
//         success: false,
//         message: "Goal not found",
//       });
//     }

//     console.log(`✅ Fetched goal: ${id}`);
//     res.json({ success: true, data: goal });
//   } catch (error) {
//     console.error("❌ Error fetching goal:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch goal",
//       error: error.message,
//     });
//   }
// });

// // DELETE - Remove Goal
// app.delete("/api/goals/:id", async (req, res) => {
//   try {
//     const { id } = req.params;

//     // Validate MongoDB ID
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid goal ID",
//       });
//     }

//     // Delete goal
//     const deletedGoal = await Goal.findByIdAndDelete(id);

//     if (!deletedGoal) {
//       return res.status(404).json({
//         success: false,
//         message: "Goal not found",
//       });
//     }

//     console.log(`🗑️ Deleted goal: ${id}`);
//     res.json({
//       success: true,
//       message: "Goal deleted successfully",
//       data: deletedGoal,
//     });
//   } catch (error) {
//     console.error("❌ Error deleting goal:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to delete goal",
//       error: error.message,
//     });
//   }
// });

// // Health Check
// app.get("/api/health", (req, res) => {
//   res.json({ success: true, message: "Server is running ✅" });
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error("❌ Unhandled error:", err);
//   res.status(500).json({
//     success: false,
//     message: "Internal server error",
//     error: err.message,
//   });
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`\n🚀 NEXUS PLANNER Backend Running`);
//   console.log(`📡 Server: http://localhost:${PORT}`);
//   console.log(`🔌 API: http://localhost:${PORT}/api`);
//   console.log(`✅ MongoDB: Connected`);
//   console.log(`🤖 AI Model: Gemini 2.0 Flash\n`);
// });




const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const goalRoutes = require("./routes/goalRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect MongoDB
connectDB();

// Routes
app.use("/api", goalRoutes);

// Health Check
app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Server is running ✅" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("❌ Unhandled error:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: err.message,
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`\n🚀 NEXUS PLANNER Backend Running`);
  console.log(`📡 Server: http://localhost:${PORT}`);
  console.log(`🔌 API: http://localhost:${PORT}/api`);
});




// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import connectDB from "./config/db.js";
// import goalRoutes from "./routes/goalRoutes.js";

// import {createPlan} from "./controllers/goalController.js";



// dotenv.config();
// const app = express();
// const PORT = process.env.PORT || 5000;

// // Connect DB
// connectDB();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use("/api/goals", goalRoutes);

// // Health check
// app.get("/api/health", (req, res) => {
//   res.json({ success: true, message: "Server running fine" });
// });

// app.post("/api/plan", createPlan);

// // Global error handler
// app.use((err, req, res, next) => {
//   console.error("Error:", err.message);
//   res.status(err.status || 500).json({ success: false, message: err.message });
// });

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
