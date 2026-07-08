// import React, { useState } from "react";
// import { Sparkles } from "lucide-react";

// export default function GoalInput({ onSubmit, loading }) {
//   const [goal, setGoal] = useState("");

//   const handleSubmit = () => {
//     if (!goal.trim()) return;
//     onSubmit(goal);
//     setGoal("");
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && !loading) {
//       handleSubmit();
//     }
//   };

//   return (
//     <div className="mb-12">
//       <div className="relative group">
//         <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-violet-500 rounded-xl blur opacity-60 group-hover:opacity-100 transition duration-300 animate-pulse"></div>
//         <div className="relative bg-black rounded-xl p-1">
//           <div className="flex gap-3 p-6 items-center">
//             <Sparkles className="w-5 h-5 text-red-500 flex-shrink-0" />
//             <input
//               type="text"
//               value={goal}
//               onChange={(e) => setGoal(e.target.value)}
//               onKeyPress={handleKeyPress}
//               placeholder="Enter your goal... (e.g., Launch app in 2 weeks)"
//               className="flex-1 bg-transparent text-white placeholder-violet-500/40 outline-none text-lg font-light tracking-wide"
//             />
//             <button
//               onClick={handleSubmit}
//               disabled={loading}
//               className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-black font-bold rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-red-500/50 uppercase text-sm tracking-wider"
//             >
//               {loading ? "⚡ Planning..." : "Generate"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }















import React, { useState } from "react";
import { Sparkles, ArrowRight } from "lucide-react";

const EXAMPLES = ["Learn Japanese", "Launch a SaaS", "Crack GATE"];

export default function GoalInput({ onSubmit, loading }) {
  const [goal, setGoal] = useState("");

  const handleSubmit = () => {
    if (!goal.trim() || loading) return;
    onSubmit(goal);
    setGoal("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="rounded-xl border border-[#23242b] bg-[#131419] p-4 mb-6">
      <div className="flex items-center gap-3">
        <Sparkles className="w-4 h-4 text-[#5b6ef5] flex-shrink-0" />
        <input
          type="text"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="What's your goal? e.g. Launch app in 2 weeks"
          className="flex-1 bg-transparent text-[14px] text-[#eeeef0] placeholder-[#5f6068] outline-none"
        />
        <button
          onClick={handleSubmit}
          disabled={loading || !goal.trim()}
          className="inline-flex items-center gap-1.5 rounded-lg bg-[#5b6ef5] hover:bg-[#4c5ee8] disabled:bg-[#2a2b33] disabled:text-[#5f6068] text-white text-[13px] font-medium px-3.5 py-2 transition-colors flex-shrink-0"
        >
          {loading ? (
            "Planning…"
          ) : (
            <>
              Generate <ArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>

      <div className="flex items-center gap-2 mt-3 pl-7">
        <span className="text-[11px] text-[#5f6068]">Try:</span>
        {EXAMPLES.map((ex) => (
          <button
            key={ex}
            onClick={() => setGoal(ex)}
            className="text-[11px] text-[#9b9ba3] hover:text-[#eeeef0] bg-[#1a1b21] hover:bg-[#20212a] border border-[#23242b] rounded-full px-2.5 py-1 transition-colors"
          >
            {ex}
          </button>
        ))}
      </div>
    </div>
  );
}