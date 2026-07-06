# FIFA Nexus: Architectural Deep Dive

## The Problem
Stadium operations during the FIFA World Cup are highly reactive. By the time staff notice a bottleneck at a concession stand, fan experience has already degraded.

## The GenAI Solution
FIFA Nexus uses a **Multi-Agent Architecture** powered by Google Gemini 2.5 Flash to transition stadium operations from reactive to **autonomous and proactive**.

### 1. The Multi-Agent Pipeline
Instead of a single system prompt, we orchestrate multiple specialized agents:
- **The Predictor Agent:** Ingests live telemetry (simulated for the hackathon) regarding crowd density across stadium zones (W1-W3, E1-E3). It uses temporal reasoning to identify trend lines that indicate an impending bottleneck before it occurs.
- **The Dispatcher Agent:** Receives the structured output from the Predictor. Its sole function is resource allocation. It identifies the nearest available staff (medical, security, or concessions) and issues an autonomous dispatch command.

### 2. Structured JSON Outputs (Function Calling)
To allow the AI to control the actual application state, we enforce strict output schemas using the `@google/generative-ai` SDK's `SchemaType`.
The AI returns a JSON array of actionable commands (e.g., `{"zone": "W1", "action": "DISPATCH_STAFF"}`). The React frontend intercepts this JSON and updates the live heatmap and KPI metrics in real-time, completely bypassing human intervention.

### 3. Context Grounding & Multimodal Vision
For the Fan Portal, the Gemini assistant is grounded in real-time stadium metrics. When a user asks "Where is the shortest food line?", the system injects the current wait times into the prompt context. 
Furthermore, fans can use **Gemini Vision** by uploading photos of their tickets. The model extracts seat numbers and correlates them with the optimal gate and path, avoiding crowded zones.
