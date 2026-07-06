import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

// Initialize a fast model for chat and simple analysis
const model = genAI ? genAI.getGenerativeModel({ model: "gemini-2.5-flash" }) : null;

// Helper to convert File or Blob to generative part
async function fileToGenerativePart(file) {
  const base64EncodedDataPromise = new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(',')[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
}

export const getGeminiChatResponse = async (userMessage, contextData, imageFile = null) => {
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
If an image is provided, it is likely a ticket or a view of the stadium. Analyze it and help them find their seat or navigate the stadium avoiding crowded zones.

Fan Question: ${userMessage}
`;
    
    let result;
    if (imageFile) {
      const imagePart = await fileToGenerativePart(imageFile);
      result = await model.generateContent([prompt, imagePart]);
    } else {
      result = await model.generateContent(prompt);
    }
    
    return result.response.text();
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having trouble connecting to the network right now. Please try again later.";
  }
};

export const runMultiAgentPipeline = async (zonesData) => {
  if (!model) return null;

  try {
    const highDensityZones = zonesData.filter(z => z.density >= 80).map(z => `${z.id} (${z.density}%)`).join(', ');
    
    if (!highDensityZones) return null; // No alerts needed if no high density

    const schema = {
      type: SchemaType.OBJECT,
      properties: {
        reasoningTrace: {
          type: SchemaType.STRING,
          description: "A short trace of the agents thought process. E.g., 'Predictor Agent: Zone N3 is overcrowding. Dispatcher Agent: Deploying 5 staff to N3.'"
        },
        actions: {
          type: SchemaType.ARRAY,
          description: "An array of specific actions to execute.",
          items: {
            type: SchemaType.OBJECT,
            properties: {
              zone: { type: SchemaType.STRING, description: "The zone ID, e.g. N3" },
              actionType: { type: SchemaType.STRING, description: "Action type, e.g. 'deploy_staff'" },
              densityReduction: { type: SchemaType.INTEGER, description: "Estimated density reduction %, e.g., 5" },
              message: { type: SchemaType.STRING, description: "Alert message for staff" }
            },
            required: ["zone", "actionType", "densityReduction", "message"]
          }
        }
      },
      required: ["reasoningTrace", "actions"]
    };

    const structuredModel = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: schema,
      }
    });

    const prompt = `
You are a Multi-Agent AI system managing a FIFA World Cup stadium.
Predictor Agent: Analyze the current high density zones: ${highDensityZones}.
Dispatcher Agent: Create actionable steps to resolve these bottlenecks.

Generate a reasoning trace of the agents' thoughts, and a list of structured actions to reduce density.
`;
    const result = await structuredModel.generateContent(prompt);
    const jsonStr = result.response.text();
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
};
