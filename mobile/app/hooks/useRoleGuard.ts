import { useAuth } from '../context/AuthContext';

const ALLOWED_ROLES: Record<string, string[]> = {
  STUDENT: ['STUDENT'],
  PARENT: ['PARENT'],
  TEACHER: ['TEACHER'],
  COMPTABLE: ['COMPTABLE'],
  SECRETAIRE: ['SECRETAIRE'],
  CENSEUR: ['CENSEUR'],
  SURVEILLANT: ['SURVEILLANT'],
  CHAUFFEUR: ['CHAUFFEUR', 'DRIVER'],
  DRIVER: ['CHAUFFEUR', 'DRIVER'],
};

export function useRoleGuard(allowedRoles: string[]) {
  const { user } = useAuth();

  if (!user) return { allowed: false, reason: 'not_authenticated' as const };

  const userRole = user.role?.toUpperCase() || '';
  const isAllowed = allowedRoles.some(
    (role) => role.toUpperCase() === userRole || ALLOWED_ROLES[role]?.includes(userRole)
  );

  return {
    allowed: isAllowed,
    reason: isAllowed ? null : ('unauthorized_role' as const),
    userRole,
  };
}

export function isRoleAllowed(userRole: string, allowedRoles: string[]): boolean {
  const role = userRole?.toUpperCase() || '';
  return allowedRoles.some(
    (r) => r.toUpperCase() === role || ALLOWED_ROLES[r]?.includes(role)
  );
}
