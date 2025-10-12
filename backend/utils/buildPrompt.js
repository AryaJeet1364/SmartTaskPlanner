const buildPrompt = (goal) => `
You are an intelligent AI project planner. Break down the following goal into actionable, well-structured tasks.

Goal: "${goal}"

Respond ONLY with valid JSON (no markdown, no explanations). Use the format:

{
  "goal": "${goal}",
  "total_estimated_time": "Overall estimated duration (e.g., '2-4 weeks', '3 months')",
  "tasks": [
    {
      "id": 1,
      "task": "Task name",
      "description": "Brief explanation of what to do",
      "duration": "Time estimate for this task (e.g., '2 days', '1 week')",
      "dependencies": ["IDs of tasks that must be completed before this (if any)"],
      "priority": "HIGH" | "MEDIUM" | "LOW"
    }
  ],
  "milestones": [
    {
      "name": "Milestone title",
      "expected_completion": "Approx timeline (e.g., 'Week 2', 'Month 1')"
    }
  ],
  "insights": [
    "Strategic insight 1",
    "Strategic insight 2",
    "Strategic insight 3"
  ]
}
`;

module.exports = buildPrompt;
