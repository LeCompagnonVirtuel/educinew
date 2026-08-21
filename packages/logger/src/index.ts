/**
 * @educi/logger — Logger centralisé.
 * Interdit : console.log, console.error, console.warn en production.
 * Utiliser : logger.info(), logger.warn(), logger.error(), logger.audit(), logger.security()
 */

export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'audit' | 'security';

export interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: string;
  data?: Record<string, unknown>;
  userId?: string;
  schoolId?: string;
  requestId?: string;
}

type LogTransport = (entry: LogEntry) => void;

const transports: LogTransport[] = [];

function createEntry(
  level: LogLevel,
  message: string,
  data?: Record<string, unknown>,
  context?: string
): LogEntry {
  return {
    level,
    message,
    timestamp: new Date().toISOString(),
    context,
    data,
  };
}

function emit(entry: LogEntry) {
  if (transports.length > 0) {
    transports.forEach((t) => t(entry));
  } else if (typeof process !== 'undefined' && process.env?.NODE_ENV !== 'production') {
    const prefix = `[${entry.level.toUpperCase()}]`;
    const ctx = entry.context ? ` (${entry.context})` : '';
    // eslint-disable-next-line no-console
    console.log(`${prefix}${ctx} ${entry.message}`, entry.data || '');
  }
}

export const logger = {
  debug(message: string, data?: Record<string, unknown>, context?: string) {
    emit(createEntry('debug', message, data, context));
  },

  info(message: string, data?: Record<string, unknown>, context?: string) {
    emit(createEntry('info', message, data, context));
  },

  warn(message: string, data?: Record<string, unknown>, context?: string) {
    emit(createEntry('warn', message, data, context));
  },

  error(message: string, data?: Record<string, unknown>, context?: string) {
    emit(createEntry('error', message, data, context));
  },

  audit(message: string, data?: Record<string, unknown>, context?: string) {
    emit(createEntry('audit', message, data, context));
  },

  security(message: string, data?: Record<string, unknown>, context?: string) {
    emit(createEntry('security', message, data, context));
  },
};

export function addTransport(transport: LogTransport) {
  transports.push(transport);
}

export function clearTransports() {
  transports.length = 0;
}
