// import React, { useState, useEffect } from "react";
// import { Zap, Target, Search, Trash2, ChevronDown } from "lucide-react";
// import GoalInput from "./components/GoalInput";
// import TaskList from "./components/TaskList";

// // const API_URL = "http://localhost:5000/api";

// const API_URL = "https://smart-task-planner-six.vercel.app/api";


// export default function App() {
//   const [goals, setGoals] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [expandedId, setExpandedId] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchGoals();
//   }, []);

//   const fetchGoals = async () => {
//     try {
//       const res = await fetch(`${API_URL}/goals`);
//       if (!res.ok) throw new Error("Failed to fetch goals");
//       const data = await res.json();
//       setGoals(data.data || []);
//       setError(null);
//     } catch (err) {
//       console.error("Error fetching goals:", err);
//       setError("Failed to load goals");
//     }
//   };

//   const handleSubmitGoal = async (goal) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await fetch(`${API_URL}/plan`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ goal }),
//       });
//       if (!res.ok) throw new Error("Failed to generate plan");
//       const data = await res.json();
//       setGoals([data.data, ...goals]);
//     } catch (err) {
//       console.error("Error submitting goal:", err);
//       setError("Failed to generate plan. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteGoal = async (id) => {
//     try {
//       const res = await fetch(`${API_URL}/goals/${id}`, { method: "DELETE" });
//       if (!res.ok) throw new Error("Failed to delete goal");
//       setGoals(goals.filter((g) => g._id !== id));
//       if (expandedId === id) setExpandedId(null);
//       setError(null);
//     } catch (err) {
//       console.error("Error deleting goal:", err);
//       setError("Failed to delete goal");
//     }
//   };

//   const toggleExpanded = (id) => {
//     setExpandedId(expandedId === id ? null : id);
//   };

//   const filteredGoals = goals.filter((item) =>
//     item.goal.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen bg-black relative overflow-hidden">
//       <div className="fixed inset-0 z-0">
//         <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/20 rounded-full blur-3xl animate-pulse"></div>
//         <div
//           className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl animate-pulse"
//           style={{ animationDelay: "1s" }}
//         ></div>
//         <div
//           className="absolute bottom-0 left-1/2 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse"
//           style={{ animationDelay: "2s" }}
//         ></div>
//       </div>

//       <div className="relative z-10">
//         <div className="border-b border-red-500/30 backdrop-blur-md bg-black/50 sticky top-0 z-20">
//           <div className="max-w-7xl mx-auto px-6 py-8">
//             <div className="flex items-center justify-center gap-3 mb-2">
//               <Zap className="w-10 h-10 text-red-500 animate-bounce" />
//               <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-red-500 via-violet-500 to-red-400 bg-clip-text text-transparent">
//                 PLANORA
//               </h1>
//               <Target
//                 className="w-10 h-10 text-violet-500 animate-bounce"
//                 style={{ animationDelay: "0.2s" }}
//               />
//             </div>
//             <p className="text-center text-violet-400/80 text-sm tracking-widest uppercase font-light">
//               AI-Powered Strategic Task Intelligence
//             </p>
//           </div>
//         </div>

//         <div className="max-w-7xl mx-auto px-6 py-12">
//           {error && (
//             <div className="mb-6 p-4 bg-red-600/20 border border-red-500/50 rounded-lg text-red-400 text-sm">
//               ⚠️ {error}
//             </div>
//           )}

//           <GoalInput onSubmit={handleSubmitGoal} loading={loading} />

//           <div className="mb-8">
//             <div className="relative">
//               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-violet-500" />
//               <input
//                 type="text"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 placeholder="Search goals by name..."
//                 className="w-full bg-black/60 border border-violet-500/30 rounded-lg pl-12 pr-4 py-3 text-white placeholder-violet-500/40 outline-none focus:border-red-500/60 transition"
//               />
//             </div>
//             {searchTerm && (
//               <p className="text-violet-400/60 text-sm mt-2">
//                 Found {filteredGoals.length} goal
//                 {filteredGoals.length !== 1 ? "s" : ""}
//               </p>
//             )}
//           </div>

//           <div className="space-y-4">
//             {filteredGoals.length > 0 ? (
//               filteredGoals.map((item) => (
//                 <div key={item._id} className="group relative">
//                   <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-red-600 rounded-2xl blur opacity-40 group-hover:opacity-80 transition duration-300"></div>
//                   <div className="relative bg-black/80 backdrop-blur rounded-2xl border border-violet-500/20 group-hover:border-red-500/40 transition-all duration-300 overflow-hidden">
//                     <div
//                       className="p-6 flex items-center justify-between gap-4 cursor-pointer hover:bg-black/40 transition"
//                       onClick={() => toggleExpanded(item._id)}
//                     >
//                       <div className="flex-1 flex items-center gap-4 min-w-0">
//                         <ChevronDown
//                           className={`w-6 h-6 text-red-500 transition-transform duration-300 flex-shrink-0 ${
//                             expandedId === item._id ? "rotate-180" : ""
//                           }`}
//                         />
//                         <div className="min-w-0">
//                           <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-red-400 to-violet-400 bg-clip-text text-transparent truncate">
//                             {item.goal}
//                           </h2>
//                           {item.plan?.total_estimated_time && (
//                             <p className="text-violet-400/60 text-sm mt-1">
//                               ⏱️ {item.plan.total_estimated_time}
//                             </p>
//                           )}
//                         </div>
//                       </div>
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleDeleteGoal(item._id);
//                         }}
//                         className="px-4 py-2 bg-red-600/20 hover:bg-red-600/40 text-red-400 rounded-lg transition flex items-center gap-2 flex-shrink-0 active:scale-95"
//                         title="Delete this goal"
//                         aria-label="Delete goal"
//                       >
//                         <Trash2 className="w-4 h-4" />
//                         <span className="text-sm hidden sm:inline">Delete</span>
//                       </button>
//                     </div>

