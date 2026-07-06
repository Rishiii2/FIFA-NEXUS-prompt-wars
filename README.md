# FIFA Nexus - PromptWars Hackathon 2026

**Live Deployment:** [https://fifa-nexus-prompt-wars.vercel.app/](https://fifa-nexus-prompt-wars.vercel.app/)

## Overview
FIFA Nexus is an advanced, autonomous GenAI operations platform explicitly engineered to solve the core problem statement for the FIFA World Cup 2026: **Optimizing Stadium Operations and Enhancing Fan Experience using Generative AI**.

By moving beyond simple chat interfaces and leveraging deep Multi-Agent Orchestration, Structured JSON Outputs, and Context Grounding, FIFA Nexus directly addresses the massive scale and complexity of stadium management for the upcoming World Cup.

👉 **[Read the Architectural Deep Dive](ARCHITECTURE.md)**

## Problem Statement Alignment

The World Cup 2026 will be the largest ever. Stadium operators face unprecedented challenges in crowd control, incident response, and fan satisfaction. 

Our solution explicitly solves these pain points through three core GenAI pillars:

### 1. Multi-Agent Orchestration for Autonomous Operations
Instead of a single LLM answering questions, we deployed a **Multi-Agent Chaining Architecture**:
- **Predictor Agent:** Analyzes real-time density data and forecasts upcoming bottlenecks.
- **Dispatcher Agent:** Consumes the Predictor's output and autonomously reassigns staff (e.g., sending medical personnel to Zone 3).
This directly solves the operational challenge of proactive resource management.

### 2. Structured Tool Use (Function Calling)
The AI doesn't just output text; it interacts directly with our application state. By using Gemini 2.5 Flash's `SchemaType`, the AI generates strict JSON outputs that our frontend intercepts to autonomously update the live heatmaps and dispatch queues.

### 3. Multimodal Chain-of-Thought (Vision)
Fans can upload photos (e.g., pictures of their tickets or landmarks in the stadium). The Gemini Vision model performs a visual analysis, extracts textual and spatial context, and provides hyper-personalized navigation instructions. 

## Technical Implementation Details
- **Frontend:** React + Vite
- **AI Models:** Google Gemini 2.5 Flash (via `@google/generative-ai`)
- **Data Visualization:** Recharts (Predictive Density Modeling)
- **Security & Quality:** 
  - Strict Content-Security-Policy (CSP) headers implemented.
  - Input sanitization via `DOMPurify` to prevent XSS.
  - Comprehensive Unit Testing via `Vitest` and `@testing-library/react`.
  - Full W3C Web Accessibility (a11y) compliance with semantic HTML and ARIA labels.

## How to Run Locally
1. Clone the repository
2. `npm install`
3. Run tests with `npm run test`
4. Run the server with `npm run dev`

---
*Built for the Hack2skill PromptWars 2026.*
