// import React from "react";

// export default function TaskList({ goal, plan }) {
//   if (!plan?.tasks) return null;

//   return (
//     <div className="bg-white p-4 rounded-lg shadow">
//       <h2 className="text-xl font-semibold text-gray-700 mb-2">{goal}</h2>
//       <p className="text-gray-500 mb-2">
//         Total Time: {plan.total_estimated_time || "N/A"}
//       </p>
//       <ul className="list-disc ml-6">
//         {plan.tasks.map((task) => (
//           <li key={task.id} className="mb-1">
//             <span className="font-medium">{task.task}</span> —{" "}
//             <span className="text-sm text-gray-600">
//               {task.duration} ({task.priority})
//             </span>
//           </li>
//         ))}
//       </ul>
//       {plan.insights && (
//         <div className="mt-2 text-sm text-gray-700">
//           <strong>Insights:</strong>
//           <ul className="list-disc ml-6">
//             {plan.insights.map((i, idx) => (
//               <li key={idx}>{i}</li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }



// import React, { useState } from "react";
// import { Sparkles, ChevronRight } from "lucide-react";

// export default function TaskList({ goal, plan }) {
//   const [hoveredId, setHoveredId] = useState(null);

//   if (!plan?.tasks) return null;

//   const getPriorityColor = (priority) => {
//     switch (priority) {
//       case "HIGH":
//         return "text-red-400 border-red-500/30";
//       case "MEDIUM":
//         return "text-violet-400 border-violet-500/30";
//       default:
//         return "text-cyan-400 border-cyan-500/30";
//     }
//   };

//   return (
//     <div className="group relative">
//       <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-red-600 rounded-2xl blur opacity-40 group-hover:opacity-80 transition duration-300"></div>
//       <div className="relative bg-black/80 backdrop-blur rounded-2xl p-8 border border-violet-500/20 group-hover:border-red-500/40 transition-all duration-300">
//         {/* Goal Header */}
//         <div className="mb-8">
//           <div className="flex items-center gap-3 mb-2">
//             <ChevronRight className="w-6 h-6 text-red-500 transition-transform duration-300 group-hover:translate-x-2" />
//             <h2 className="text-3xl font-black bg-gradient-to-r from-red-400 to-violet-400 bg-clip-text text-transparent">
//               {goal}
//             </h2>
//           </div>
//           {plan?.total_estimated_time && (
//             <p className="ml-9 text-violet-400/60 text-sm font-light tracking-wide">
//               ⏱️ {plan.total_estimated_time}
//             </p>
//           )}
//         </div>

//         {/* Tasks List */}
//         {plan?.tasks && plan.tasks.length > 0 && (
//           <div className="mb-8 space-y-3">
//             {plan.tasks.map((task) => (
//               <div
//                 key={task.id}
//                 onMouseEnter={() => setHoveredId(task.id)}
//                 onMouseLeave={() => setHoveredId(null)}
//                 className={`border-l-2 pl-4 py-2 transition-all duration-300 ${getPriorityColor(
//                   task.priority
//                 )} ${
//                   hoveredId === task.id ? "translate-x-2" : ""
//                 } cursor-pointer group/task`}
//               >
//                 <div className="flex justify-between items-start gap-4">
//                   <span className="text-white font-semibold text-lg group-hover/task:text-red-400 transition">
//                     {task.task}
//                   </span>
//                   <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded bg-black/50 border border-current/20 whitespace-nowrap">
//                     {task.duration}
//                   </span>
//                 </div>
//                 <span className="text-xs uppercase tracking-widest opacity-60 mt-1 inline-block">
//                   {task.priority}
//                 </span>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Insights Section */}
//         {plan?.insights && plan.insights.length > 0 && (
//           <div className="border-t border-violet-500/20 pt-6">
//             <h3 className="text-sm uppercase tracking-widest font-black text-violet-400 mb-4 flex items-center gap-2">
//               <Sparkles className="w-4 h-4" />
//               Strategic Insights
//             </h3>
//             <ul className="space-y-2">
//               {plan.insights.map((insight, idx) => (
//                 <li
//                   key={idx}
//                   className="text-red-400/80 text-sm font-light leading-relaxed flex gap-3"
//                 >
//                   <span className="text-red-500 font-bold flex-shrink-0">
//                     →
//                   </span>
//                   <span>{insight}</span>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