//                     {expandedId === item._id && (
//                       <div className="border-t border-violet-500/20 p-6">
//                         <TaskList goal={item.goal} plan={item.plan} />
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="text-center py-16">
//                 <Zap className="w-16 h-16 text-violet-500/30 mx-auto mb-4" />
//                 <p className="text-violet-400/50 text-lg font-light tracking-wide">
//                   {searchTerm
//                     ? "No goals match your search ✨"
//                     : "No goals yet. Create your first plan to get started! ⚡"}
//                 </p>
//               </div>
//             )}
//           </div>

//           {goals.length > 0 && (
//             <div className="mt-12 pt-8 border-t border-violet-500/20 text-center">
//               <p className="text-violet-400/60 text-sm">
//                 Total Goals:{" "}
//                 <span className="text-red-400 font-bold">{goals.length}</span>
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }















import React, { useState, useEffect, useRef } from "react";
import { Target, Search, MoreHorizontal, Trash2, ChevronDown } from "lucide-react";
import GoalInput from "./components/GoalInput";
import TaskList from "./components/TaskList";

// const API_URL = "http://localhost:5000/api";

const API_URL = "https://smart-task-planner-six.vercel.app/api";

export default function App() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [menuOpenId, setMenuOpenId] = useState(null);
  const [error, setError] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    fetchGoals();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpenId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
      setMenuOpenId(null);
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
    <div className="min-h-screen bg-[#0b0c0f]">
      <header className="border-b border-[#1c1d22] sticky top-0 z-20 bg-[#0b0c0f]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-[#5b6ef5] flex items-center justify-center flex-shrink-0">
              <Target className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-[14px] font-semibold text-[#eeeef0] leading-none">
                Planora
              </h1>
              <p className="text-[11px] text-[#6b6b74] mt-0.5">
                Goal planning
              </p>
            </div>
          </div>
          <span className="text-[12px] text-[#6b6b74]">
            {goals.length} goal{goals.length !== 1 ? "s" : ""}
          </span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-8">
        {error && (
          <div className="mb-5 px-3.5 py-2.5 rounded-lg bg-[#1c1315] border border-[#3a1f22] text-[#f0655c] text-[13px]">
            {error}
          </div>
        )}

        <GoalInput onSubmit={handleSubmitGoal} loading={loading} />

        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#5f6068]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search goals…"
              className="w-full bg-[#131419] border border-[#23242b] focus:border-[#3a3c47] rounded-lg pl-9 pr-3 py-2 text-[13px] text-[#eeeef0] placeholder-[#5f6068] outline-none transition-colors"
            />
          </div>
          {searchTerm && (
            <span className="text-[12px] text-[#6b6b74] whitespace-nowrap">
              {filteredGoals.length} match{filteredGoals.length !== 1 ? "es" : ""}
            </span>
          )}
        </div>

        <div className="space-y-2">
          {filteredGoals.length > 0 ? (
            filteredGoals.map((item) => (
              <div
                key={item._id}
                className="rounded-xl border border-[#1c1d22] bg-[#101116] overflow-hidden"
              >
                <div
                  className="px-4 py-3.5 flex items-center justify-between gap-3 cursor-pointer hover:bg-[#131419] transition-colors"
                  onClick={() => toggleExpanded(item._id)}
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <ChevronDown
                      className={`w-4 h-4 text-[#6b6b74] flex-shrink-0 transition-transform duration-200 ${
                        expandedId === item._id ? "rotate-180" : ""
                      }`}
                    />
                    <div className="min-w-0">
                      <h2 className="text-[14px] font-medium text-[#eeeef0] truncate">
                        {item.goal}
                      </h2>
                      <div className="flex items-center gap-2 mt-0.5">
                        {item.plan?.total_estimated_time && (
                          <span className="text-[12px] text-[#6b6b74]">
                            {item.plan.total_estimated_time}
                          </span>
                        )}
                        {item.plan?.tasks?.length > 0 && (
                          <>
                            <span className="text-[#3a3c47]">·</span>
                            <span className="text-[12px] text-[#6b6b74]">
                              {item.plan.tasks.length} tasks
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="relative flex-shrink-0" ref={menuOpenId === item._id ? menuRef : null}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setMenuOpenId(menuOpenId === item._id ? null : item._id);
                      }}
                      className="w-7 h-7 flex items-center justify-center rounded-md text-[#6b6b74] hover:text-[#eeeef0] hover:bg-[#1c1d22] transition-colors"
                      aria-label="Goal options"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>

                    {menuOpenId === item._id && (
                      <div
                        className="absolute right-0 top-9 z-30 w-36 rounded-lg border border-[#23242b] bg-[#16171c] shadow-lg py-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={() => handleDeleteGoal(item._id)}
                          className="w-full flex items-center gap-2 px-3 py-2 text-[13px] text-[#f0655c] hover:bg-[#1c1d22] transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Delete goal
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {expandedId === item._id && (
                  <div className="border-t border-[#1c1d22] px-4 py-4">
                    <TaskList goal={item.goal} plan={item.plan} />
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-16">
              <Target className="w-8 h-8 text-[#2a2b33] mx-auto mb-3" />
              <p className="text-[13px] text-[#6b6b74]">
                {searchTerm
                  ? "No goals match your search"
                  : "No goals yet — create your first plan above"}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}