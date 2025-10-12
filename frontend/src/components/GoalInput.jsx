import React, { useState } from "react";
import { Sparkles } from "lucide-react";

export default function GoalInput({ onSubmit, loading }) {
  const [goal, setGoal] = useState("");

  const handleSubmit = () => {
    if (!goal.trim()) return;
    onSubmit(goal);
    setGoal("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !loading) {
      handleSubmit();
    }
  };

  return (
    <div className="mb-12">
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-violet-500 rounded-xl blur opacity-60 group-hover:opacity-100 transition duration-300 animate-pulse"></div>
        <div className="relative bg-black rounded-xl p-1">
          <div className="flex gap-3 p-6 items-center">
            <Sparkles className="w-5 h-5 text-red-500 flex-shrink-0" />
            <input
              type="text"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter your goal... (e.g., Launch app in 2 weeks)"
              className="flex-1 bg-transparent text-white placeholder-violet-500/40 outline-none text-lg font-light tracking-wide"
            />
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-black font-bold rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-red-500/50 uppercase text-sm tracking-wider"
            >
              {loading ? "⚡ Planning..." : "Generate"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}