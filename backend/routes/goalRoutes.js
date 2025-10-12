const express = require("express");
const router = express.Router();
const {
  createPlan,
  getGoals,
  getGoalById,
  deleteGoal,
} = require("../controllers/goalController");

// Routes
router.post("/plan", createPlan);
router.get("/goals", getGoals);
router.get("/goals/:id", getGoalById);
router.delete("/goals/:id", deleteGoal);

module.exports = router;
