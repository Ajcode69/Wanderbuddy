/**
 * Shared constants used across API, Agent, and Web services.
 */

export const TRIP_STATUS = {
  DRAFT: 'DRAFT',
  PLANNING: 'PLANNING',
  CONFIRMED: 'CONFIRMED',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
};

export const SERVICES = {
  API: { name: 'wanderbuddy-api', port: 4000 },
  AGENT: { name: 'wanderbuddy-agent', port: 4100 },
  WEB: { name: 'wanderbuddy-web', port: 5173 },
};
