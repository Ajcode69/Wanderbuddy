/**
 * Agent Nodes — LangGraph node functions.
 *
 * Each node is a pure function: (state) => updatedState
 * Nodes are composed into workflows via LangGraph's StateGraph.
 *
 * Usage from any workspace:
 *   import { researchNode } from '@wanderbuddy/agent/nodes';
 *
 * Example node:
 *   export async function researchDestination(state) {
 *     const result = await llm.invoke(...);
 *     return { ...state, research: result };
 *   }
 */

// Export nodes here as they are created:
// export { researchDestination } from './research.js';
// export { generateItinerary } from './itinerary.js';
