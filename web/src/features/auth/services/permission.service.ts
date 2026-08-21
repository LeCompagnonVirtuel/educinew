import type { Role } from '@educi/types';
import { ROLE_ROUTES, AUTH_PERMISSIONS, ROLE_HIERARCHY } from '@educi/config';
import { AuthorizationError, ForbiddenError } from '@educi/errors';
import { logger } from '@educi/logger';

export class PermissionService {
  canAccessRoute(role: Role, pathname: string): boolean {
    const allowedRoutes = ROLE_ROUTES[role] || [];
    return allowedRoutes.some((p) => pathname === p || pathname.startsWith(p + '/'));
  }

  canPerformAction(role: Role, action: keyof typeof AUTH_PERMISSIONS): boolean {
    const allowedRoles = AUTH_PERMISSIONS[action];
    if (!allowedRoles) return false;
    return (allowedRoles as readonly string[]).includes(role);
  }

  hasMinimumHierarchy(userRole: Role, requiredRole: Role): boolean {
    const userLevel = ROLE_HIERARCHY[userRole] || 0;
    const requiredLevel = ROLE_HIERARCHY[requiredRole] || 0;
    return userLevel >= requiredLevel;
  }

  getRedirectPath(role: Role): string {
    const { ROLE_DASHBOARDS } = require('@educi/config');
    return ROLE_DASHBOARDS[role] || '/login';
  }

  validateRoleHierarchy(actorRole: Role, targetRole: Role): void {
    if (!this.hasMinimumHierarchy(actorRole, targetRole)) {
      logger.security('Role hierarchy violation attempt', {
        actorRole,
        targetRole,
      }, 'rbac');
      throw new ForbiddenError('Vous ne pouvez pas effectuer cette action sur un rôle supérieur');
    }
  }

  validateRouteAccess(role: Role, pathname: string): void {
    if (!this.canAccessRoute(role, pathname)) {
      logger.security('Route access denied', {
        role,
        pathname,
      }, 'rbac');
      throw new AuthorizationError(`Accès refusé à ${pathname}`);
    }
  }
}
