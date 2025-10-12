const express = require("express");
const cors = require("cors");
const serverless = require("serverless-http");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const goalRoutes = require("./routes/goalRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// app.use(cors());

// const allowedOrigins = [
//   process.env.FRONTEND_URL.replace(/\/$/, ""), // remove trailing slash
//   "http://localhost:5173",
//   "https://smart-task-planner-a2l6.vercel.app", // add your deployed frontend
// ];

// const allowedOrigins = [
//   process.env.FRONTEND_URL?.replace(/\/$/, ""),
//   "http://localhost:5173",
//   "https://smart-task-planner-a2l6.vercel.app",
// ].filter(Boolean); // removes any undefined

// app.use((req, res, next) => {
//   console.log("Origin header:", req.headers.origin);
//   next();
// });


// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin || allowedOrigins.includes(origin)) callback(null, true);
//       else callback(new Error("CORS not allowed"));
//     },
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true,
//   })
// );


app.use(
  cors({
    origin:
      process.env.FRONTEND_URL || "https://smart-task-planner-a2l6.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);


// app.options(
//   "*",
//   cors({
//     origin: allowedOrigins,
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true,
//   })
// );



// ✅ Handle preflight requests explicitly
// app.options("*", cors());


app.use(express.json());

connectDB();

app.use("/api", goalRoutes);

app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Server is running ✅" });
});

app.use((err, req, res, next) => {
  console.error("❌ Unhandled error:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: err.message,
  });
});


module.exports = serverless(app);