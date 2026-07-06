import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

// Initialize a fast model for chat and simple analysis
const model = genAI ? genAI.getGenerativeModel({ model: "gemini-2.5-flash" }) : null;

export const getGeminiChatResponse = async (userMessage, contextData) => {
  if (!model) return "Error: Gemini API key is missing or invalid. Check your .env.local file.";
  
  try {
    const prompt = `
You are the AI Assistant for the FIFA World Cup 2026 stadium app, "FIFA Nexus". 
You are speaking directly to a fan inside the stadium. Be helpful, concise, and enthusiastic.
Use the following live data to answer their questions accurately.

Live Stadium Context:
- Overall Capacity: ${contextData.capacity}%
- Food Wait Time: ${contextData.waitTimes.food} mins
- Restroom Wait Time: ${contextData.waitTimes.restroom} mins
- Merchandise Wait Time: ${contextData.waitTimes.merch} mins

If they ask a question in a language other than English, reply in that same language. Do NOT use markdown bold/italics unless necessary, keep it plain.

Fan Question: ${userMessage}
`;
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having trouble connecting to the network right now. Please try again later.";
  }
};

export const getOperationalAlerts = async (zonesData) => {
  if (!model) return null;

  try {
    const highDensityZones = zonesData.filter(z => z.density >= 80).map(z => `${z.id} (${z.density}%)`).join(', ');
    
    if (!highDensityZones) return null; // No alerts needed if no high density

    const prompt = `
You are an AI Operational Manager for a FIFA World Cup stadium.
You monitor crowd density. The following zones currently have critically high density (over 80%):
${highDensityZones}

Generate a short, urgent, actionable alert message (max 2 sentences) for the stadium security team advising them on what to do. Example: "High density detected in North Gates. Dispatch 5 staff members immediately to open auxiliary turnstiles."
Do NOT use markdown or bold text, just plain text.
`;
    const result = await model.generateContent(prompt);
    return {
      text: result.response.text().trim(),
      type: 'warning'
    };
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
};
