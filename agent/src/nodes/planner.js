import { generateJSON } from '../clients/gemini.js';
import { SYSTEM_PROMPT, buildPlannerPrompt, CHAT_SYSTEM_PROMPT, buildChatPrompt } from '../utils/prompts.js';

export async function planTrip(state) {
  const { destination, days, preferences, description } = state;

  const prompt = buildPlannerPrompt({ destination, days, preferences, description });

  try {
    const itinerary = await generateJSON(prompt, {
      systemInstruction: SYSTEM_PROMPT,
      temperature: 0.8,
    });

    return {
      itinerary,
      status: 'completed',
      error: null,
    };
  } catch (err) {
    console.error('[PLANNER NODE] Error:', err.message);
    return {
      itinerary: null,
      status: 'failed',
      error: err.message,
    };
  }
}

/**
 * Chat Step Node — processes a conversation turn and returns Gen UI blocks.
 *
 * Takes the full message history, sends to Gemini with the chat system prompt,
 * and returns an array of typed UI blocks.
 */
export async function chatStep(state) {
  const { messages } = state;

  const prompt = buildChatPrompt(messages);

  try {
    const blocks = await generateJSON(prompt, {
      systemInstruction: CHAT_SYSTEM_PROMPT,
      temperature: 0.9,
    });

    // Ensure we always get an array
    const blockArray = Array.isArray(blocks) ? blocks : [blocks];

    return {
      blocks: blockArray,
      status: 'completed',
      error: null,
    };
  } catch (err) {
    console.error('[CHAT STEP NODE] Error:', err.message);
    return {
      blocks: [{ type: 'text', content: `Sorry, I had trouble responding. Please try again. (${err.message})` }],
      status: 'failed',
      error: err.message,
    };
  }
}
