/**
 * Planner Node — generates a structured trip itinerary via Gemini.
 *
 * This is a LangGraph node function: (state) => partial state update.
 */

import { generateJSON } from '../clients/gemini.js';
import { SYSTEM_PROMPT, buildPlannerPrompt } from '../utils/prompts.js';

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
