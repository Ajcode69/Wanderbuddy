/**
 * Agent Clients — LLM and API client initialization.
 *
 * Centralized client setup so all nodes/tools use the same configured instances.
 *
 * Usage from any workspace:
 *   import { llm } from '@wanderbuddy/agent/clients';
 *
 * Example:
 *   import { ChatOpenAI } from '@langchain/openai';
 *
 *   export const llm = new ChatOpenAI({
 *     model: 'gpt-4o-mini',
 *     temperature: 0.7,
 *   });
 */

// Export clients here as they are created:
// export { llm } from './openai.js';
// export { gemini } from './google.js';
