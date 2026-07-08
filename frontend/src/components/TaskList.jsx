// import React, { useState } from "react";
// import { Sparkles, ChevronRight, Flag } from "lucide-react";

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

//         {plan?.tasks && plan.tasks.length > 0 && (
//           <div className="mb-10 space-y-3">
//             {plan.tasks.map((task) => (
//               <div
//                 key={task.id}
//                 onMouseEnter={() => setHoveredId(task.id)}
//                 onMouseLeave={() => setHoveredId(null)}
//                 className={`border-l-2 pl-4 py-3 transition-all duration-300 ${getPriorityColor(
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

//                 {task.description && (
//                   <p className="text-sm text-violet-300/70 mt-2 leading-relaxed">
//                     {task.description}
//                   </p>
//                 )}

//                 {task.dependencies && task.dependencies.length > 0 && (
//                   <p className="text-xs text-cyan-400/70 mt-1">
//                     🔗 Depends on: {task.dependencies.join(", ")}
//                   </p>
//                 )}

//                 <span className="text-xs uppercase tracking-widest opacity-60 mt-1 inline-block">
//                   {task.priority}
//                 </span>
//               </div>
//             ))}
//           </div>
//         )}

//         {plan?.milestones && plan.milestones.length > 0 && (
//           <div className="border-t border-violet-500/20 pt-6 mb-8">
//             <h3 className="text-sm uppercase tracking-widest font-black text-violet-400 mb-4 flex items-center gap-2">
//               <Flag className="w-4 h-4" />
//               Key Milestones
//             </h3>
//             <ul className="space-y-2">
//               {plan.milestones.map((m, i) => (
//                 <li
//                   key={i}
//                   className="text-sm text-white/80 flex justify-between border-l-2 border-red-500/30 pl-3"
//                 >
//                   <span>{m.name}</span>
//                   <span className="text-violet-400/70">
//                     {m.expected_completion}
//                   </span>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}

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
import { ChevronDown, Flag, Lightbulb } from "lucide-react";

const PRIORITY_ORDER = ["HIGH", "MEDIUM", "LOW"];

const PRIORITY_META = {
  HIGH: { label: "High priority", dot: "#f0655c" },
  MEDIUM: { label: "Medium priority", dot: "#e8a33d" },
  LOW: { label: "Low priority", dot: "#3ec28f" },
};

function TaskRow({ task }) {
  const meta = PRIORITY_META[task.priority] || PRIORITY_META.LOW;
  return (
    <div className="flex items-start gap-3 py-3">
      <span
        className="mt-[7px] w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{ backgroundColor: meta.dot }}
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between gap-3">
          <h4 className="text-[14px] font-medium text-[#e6e6e9] leading-snug">
            {task.task}
          </h4>
          {task.duration && (
            <span className="text-[11px] text-[#7a7a82] flex-shrink-0 whitespace-nowrap">
              {task.duration}
            </span>
          )}
        </div>

        {task.description && (
          <p className="text-[13px] text-[#8b8b93] mt-1 leading-relaxed">
            {task.description}
          </p>
        )}

        {task.dependencies && task.dependencies.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {task.dependencies.map((dep, i) => (
              <span
                key={i}
                className="text-[11px] px-2 py-0.5 rounded-full bg-[#1a1b21] text-[#9b9ba3] border border-[#23242b]"
              >
                {dep}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function PriorityGroup({ priority, tasks }) {
  const [open, setOpen] = useState(true);
  const meta = PRIORITY_META[priority] || PRIORITY_META.LOW;

  return (
    <div className="border-b border-[#1c1d22] last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-2 py-2.5 text-left"
      >
        <ChevronDown
          className={`w-3.5 h-3.5 text-[#6b6b74] transition-transform ${
            open ? "" : "-rotate-90"
          }`}
        />
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: meta.dot }}
        />
        <span className="text-[12px] font-medium uppercase tracking-wide text-[#9b9ba3]">
          {meta.label}
        </span>
        <span className="text-[12px] text-[#5f6068]">{tasks.length}</span>
      </button>
      {open && (
        <div className="pl-1 divide-y divide-[#1c1d22] pb-1">
          {tasks.map((task) => (
            <TaskRow key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function TaskList({ goal, plan }) {
  if (!plan?.tasks) return null;

  const grouped = PRIORITY_ORDER.map((p) => ({
    priority: p,
    tasks: plan.tasks.filter((t) => (t.priority || "LOW") === p),
  })).filter((g) => g.tasks.length > 0);

  return (
    <div className="space-y-6">
      {grouped.length > 0 && (
        <div className="rounded-lg border border-[#1c1d22]">
          <div className="px-3">
            {grouped.map((g) => (
              <PriorityGroup key={g.priority} priority={g.priority} tasks={g.tasks} />
            ))}
          </div>
        </div>
      )}

      {plan?.milestones && plan.milestones.length > 0 && (
        <div>
          <h3 className="flex items-center gap-2 text-[12px] font-medium uppercase tracking-wide text-[#9b9ba3] mb-4">
            <Flag className="w-3.5 h-3.5" />
            Milestones
          </h3>
          <div className="pl-1">
            {plan.milestones.map((m, i) => (
              <div key={i} className="relative pl-5 pb-5 last:pb-0">
                {i < plan.milestones.length - 1 && (
                  <span className="absolute left-[3px] top-3 bottom-[-8px] w-px bg-[#23242b]" />
                )}
                <span className="absolute left-0 top-1.5 w-[7px] h-[7px] rounded-full bg-[#5b6ef5]" />
                <p className="text-[13px] font-medium text-[#e6e6e9]">{m.name}</p>
                <p className="text-[12px] text-[#7a7a82] mt-0.5">
                  {m.expected_completion}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {plan?.insights && plan.insights.length > 0 && (
        <div>
          <h3 className="flex items-center gap-2 text-[12px] font-medium uppercase tracking-wide text-[#9b9ba3] mb-3">
            <Lightbulb className="w-3.5 h-3.5" />
            Insights
          </h3>
          <div className="rounded-lg border-l-2 border-[#5b6ef5] bg-[#15161b] px-4 py-3 space-y-2">
            {plan.insights.map((insight, idx) => (
              <p key={idx} className="text-[13px] text-[#a8a8b3] leading-relaxed">
                {insight}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}