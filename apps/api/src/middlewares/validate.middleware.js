import { CODES, CODE_META } from '../utils/codes.js';

/**
 * Zod validation middleware factory.
 * Validates req.body against the provided Zod schema.
 *
 * Usage in routes:
 *   import { validate } from '../middlewares/validate.middleware.js';
 *   router.post('/plan', validate(planTripSchema), controller.planTrip);
 */
export function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const meta = CODE_META[CODES.VALIDATION_FAILED];
      return res.status(meta.httpStatus).json({
        success: false,
        message: meta.publicMessage,
        errors: result.error.issues.map((issue) => ({
          field: issue.path.join('.'),
          message: issue.message,
        })),
      });
    }

    req.validatedBody = result.data;
    next();
  };
}
