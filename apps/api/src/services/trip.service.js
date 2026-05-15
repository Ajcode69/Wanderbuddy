/**
 * Trip Service — business logic layer.
 * Does NOT know about HTTP (req/res). Returns standardized result objects.
 */

import { tripGraph } from '@wanderbuddy/agent';
import { normalizeBlocks } from '@wanderbuddy/shared';
import { CODES } from '../utils/codes.js';

/**
 * Generate a trip plan using the AI agent workflow.
 *
 * @param {{ destination?: string, days?: number, preferences?: string, description?: string }} payload
 * @returns {Promise<{ ok: boolean, code: string, message: string, data: any, warnings: string[] }>}
 */
export async function generateTripPlan(payload) {
  const { destination, days, preferences, description } = payload;

  try {
    const result = await tripGraph.invoke({
      destination: destination || '',
      days: days || 0,
      preferences: preferences || '',
      description: description || '',
    });

    if (result.status === 'failed') {
      return {
        ok: false,
        code: CODES.AGENT_FAILED,
        message: `Agent error: ${result.error}`,
        data: null,
        warnings: [],
      };
    }

    return {
      ok: true,
      code: CODES.TRIP_PLAN_GENERATED,
      message: 'Trip plan generated successfully',
      data: { itinerary: result.itinerary },
      warnings: [],
    };
  } catch (err) {
    return {
      ok: false,
      code: CODES.INTERNAL_ERROR,
      message: `Service error: ${err.message}`,
      data: null,
      warnings: [],
    };
  }
}

/**
 * Process a chat conversation turn using the AI agent in chat mode.
 * Returns an array of Gen UI blocks.
 *
 * @param {{ messages: Array<{ role: string, content: string }> }} payload
 * @returns {Promise<{ ok: boolean, code: string, message: string, data: any, warnings: string[] }>}
 */
export async function chatStep(payload) {
  const { messages } = payload;

  try {
    const result = await tripGraph.invoke({
      mode: 'chat',
      messages,
    });

    if (result.status === 'failed') {
      return {
        ok: false,
        code: CODES.AGENT_FAILED,
        message: `Agent error: ${result.error}`,
        data: { blocks: result.blocks || [] },
        warnings: [],
      };
    }

    const blocks = normalizeBlocks(result.blocks);

    return {
      ok: true,
      code: CODES.TRIP_PLAN_GENERATED,
      message: 'Chat step completed',
      data: { blocks },
      warnings: [],
    };
  } catch (err) {
    return {
      ok: false,
      code: CODES.INTERNAL_ERROR,
      message: `Service error: ${err.message}`,
      data: null,
      warnings: [],
    };
  }
}

