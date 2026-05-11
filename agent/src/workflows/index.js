/**
 * Agent Workflows — LangGraph graph definitions.
 *
 * Workflows compose nodes + edges + conditional routing into executable graphs.
 *
 * Usage from any workspace:
 *   import { plannerGraph } from '@wanderbuddy/agent/workflows';
 *   const result = await plannerGraph.invoke({ destination: 'Tokyo', days: 5 });
 *
 * Example:
 *   import { StateGraph, END } from '@langchain/langgraph';
 *   import { researchDestination } from '../nodes/research.js';
 *   import { generateItinerary } from '../nodes/itinerary.js';
 *
 *   const workflow = new StateGraph({ channels: { ... } })
 *     .addNode('research', researchDestination)
 *     .addNode('plan', generateItinerary)
 *     .addEdge('research', 'plan')
 *     .addEdge('plan', END);
 *
 *   export const plannerGraph = workflow.compile();
 */

// Export workflows here as they are created:
// export { plannerGraph } from './planner.js';
