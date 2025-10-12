const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const goalRoutes = require("./routes/goalRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
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

// app.listen(PORT, () => {
//   console.log(`\n🚀 NEXUS PLANNER Backend Running`);
//   console.log(`📡 Server: http://localhost:${PORT}`);
//   console.log(`🔌 API: http://localhost:${PORT}/api`);
// });


module.exports = app