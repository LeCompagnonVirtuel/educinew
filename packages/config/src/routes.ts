/**
 * @educi/config — Routes publiques et protégées.
 * Centralisé pour cohérence entre middleware et navigation.
 */

export const PUBLIC_ROUTES = [
  '/', '/login', '/register', '/forgot-password', '/create-school',
  '/reset-password', '/verify', '/verification', '/first-login',
  '/features', '/pricing', '/demo', '/api-docs',
  '/about', '/team', '/careers', '/help', '/contact', '/status',
  '/auth', '/school', '/blog', '/privacy', '/terms', '/integrations',
  '/enterprise', '/press',
] as const;

export const WEBHOOK_EXEMPT_PREFIXES = [
  '/api/payments/webhook/',
] as const;
