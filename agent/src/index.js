/**
 * @wanderbuddy/agent — barrel export
 *
 * Library mode:
 *   import { tripGraph } from '@wanderbuddy/agent';
 *   import { generateContent } from '@wanderbuddy/agent/clients';
 *   import { planTrip } from '@wanderbuddy/agent/nodes';
 */

export { tripGraph } from './workflows/index.js';
export { planTrip } from './nodes/index.js';
export { generateContent, generateJSON, getClient } from './clients/index.js';
export { SYSTEM_PROMPT, buildPlannerPrompt } from './utils/index.js';

// Re-export namespaces
export * as workflows from './workflows/index.js';
export * as nodes from './nodes/index.js';
export * as tools from './tools/index.js';
export * as clients from './clients/index.js';
export * as utils from './utils/index.js';
