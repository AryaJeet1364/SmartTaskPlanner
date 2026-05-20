// require("dotenv").config();
// const { GoogleGenAI } = require("@google/genai");
// const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// const generatePlan = async (prompt) => {
//   const result = await ai.models.generateContent({
//     model: "gemini-2.0-flash",
//     contents: [{ role: "user", parts: [{ text: prompt }] }],
//   });

//   const text = result.candidates[0].content.parts[0].text;

//   // Handle markdown / JSON formats
//   const jsonMatch =
//     text.match(/```json\n([\s\S]*?)\n```/) ||
//     text.match(/```\n([\s\S]*?)\n```/) ||
//     text.match(/\{[\s\S]*\}/);

//   return JSON.parse(jsonMatch ? jsonMatch[1] || jsonMatch[0] : text);
// };

// module.exports = { generatePlan };




require("dotenv").config();
const Groq = require("groq-sdk");
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const generatePlan = async (prompt) => {
  const result = await groq.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "llama-3.3-70b-versatile",
  });

  const text = result.choices[0].message.content;

  // Handle markdown / JSON formats
  const jsonMatch =
    text.match(/```json\n([\s\S]*?)\n```/) ||
    text.match(/```\n([\s\S]*?)\n```/) ||
    text.match(/\{[\s\S]*\}/);

  return JSON.parse(jsonMatch ? jsonMatch[1] || jsonMatch[0] : text);
};

module.exports = { generatePlan };
