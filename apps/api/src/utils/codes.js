/**
 * Centralized response codes.
 * Every service returns { ok, code, message, data, warnings }.
 * Controllers map `code` → HTTP status + public message via CODE_META.
 */

export const CODES = {
  // ─── Success ────────────────────────────────────────
  TRIP_PLAN_GENERATED: 'TRIP_PLAN_GENERATED',
  TRIP_FETCHED: 'TRIP_FETCHED',

  // ─── Client Errors ─────────────────────────────────
  VALIDATION_FAILED: 'VALIDATION_FAILED',
  NOT_FOUND: 'NOT_FOUND',
  BAD_REQUEST: 'BAD_REQUEST',

  // ─── Server Errors ─────────────────────────────────
  AGENT_FAILED: 'AGENT_FAILED',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
};

export const CODE_META = {
  [CODES.TRIP_PLAN_GENERATED]: {
    httpStatus: 200,
    publicMessage: 'Trip itinerary generated successfully.',
  },
  [CODES.TRIP_FETCHED]: {
    httpStatus: 200,
    publicMessage: 'Trip retrieved successfully.',
  },
  [CODES.VALIDATION_FAILED]: {
    httpStatus: 400,
    publicMessage: 'Invalid request. Please check your input.',
  },
  [CODES.NOT_FOUND]: {
    httpStatus: 404,
    publicMessage: 'The requested resource was not found.',
  },
  [CODES.BAD_REQUEST]: {
    httpStatus: 400,
    publicMessage: 'Bad request.',
  },
  [CODES.AGENT_FAILED]: {
    httpStatus: 502,
    publicMessage: 'AI agent failed to generate the itinerary. Please try again.',
  },
  [CODES.INTERNAL_ERROR]: {
    httpStatus: 500,
    publicMessage: 'An unexpected error occurred.',
  },
};
