/**
 * Usage:
 *   import { generateContent } from '@wanderbuddy/agent/clients';
 *   const text = await generateContent('Plan a trip to Paris');
 */

import { GoogleGenAI } from '@google/genai';

let _client = null;

/**
 * Get or create the singleton Gemini client.
 */
export function getClient() {
  if (!_client) {
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) throw new Error('GOOGLE_API_KEY is not set');
    _client = new GoogleGenAI({ apiKey });
  }
  return _client;
}

/**
 * Generate content using Gemini.
 *
 * @param {string} prompt - The prompt text
 * @param {object} [options]
 * @param {string} [options.model='gemini-3.0-flash'] - Model name
 * @param {number} [options.temperature=0.7]
 * @param {boolean} [options.json=false] - If true, requests JSON response
 * @param {string} [options.systemInstruction] - System prompt
 * @returns {Promise<string>} Raw text response
 */
export async function generateContent(prompt, options = {}) {
  const ai = getClient();
  const model = options.model || 'gemini-3.1-flash-lite';

  const config = {
    temperature: options.temperature ?? 0.7,
  };

  if (options.json) {
    config.responseMimeType = 'application/json';
  }

  if (options.systemInstruction) {
    config.systemInstruction = options.systemInstruction;
  }

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config,
  });

  return response.text;
}

/**
 * Generate structured JSON content using Gemini.
 *
 * @param {string} prompt
 * @param {object} [options] - Same as generateContent but json defaults to true
 * @returns {Promise<object>} Parsed JSON response
 */
export async function generateJSON(prompt, options = {}) {
  const text = await generateContent(prompt, { ...options, json: true });
  return JSON.parse(text);
}
