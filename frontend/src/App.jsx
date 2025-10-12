import React, { useState, useEffect } from "react";
import { Zap, Target, Search, Trash2, ChevronDown } from "lucide-react";
import GoalInput from "./components/GoalInput";
import TaskList from "./components/TaskList";

// const API_URL = "http://localhost:5000/api";

const API_URL = "https://smart-task-planner-six.vercel.app/api";


export default function App() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const res = await fetch(`${API_URL}/goals`);
      if (!res.ok) throw new Error("Failed to fetch goals");
      const data = await res.json();
      setGoals(data.data || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching goals:", err);
      setError("Failed to load goals");
    }
  };

  const handleSubmitGoal = async (goal) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/plan`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ goal }),
      });
      if (!res.ok) throw new Error("Failed to generate plan");
      const data = await res.json();
      setGoals([data.data, ...goals]);
    } catch (err) {
      console.error("Error submitting goal:", err);
      setError("Failed to generate plan. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteGoal = async (id) => {
    try {
      const res = await fetch(`${API_URL}/goals/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete goal");
      setGoals(goals.filter((g) => g._id !== id));
      if (expandedId === id) setExpandedId(null);
      setError(null);
    } catch (err) {
      console.error("Error deleting goal:", err);
      setError("Failed to delete goal");
    }
  };

  const toggleExpanded = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredGoals = goals.filter((item) =>
    item.goal.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-0 left-1/2 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative z-10">
        <div className="border-b border-red-500/30 backdrop-blur-md bg-black/50 sticky top-0 z-20">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Zap className="w-10 h-10 text-red-500 animate-bounce" />
              <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-red-500 via-violet-500 to-red-400 bg-clip-text text-transparent">
                PLANORA
              </h1>
              <Target
                className="w-10 h-10 text-violet-500 animate-bounce"
                style={{ animationDelay: "0.2s" }}
              />
            </div>
            <p className="text-center text-violet-400/80 text-sm tracking-widest uppercase font-light">
              AI-Powered Strategic Task Intelligence
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-12">
          {error && (
            <div className="mb-6 p-4 bg-red-600/20 border border-red-500/50 rounded-lg text-red-400 text-sm">
              ⚠️ {error}
            </div>
          )}

          <GoalInput onSubmit={handleSubmitGoal} loading={loading} />

          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-violet-500" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search goals by name..."
                className="w-full bg-black/60 border border-violet-500/30 rounded-lg pl-12 pr-4 py-3 text-white placeholder-violet-500/40 outline-none focus:border-red-500/60 transition"
              />
            </div>
            {searchTerm && (
              <p className="text-violet-400/60 text-sm mt-2">
                Found {filteredGoals.length} goal
                {filteredGoals.length !== 1 ? "s" : ""}
              </p>
            )}
          </div>

          <div className="space-y-4">
            {filteredGoals.length > 0 ? (
              filteredGoals.map((item) => (
                <div key={item._id} className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-red-600 rounded-2xl blur opacity-40 group-hover:opacity-80 transition duration-300"></div>
                  <div className="relative bg-black/80 backdrop-blur rounded-2xl border border-violet-500/20 group-hover:border-red-500/40 transition-all duration-300 overflow-hidden">
                    <div
                      className="p-6 flex items-center justify-between gap-4 cursor-pointer hover:bg-black/40 transition"
                      onClick={() => toggleExpanded(item._id)}
                    >
                      <div className="flex-1 flex items-center gap-4 min-w-0">
                        <ChevronDown
                          className={`w-6 h-6 text-red-500 transition-transform duration-300 flex-shrink-0 ${
                            expandedId === item._id ? "rotate-180" : ""
                          }`}
                        />
                        <div className="min-w-0">
                          <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-red-400 to-violet-400 bg-clip-text text-transparent truncate">
                            {item.goal}
                          </h2>
                          {item.plan?.total_estimated_time && (
                            <p className="text-violet-400/60 text-sm mt-1">
                              ⏱️ {item.plan.total_estimated_time}
                            </p>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteGoal(item._id);
                        }}
                        className="px-4 py-2 bg-red-600/20 hover:bg-red-600/40 text-red-400 rounded-lg transition flex items-center gap-2 flex-shrink-0 active:scale-95"
                        title="Delete this goal"
                        aria-label="Delete goal"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span className="text-sm hidden sm:inline">Delete</span>
                      </button>
                    </div>

                    {expandedId === item._id && (
                      <div className="border-t border-violet-500/20 p-6">
                        <TaskList goal={item.goal} plan={item.plan} />
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16">
                <Zap className="w-16 h-16 text-violet-500/30 mx-auto mb-4" />
                <p className="text-violet-400/50 text-lg font-light tracking-wide">
                  {searchTerm
                    ? "No goals match your search ✨"
                    : "No goals yet. Create your first plan to get started! ⚡"}
                </p>
              </div>
            )}
          </div>

          {goals.length > 0 && (
            <div className="mt-12 pt-8 border-t border-violet-500/20 text-center">
              <p className="text-violet-400/60 text-sm">
                Total Goals:{" "}
                <span className="text-red-400 font-bold">{goals.length}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
