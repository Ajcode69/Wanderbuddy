/**
 * Agent Tools — functions that agents can invoke.
 *
 * Tools wrap external capabilities (search, APIs, DB lookups) for agent use.
 *
 * Usage from any workspace:
 *   import { weatherTool } from '@wanderbuddy/agent/tools';
 *
 * Example:
 *   import { DynamicTool } from '@langchain/core/tools';
 *
 *   export const weatherTool = new DynamicTool({
 *     name: 'get_weather',
 *     description: 'Get current weather for a destination city',
 *     func: async (city) => {
 *       const res = await fetch(`https://api.weather.com/...`);
 *       return res.json();
 *     },
 *   });
 */

// Export tools here as they are created:
// export { weatherTool } from './weather.js';
// export { searchPlacesTool } from './search-places.js';
