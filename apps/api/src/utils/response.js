import { CODES, CODE_META } from '../utils/codes.js';

/**
 * Format a service result into an HTTP response.
 * Used by all controllers.
 */
export function sendResponse(res, serviceResult) {
  const meta = CODE_META[serviceResult.code] || CODE_META[CODES.INTERNAL_ERROR];

  const body = {
    success: serviceResult.ok,
    message: meta.publicMessage,
    data: serviceResult.data ?? null,
  };

  if (serviceResult.warnings?.length) {
    body.warnings = serviceResult.warnings;
  }

  return res.status(meta.httpStatus).json(body);
}
