/**
 * Trip Planning Workflow — LangGraph StateGraph.
 *
 * Supports two modes:
 *   - "generate" (default): One-shot itinerary generation (existing behavior)
 *   - "chat": Conversational Gen UI flow — returns UI blocks
 *
 * Usage:
 *   // Generate mode (existing)
 *   const result = await tripGraph.invoke({ destination: 'Tokyo', days: 5, description: '...' });
 *
 *   // Chat mode (new)
 *   const result = await tripGraph.invoke({ mode: 'chat', messages: [...] });
 */

import { Annotation, StateGraph, START, END } from '@langchain/langgraph';
import { planTrip, chatStep } from '../nodes/planner.js';

// ─── State Schema ───────────────────────────────────────────
const TripState = Annotation.Root({
  // Mode selector: "generate" | "chat"
  mode: Annotation({
    reducer: (_, y) => y ?? _,
    default: () => 'generate',
  }),

  // Inputs (generate mode)
  destination: Annotation({
    reducer: (_, y) => y ?? _,
    default: () => '',
  }),
  days: Annotation({
    reducer: (_, y) => y ?? _,
    default: () => 0,
  }),
  preferences: Annotation({
    reducer: (_, y) => y ?? _,
    default: () => '',
  }),
  description: Annotation({
    reducer: (_, y) => y ?? _,
    default: () => '',
  }),

  // Inputs (chat mode)
  messages: Annotation({
    reducer: (_, y) => y ?? _,
    default: () => [],
  }),

  // Outputs (generate mode)
  itinerary: Annotation({
    reducer: (_, y) => y ?? _,
    default: () => null,
  }),

  // Outputs (chat mode)
  blocks: Annotation({
    reducer: (_, y) => y ?? _,
    default: () => [],
  }),

  // Shared outputs
  status: Annotation({
    reducer: (_, y) => y ?? _,
    default: () => 'pending',
  }),
  error: Annotation({
    reducer: (_, y) => y ?? _,
    default: () => null,
  }),
});

// ─── Router ─────────────────────────────────────────────────
function routeByMode(state) {
  return state.mode === 'chat' ? 'chatStep' : 'planner';
}

// ─── Graph ──────────────────────────────────────────────────
const workflow = new StateGraph(TripState)
  .addNode('planner', planTrip)
  .addNode('chatStep', chatStep)
  .addConditionalEdges(START, routeByMode, {
    planner: 'planner',
    chatStep: 'chatStep',
  })
  .addEdge('planner', END)
  .addEdge('chatStep', END);

export const tripGraph = workflow.compile();

