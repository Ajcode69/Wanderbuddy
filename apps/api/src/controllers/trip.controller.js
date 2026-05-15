/**
 * Trip Controller — HTTP request handling.
 * Extracts params, calls Service, formats response. No business logic.
 */

import * as tripService from '../services/trip.service.js';
import { sendResponse } from '../utils/response.js';
import { CODES } from '../utils/codes.js';

export async function planTrip(req, res) {
  try {
    const result = await tripService.generateTripPlan(req.validatedBody);
    return sendResponse(res, result);
  } catch (err) {
    console.error('[TRIP CONTROLLER] Unhandled error:', err);
    return sendResponse(res, {
      ok: false,
      code: CODES.INTERNAL_ERROR,
      message: err.message,
    });
  }
}

export async function chat(req, res) {
  try {
    const result = await tripService.chatStep(req.validatedBody);
    return sendResponse(res, result);
  } catch (err) {
    console.error('[TRIP CONTROLLER] Chat error:', err);
    return sendResponse(res, {
      ok: false,
      code: CODES.INTERNAL_ERROR,
      message: err.message,
    });
  }
}
