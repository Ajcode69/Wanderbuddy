/**
 * Trip Planning Workflow — LangGraph StateGraph.
 *
 * Usage:
 *   import { tripGraph } from '@wanderbuddy/agent/workflows';
 *   const result = await tripGraph.invoke({
 *     destination: 'Tokyo',
 *     days: 5,
 *     description: 'A culinary journey through Japan',
 *   });
 */

import { Annotation, StateGraph, START, END } from '@langchain/langgraph';
import { planTrip } from '../nodes/planner.js';

// ─── State Schema ───────────────────────────────────────────
const TripState = Annotation.Root({
  // Inputs
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

  // Outputs
  itinerary: Annotation({
    reducer: (_, y) => y ?? _,
    default: () => null,
  }),
  status: Annotation({
    reducer: (_, y) => y ?? _,
    default: () => 'pending',
  }),
  error: Annotation({
    reducer: (_, y) => y ?? _,
    default: () => null,
  }),
});

// ─── Graph ──────────────────────────────────────────────────
const workflow = new StateGraph(TripState)
  .addNode('planner', planTrip)
  .addEdge(START, 'planner')
  .addEdge('planner', END);

export const tripGraph = workflow.compile();
