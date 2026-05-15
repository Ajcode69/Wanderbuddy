/**
 * Gen UI Block Types — the contract between agent and frontends.
 *
 * Each block has a `type` field that maps to a frontend component.
 * If no matching component exists, the frontend falls back to plain text.
 */

export const UI_BLOCK_TYPES = {
  TEXT: 'text',
  QUICK_REPLIES: 'quick_replies',
  DESTINATION_CARD: 'destination_card',
  BUDGET_CARD: 'budget_card',
  CHECKLIST: 'checklist',
  ITINERARY_DAY: 'itinerary_day',
};

/**
 * All known block types as a Set for fast lookup.
 */
export const KNOWN_BLOCK_TYPES = new Set(Object.values(UI_BLOCK_TYPES));

/**
 * Check if a block type is known/renderable.
 * @param {string} type
 * @returns {boolean}
 */
export function isKnownBlockType(type) {
  return KNOWN_BLOCK_TYPES.has(type);
}

/**
 * Normalize a raw agent response into validated blocks.
 * Unknown types get converted to text blocks.
 *
 * @param {Array} rawBlocks - Array of block objects from the agent
 * @returns {Array} - Validated and normalized blocks
 */
export function normalizeBlocks(rawBlocks) {
  if (!Array.isArray(rawBlocks)) return [];

  return rawBlocks.map((block, i) => {
    if (!block || typeof block !== 'object') {
      return { id: `block-${i}`, type: UI_BLOCK_TYPES.TEXT, content: String(block) };
    }

    const normalized = {
      id: block.id || `block-${i}-${Date.now()}`,
      type: isKnownBlockType(block.type) ? block.type : UI_BLOCK_TYPES.TEXT,
      ...block,
    };

    // If type was unknown, wrap original data in content
    if (!isKnownBlockType(block.type) && !block.content) {
      normalized.content = JSON.stringify(block);
    }

    return normalized;
  });
}