import React, { useState } from "react";
import { Sparkles, ChevronRight, Flag } from "lucide-react";

export default function TaskList({ goal, plan }) {
  const [hoveredId, setHoveredId] = useState(null);
  if (!plan?.tasks) return null;

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "HIGH":
        return "text-red-400 border-red-500/30";
      case "MEDIUM":
        return "text-violet-400 border-violet-500/30";
      default:
        return "text-cyan-400 border-cyan-500/30";
    }
  };

  return (
    <div className="group relative">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-red-600 rounded-2xl blur opacity-40 group-hover:opacity-80 transition duration-300"></div>
      <div className="relative bg-black/80 backdrop-blur rounded-2xl p-8 border border-violet-500/20 group-hover:border-red-500/40 transition-all duration-300">
        {/* Goal Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <ChevronRight className="w-6 h-6 text-red-500 transition-transform duration-300 group-hover:translate-x-2" />
            <h2 className="text-3xl font-black bg-gradient-to-r from-red-400 to-violet-400 bg-clip-text text-transparent">
              {goal}
            </h2>
          </div>
          {plan?.total_estimated_time && (
            <p className="ml-9 text-violet-400/60 text-sm font-light tracking-wide">
              ⏱️ {plan.total_estimated_time}
            </p>
          )}
        </div>

        {/* Tasks List */}
        {plan?.tasks && plan.tasks.length > 0 && (
          <div className="mb-10 space-y-3">
            {plan.tasks.map((task) => (
              <div
                key={task.id}
                onMouseEnter={() => setHoveredId(task.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`border-l-2 pl-4 py-3 transition-all duration-300 ${getPriorityColor(
                  task.priority
                )} ${
                  hoveredId === task.id ? "translate-x-2" : ""
                } cursor-pointer group/task`}
              >
                <div className="flex justify-between items-start gap-4">
                  <span className="text-white font-semibold text-lg group-hover/task:text-red-400 transition">
                    {task.task}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded bg-black/50 border border-current/20 whitespace-nowrap">
                    {task.duration}
                  </span>
                </div>

                {/* Description */}
                {task.description && (
                  <p className="text-sm text-violet-300/70 mt-2 leading-relaxed">
                    {task.description}
                  </p>
                )}

                {/* Dependencies */}
                {task.dependencies && task.dependencies.length > 0 && (
                  <p className="text-xs text-cyan-400/70 mt-1">
                    🔗 Depends on: {task.dependencies.join(", ")}
                  </p>
                )}

                <span className="text-xs uppercase tracking-widest opacity-60 mt-1 inline-block">
                  {task.priority}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Milestones */}
        {plan?.milestones && plan.milestones.length > 0 && (
          <div className="border-t border-violet-500/20 pt-6 mb-8">
            <h3 className="text-sm uppercase tracking-widest font-black text-violet-400 mb-4 flex items-center gap-2">
              <Flag className="w-4 h-4" />
              Key Milestones
            </h3>
            <ul className="space-y-2">
              {plan.milestones.map((m, i) => (
                <li
                  key={i}
                  className="text-sm text-white/80 flex justify-between border-l-2 border-red-500/30 pl-3"
                >
                  <span>{m.name}</span>
                  <span className="text-violet-400/70">
                    {m.expected_completion}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Insights */}
        {plan?.insights && plan.insights.length > 0 && (
          <div className="border-t border-violet-500/20 pt-6">
            <h3 className="text-sm uppercase tracking-widest font-black text-violet-400 mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Strategic Insights
            </h3>
            <ul className="space-y-2">
              {plan.insights.map((insight, idx) => (
                <li
                  key={idx}
                  className="text-red-400/80 text-sm font-light leading-relaxed flex gap-3"
                >
                  <span className="text-red-500 font-bold flex-shrink-0">
                    →
                  </span>
                  <span>{insight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
