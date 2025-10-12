const mongoose = require("mongoose");
const Goal = require("../models/Goal");
const buildPrompt = require("../utils/buildPrompt");
const { generatePlan } = require("../services/geminiService");

// Generate Plan
exports.createPlan = async (req, res) => {
  try {
    const { goal } = req.body;

    if (!goal || goal.trim().length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Goal is required." });
    }

    console.log(`📝 Generating plan for: ${goal}`);

    const prompt = buildPrompt(goal);
    const plan = await generatePlan(prompt);

    const savedGoal = await Goal.create({ goal, plan });

    console.log(`✅ Plan saved with ID: ${savedGoal._id}`);
    res.json({ success: true, data: savedGoal });
  } catch (error) {
    console.error("❌ Error generating plan:", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate plan.",
      error: error.message,
    });
  }
};

// Fetch All Goals
exports.getGoals = async (req, res) => {
  try {
    const goals = await Goal.find().sort({ createdAt: -1 });
    console.log(`📋 Fetched ${goals.length} goals`);
    res.json({ success: true, data: goals });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to fetch goals",
        error: error.message,
      });
  }
};

// Fetch Single Goal
exports.getGoalById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res
        .status(400)
        .json({ success: false, message: "Invalid goal ID" });

    const goal = await Goal.findById(id);
    if (!goal)
      return res
        .status(404)
        .json({ success: false, message: "Goal not found" });

    res.json({ success: true, data: goal });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to fetch goal",
        error: error.message,
      });
  }
};

// Delete Goal
exports.deleteGoal = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res
        .status(400)
        .json({ success: false, message: "Invalid goal ID" });

    const deletedGoal = await Goal.findByIdAndDelete(id);
    if (!deletedGoal)
      return res
        .status(404)
        .json({ success: false, message: "Goal not found" });

    console.log(`🗑️ Deleted goal: ${id}`);
    res.json({
      success: true,
      message: "Goal deleted successfully",
      data: deletedGoal,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to delete goal",
        error: error.message,
      });
  }
};
