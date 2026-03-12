/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import { GoogleGenAI } from "@google/genai";
import { PRODUCTS } from '../constants';

const getSystemInstruction = () => {
  const productContext = PRODUCTS.map(p => 
    `- ${p.name} ($${p.price}): ${p.description}. Features: ${p.features.join(', ')}`
  ).join('\n');

  return `You are the AI Concierge for "Shurekate", a warm, organic lifestyle tech brand. 
  Your tone is calm, inviting, grounded, and sophisticated. Avoid overly "techy" jargon; prefer words like "natural", "seamless", "warm", and "texture".
  
  Here is our current product catalog:
  ${productContext}
  
  Answer customer questions about specifications, recommendations, and brand philosophy.
  Keep answers concise (under 3 sentences usually) to fit the chat UI. 
  If asked about products not in the list, gently steer them back to Shurekate products.`;
};

export const sendMessageToGemini = async (history: {role: string, text: string}[], newMessage: string): Promise<string> => {
  // Mock response since API key is not available locally
  console.log("Gemini API is currently disabled. Mocking response for:", newMessage);
  
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

  return "Thank you for your message. Our AI concierge is currently offline for maintenance, but feel free to browse our collection or reach out to support@shurekate.com for assistance.";
};
