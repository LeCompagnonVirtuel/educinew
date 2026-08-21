import type { Role, AuthUser, AuthSession } from '@educi/types';

export type { AuthUser, AuthSession, LoginCredentials, RegisterData };

export interface AuthRepository {
  signIn(identifier: string, password: string): Promise<AuthSession>;
  signUp(data: { email: string; password: string; metadata?: Record<string, unknown> }): Promise<{ userId: string; requiresConfirmation: boolean }>;
  signOut(): Promise<void>;
  getSession(): Promise<AuthSession | null>;
  getUser(): Promise<AuthUser | null>;
  refreshSession(): Promise<AuthSession>;
  resetPassword(email: string): Promise<void>;
  updateUserPassword(newPassword: string): Promise<void>;
  verifyEmail(token: string): Promise<void>;
  resolveIdentifier(identifier: string): Promise<string>;
}

export interface SessionRepository {
  getCurrentSession(): Promise<AuthSession | null>;
  refreshSession(): Promise<AuthSession>;
  revokeSession(sessionId: string): Promise<void>;
  revokeAllSessions(userId: string): Promise<void>;
  getActiveSessions(userId: string): Promise<SessionInfo[]>;
}

export interface UserRepository {
  getUserById(id: string): Promise<AuthUser | null>;
  getUserByEmail(email: string): Promise<AuthUser | null>;
  enrichWithDbData(user: AuthUser): Promise<AuthUser>;
  updateProfile(id: string, data: Partial<AuthUser>): Promise<void>;
  deactivateUser(id: string): Promise<void>;
}

export interface AuditRepository {
  log(event: Omit<AuditEvent, 'id' | 'timestamp'>): Promise<void>;
  getEvents(filters: AuditEventFilters): Promise<AuditEvent[]>;
}

export interface InvitationRepository {
  create(data: InvitationData): Promise<{ token: string; expiresAt: string }>;
  validate(token: string): Promise<InvitationData | null>;
  accept(token: string, userId: string): Promise<void>;
  revoke(token: string): Promise<void>;
  getBySchool(schoolId: string): Promise<InvitationData[]>;
}

export interface SessionInfo {
  id: string;
  userId: string;
  deviceInfo: {
    deviceId: string;
    userAgent: string;
    browser?: string;
    os?: string;
    lastActiveAt: string;
  };
  createdAt: string;
  isActive: boolean;
}

export interface AuditEvent {
  id: string;
  schoolId?: string;
  userId?: string;
  action: string;
  entity: string;
  entityId?: string;
  details?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  timestamp: string;
}

export interface AuditEventFilters {
  schoolId?: string;
  userId?: string;
  action?: string;
  entity?: string;
  startDate?: string;
  endDate?: string;
  limit?: number;
  offset?: number;
}
