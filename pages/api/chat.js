// pages/api/chat.js
// This is the server-side API route that securely handles requests to the Google AI API.

// Import the Google Generative AI SDK
// Make sure to install it: npm install @google/generative-ai
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

// --- Configuration ---
// Access your API key from environment variables for security
const apiKey = process.env.GOOGLE_API_KEY;
// Specify the model name you want to use
// const modelName = "gemini-1.5-flash-latest"; // Or your specific model like "models/gemini-2.0-flash"
const modelName = "models/gemini-2.0-flash"

// --- Safety Settings (Optional but Recommended) ---
// Configure safety settings to block harmful content. Adjust as needed.
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

// --- Generation Configuration (Optional) ---
// Configure model generation parameters (e.g., temperature, max output tokens)
const generationConfig = {
  // temperature: 0.9, // Controls randomness (0.0 = deterministic, 1.0 = max randomness)
  // topK: 1,
  // topP: 1,
  // maxOutputTokens: 2048, // Limit the length of the response
};


// --- Initialize the Google AI Client ---
// Ensure API key exists before initializing
let genAI;
if (apiKey) {
  genAI = new GoogleGenerativeAI(apiKey);
} else {
  console.error("FATAL: GOOGLE_API_KEY environment variable not set.");
  // Optionally, you could throw an error here to prevent the server from starting without a key
}

// --- API Route Handler ---
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']); // Inform client which methods are allowed
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  // Check if the API key was loaded correctly
  if (!genAI) {
      return res.status(500).json({ error: "AI Service is not configured on the server due to missing API key." });
  }

  // --- Input Validation ---
  const { message } = req.body;
  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({ error: 'Message is required and must be a non-empty string.' });
  }

  // --- Call Google AI API ---
  try {
    // Get the generative model instance
    const model = genAI.getGenerativeModel({
        model: modelName,
        safetySettings,       // Apply safety settings
        generationConfig,     // Apply generation config
    });

    // Send the user's message to the model
    const result = await model.generateContent(message.trim()); // Trim message before sending
    const response = await result.response;

    // --- Process the Response ---
    // Check if the response was blocked due to safety settings
    if (!response.candidates || response.candidates.length === 0 || response.candidates[0].finishReason !== 'STOP') {
        const blockReason = response.promptFeedback?.blockReason || 'unknown reason';
        console.warn(`AI response blocked. Reason: ${blockReason}`);
        // You might want to return a specific message indicating content was blocked
        return res.status(200).json({ reply: "I cannot provide a response to that request due to safety guidelines." });
    }

    // Extract the text response
    const text = response.text();

    // Send the successful reply back to the frontend
    res.status(200).json({ reply: text });

  } catch (error) {
    // --- Error Handling ---
    console.error("Error calling Google AI API:", error);
    // Provide a generic error message to the client for security
    res.status(500).json({ error: 'Failed to get response from AI service. Please try again later.' });
    }
}