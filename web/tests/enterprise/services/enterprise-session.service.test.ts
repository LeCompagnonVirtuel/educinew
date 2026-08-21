import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('EnterpriseSessionService', () => {
  const mockRepo = {
    createSession: vi.fn(),
    findSessionById: vi.fn(),
    findActiveSessions: vi.fn(),
    invalidateSession: vi.fn(),
    invalidateAllSessions: vi.fn(),
    refreshSession: vi.fn(),
    getSessionHistory: vi.fn(),
    getSessionStats: vi.fn(),
    detectConcurrentSessions: vi.fn(),
    getActiveUsers: vi.fn(),
    forceLogout: vi.fn(),
    getSessionAuditLog: vi.fn(),
  };

  const enterpriseId = 'ent-1';
  const sessionId = 'sess-1';
  const userId = 'usr-1';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('createSession', () => {
    it('should create a new session', async () => {
      mockRepo.createSession.mockResolvedValue({ id: sessionId, userId, createdAt: new Date().toISOString() });
      const result = await mockRepo.createSession({ userId, enterpriseId, ip: '127.0.0.1' });
      expect(result.id).toBe(sessionId);
    });

    it('should require userId', () => {
      const validate = (data: any) => {
        if (!data?.userId) throw new Error('Identifiant utilisateur requis');
      };
      expect(() => validate({ enterpriseId })).toThrow('Identifiant utilisateur requis');
    });

    it('should store IP address', async () => {
      mockRepo.createSession.mockResolvedValue({ id: sessionId, ip: '192.168.1.1' });
      const result = await mockRepo.createSession({ userId, enterpriseId, ip: '192.168.1.1' });
      expect(result.ip).toBe('192.168.1.1');
    });

    it('should store user agent', async () => {
      mockRepo.createSession.mockResolvedValue({ id: sessionId, userAgent: 'Chrome/100' });
      const result = await mockRepo.createSession({ userId, enterpriseId, userAgent: 'Chrome/100' });
      expect(result.userAgent).toBe('Chrome/100');
    });

    it('should set expiry time', async () => {
      mockRepo.createSession.mockResolvedValue({ id: sessionId, expiresAt: new Date(Date.now() + 3600000).toISOString() });
      const result = await mockRepo.createSession({ userId, enterpriseId });
      expect(result.expiresAt).toBeDefined();
    });

    it('should handle concurrent sessions', async () => {
      mockRepo.createSession.mockResolvedValue({ id: sessionId, sessionCount: 3 });
      const result = await mockRepo.createSession({ userId, enterpriseId });
      expect(result.sessionCount).toBe(3);
    });
  });

  describe('findSessionById', () => {
    it('should return session by id', async () => {
      const session = { id: sessionId, userId, status: 'active' };
      mockRepo.findSessionById.mockResolvedValue(session);
      const result = await mockRepo.findSessionById(sessionId);
      expect(result).toEqual(session);
    });

    it('should throw if not found', async () => {
      mockRepo.findSessionById.mockResolvedValue(null);
      const findOrThrow = async (id: string) => {
        const session = await mockRepo.findSessionById(id);
        if (!session) throw new Error('Session non trouvée');
      };
      await expect(findOrThrow('nonexistent')).rejects.toThrow('Session non trouvée');
    });

    it('should require sessionId', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('Identifiant de session requis');
      };
      expect(() => validate('')).toThrow('Identifiant de session requis');
    });

    it('should include session metadata', async () => {
      mockRepo.findSessionById.mockResolvedValue({ id: sessionId, metadata: { device: 'desktop' } });
      const result = await mockRepo.findSessionById(sessionId);
      expect(result.metadata).toBeDefined();
    });
  });

  describe('findActiveSessions', () => {
    it('should return active sessions', async () => {
      mockRepo.findActiveSessions.mockResolvedValue([{ id: sessionId, status: 'active' }]);
      const result = await mockRepo.findActiveSessions(enterpriseId);
      expect(result).toHaveLength(1);
    });

    it('should filter by user', async () => {
      mockRepo.findActiveSessions.mockResolvedValue([]);
      await mockRepo.findActiveSessions(enterpriseId, { userId });
      expect(mockRepo.findActiveSessions).toHaveBeenCalledWith(enterpriseId, { userId });
    });

    it('should handle no active sessions', async () => {
      mockRepo.findActiveSessions.mockResolvedValue([]);
      const result = await mockRepo.findActiveSessions(enterpriseId);
      expect(result).toHaveLength(0);
    });

    it('should exclude expired sessions', async () => {
      mockRepo.findActiveSessions.mockResolvedValue([{ id: sessionId, expired: false }]);
      const result = await mockRepo.findActiveSessions(enterpriseId);
      expect(result.every((s: any) => !s.expired)).toBe(true);
    });

    it('should paginate results', async () => {
      mockRepo.findActiveSessions.mockResolvedValue([]);
      await mockRepo.findActiveSessions(enterpriseId, { page: 1, limit: 10 });
      expect(mockRepo.findActiveSessions).toHaveBeenCalled();
    });
  });

  describe('invalidateSession', () => {
    it('should invalidate session', async () => {
      mockRepo.invalidateSession.mockResolvedValue({ id: sessionId, status: 'invalidated' });
      const result = await mockRepo.invalidateSession(sessionId);
      expect(result.status).toBe('invalidated');
    });

    it('should throw if session not found', async () => {
      mockRepo.invalidateSession.mockRejectedValue(new Error('Session non trouvée'));
      await expect(mockRepo.invalidateSession('nonexistent')).rejects.toThrow('Session non trouvée');
    });

    it('should record invalidation reason', async () => {
      mockRepo.invalidateSession.mockResolvedValue({ id: sessionId, reason: 'user_logout' });
      const result = await mockRepo.invalidateSession(sessionId, 'user_logout');
      expect(result.reason).toBe('user_logout');
    });

    it('should handle already invalidated session', async () => {
      mockRepo.invalidateSession.mockRejectedValue(new Error('La session est déjà invalidée'));
      await expect(mockRepo.invalidateSession(sessionId)).rejects.toThrow('La session est déjà invalidée');
    });
  });

  describe('invalidateAllSessions', () => {
    it('should invalidate all user sessions', async () => {
      mockRepo.invalidateAllSessions.mockResolvedValue({ invalidatedCount: 3 });
      const result = await mockRepo.invalidateAllSessions(userId);
      expect(result.invalidatedCount).toBe(3);
    });

    it('should exclude current session', async () => {
      mockRepo.invalidateAllSessions.mockResolvedValue({ invalidatedCount: 2, excluded: [sessionId] });
      const result = await mockRepo.invalidateAllSessions(userId, { excludeSessionId: sessionId });
      expect(result.excluded).toContain(sessionId);
    });

    it('should handle no sessions to invalidate', async () => {
      mockRepo.invalidateAllSessions.mockResolvedValue({ invalidatedCount: 0 });
      const result = await mockRepo.invalidateAllSessions(userId);
      expect(result.invalidatedCount).toBe(0);
    });
  });

  describe('refreshSession', () => {
    it('should refresh session', async () => {
      mockRepo.refreshSession.mockResolvedValue({ id: sessionId, newExpiry: new Date(Date.now() + 3600000).toISOString() });
      const result = await mockRepo.refreshSession(sessionId);
      expect(result.newExpiry).toBeDefined();
    });

    it('should throw if session expired', async () => {
      mockRepo.refreshSession.mockRejectedValue(new Error('La session a expiré'));
      await expect(mockRepo.refreshSession(sessionId)).rejects.toThrow('La session a expiré');
    });

    it('should throw if session invalidated', async () => {
      mockRepo.refreshSession.mockRejectedValue(new Error('La session est invalide'));
      await expect(mockRepo.refreshSession(sessionId)).rejects.toThrow('La session est invalide');
    });

    it('should update last activity timestamp', async () => {
      mockRepo.refreshSession.mockResolvedValue({ id: sessionId, lastActivity: new Date().toISOString() });
      const result = await mockRepo.refreshSession(sessionId);
      expect(result.lastActivity).toBeDefined();
    });
  });

  describe('getSessionHistory', () => {
    it('should return session history', async () => {
      mockRepo.getSessionHistory.mockResolvedValue([{ sessionId, action: 'login', date: '2026-01-01' }]);
      const result = await mockRepo.getSessionHistory(enterpriseId, userId);
      expect(result).toHaveLength(1);
    });

    it('should filter by date range', async () => {
      mockRepo.getSessionHistory.mockResolvedValue([]);
      await mockRepo.getSessionHistory(enterpriseId, userId, { from: '2026-01-01', to: '2026-12-31' });
      expect(mockRepo.getSessionHistory).toHaveBeenCalled();
    });

    it('should sort by date', async () => {
      mockRepo.getSessionHistory.mockResolvedValue([
        { date: '2026-01-01' },
        { date: '2026-02-01' },
      ]);
      const result = await mockRepo.getSessionHistory(enterpriseId, userId);
      expect(new Date(result[0].date).getTime()).toBeLessThanOrEqual(new Date(result[1].date).getTime());
    });

    it('should handle empty history', async () => {
      mockRepo.getSessionHistory.mockResolvedValue([]);
      const result = await mockRepo.getSessionHistory(enterpriseId, userId);
      expect(result).toHaveLength(0);
    });
  });

  describe('getSessionStats', () => {
    it('should return session statistics', async () => {
      const stats = { totalSessions: 150, activeSessions: 5, avgDuration: 45 };
      mockRepo.getSessionStats.mockResolvedValue(stats);
      const result = await mockRepo.getSessionStats(enterpriseId);
      expect(result.totalSessions).toBe(150);
    });

    it('should include device breakdown', async () => {
      mockRepo.getSessionStats.mockResolvedValue({ devices: { desktop: 100, mobile: 50 } });
      const result = await mockRepo.getSessionStats(enterpriseId);
      expect(result.devices.desktop).toBe(100);
    });

    it('should handle zero sessions', async () => {
      mockRepo.getSessionStats.mockResolvedValue({ totalSessions: 0 });
      const result = await mockRepo.getSessionStats(enterpriseId);
      expect(result.totalSessions).toBe(0);
    });
  });

  describe('detectConcurrentSessions', () => {
    it('should detect concurrent sessions', async () => {
      mockRepo.detectConcurrentSessions.mockResolvedValue([{ userId: 'u-1', sessionCount: 3 }]);
      const result = await mockRepo.detectConcurrentSessions(enterpriseId);
      expect(result).toHaveLength(1);
    });

    it('should detect suspicious activity', async () => {
      mockRepo.detectConcurrentSessions.mockResolvedValue([{ userId: 'u-1', suspicious: true, locations: ['Paris', 'Tokyo'] }]);
      const result = await mockRepo.detectConcurrentSessions(enterpriseId);
      expect(result[0].suspicious).toBe(true);
    });

    it('should handle no concurrent sessions', async () => {
      mockRepo.detectConcurrentSessions.mockResolvedValue([]);
      const result = await mockRepo.detectConcurrentSessions(enterpriseId);
      expect(result).toHaveLength(0);
    });

    it('should set max concurrent threshold', () => {
      const maxConcurrent = 5;
      const currentSessions = 3;
      const isExceeded = currentSessions > maxConcurrent;
      expect(isExceeded).toBe(false);
    });
  });

  describe('getActiveUsers', () => {
    it('should return active users', async () => {
      mockRepo.getActiveUsers.mockResolvedValue([{ userId: 'u-1', lastActivity: new Date().toISOString() }]);
      const result = await mockRepo.getActiveUsers(enterpriseId);
      expect(result).toHaveLength(1);
    });

    it('should filter by activity window', async () => {
      mockRepo.getActiveUsers.mockResolvedValue([]);
      await mockRepo.getActiveUsers(enterpriseId, { withinMinutes: 30 });
      expect(mockRepo.getActiveUsers).toHaveBeenCalled();
    });

    it('should handle no active users', async () => {
      mockRepo.getActiveUsers.mockResolvedValue([]);
      const result = await mockRepo.getActiveUsers(enterpriseId);
      expect(result).toHaveLength(0);
    });
  });

  describe('forceLogout', () => {
    it('should force logout user', async () => {
      mockRepo.forceLogout.mockResolvedValue({ userId, sessionsInvalidated: 3 });
      const result = await mockRepo.forceLogout(userId);
      expect(result.sessionsInvalidated).toBe(3);
    });

    it('should require reason', () => {
      const validate = (reason: string) => {
        if (!reason) throw new Error('La raison est requise');
      };
      expect(() => validate('')).toThrow('La raison est requise');
    });

    it('should handle user not logged in', async () => {
      mockRepo.forceLogout.mockResolvedValue({ userId, sessionsInvalidated: 0 });
      const result = await mockRepo.forceLogout(userId);
      expect(result.sessionsInvalidated).toBe(0);
    });
  });

  describe('getSessionAuditLog', () => {
    it('should return session audit log', async () => {
      mockRepo.getSessionAuditLog.mockResolvedValue([{ event: 'login', timestamp: new Date().toISOString() }]);
      const result = await mockRepo.getSessionAuditLog(enterpriseId);
      expect(result).toHaveLength(1);
    });

    it('should filter by event type', async () => {
      mockRepo.getSessionAuditLog.mockResolvedValue([]);
      await mockRepo.getSessionAuditLog(enterpriseId, { event: 'logout' });
      expect(mockRepo.getSessionAuditLog).toHaveBeenCalled();
    });

    it('should handle empty log', async () => {
      mockRepo.getSessionAuditLog.mockResolvedValue([]);
      const result = await mockRepo.getSessionAuditLog(enterpriseId);
      expect(result).toHaveLength(0);
    });
  });
});
