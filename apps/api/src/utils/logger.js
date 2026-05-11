const LOG_LEVELS = { error: 0, warn: 1, info: 2, debug: 3 };
const currentLevel = LOG_LEVELS[process.env.LOG_LEVEL || 'info'];

/**
 * Lightweight structured logger.
 * Replace with pino/winston when you need file transport or structured JSON.
 */
const logger = {
  error: (...args) => currentLevel >= LOG_LEVELS.error && console.error('[ERROR]', new Date().toISOString(), ...args),
  warn: (...args) => currentLevel >= LOG_LEVELS.warn && console.warn('[WARN]', new Date().toISOString(), ...args),
  info: (...args) => currentLevel >= LOG_LEVELS.info && console.log('[INFO]', new Date().toISOString(), ...args),
  debug: (...args) => currentLevel >= LOG_LEVELS.debug && console.log('[DEBUG]', new Date().toISOString(), ...args),
};

export default logger;
