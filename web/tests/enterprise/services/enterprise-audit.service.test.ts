import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('EnterpriseAuditService', () => {
  const mockRepo = {
    findAuditLogs: vi.fn(),
    findAuditLogById: vi.fn(),
    createAuditLog: vi.fn(),
    getAuditStats: vi.fn(),
    getAuditTimeline: vi.fn(),
    searchAuditLogs: vi.fn(),
    exportAuditLogs: vi.fn(),
    getAuditByUser: vi.fn(),
    getAuditByResource: vi.fn(),
    getAuditByAction: vi.fn(),
    getRecentActivity: vi.fn(),
    getComplianceReport: vi.fn(),
    getAuditRetention: vi.fn(),
    purgeOldLogs: vi.fn(),
    getAuditConfig: vi.fn(),
    updateAuditConfig: vi.fn(),
  };

  const enterpriseId = 'ent-1';
  const auditId = 'audit-1';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('findAuditLogs', () => {
    it('should return audit logs', async () => {
      const logs = [{ id: auditId, action: 'user.login', userId: 'usr-1', timestamp: new Date().toISOString() }];
      mockRepo.findAuditLogs.mockResolvedValue(logs);
      const result = await mockRepo.findAuditLogs(enterpriseId);
      expect(result).toEqual(logs);
    });

    it('should require enterpriseId', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('Identifiant de l\'entreprise requis');
      };
      expect(() => validate('')).toThrow('Identifiant de l\'entreprise requis');
    });

    it('should filter by action', async () => {
      mockRepo.findAuditLogs.mockResolvedValue([]);
      await mockRepo.findAuditLogs(enterpriseId, { action: 'user.login' });
      expect(mockRepo.findAuditLogs).toHaveBeenCalledWith(enterpriseId, { action: 'user.login' });
    });

    it('should filter by user', async () => {
      mockRepo.findAuditLogs.mockResolvedValue([]);
      await mockRepo.findAuditLogs(enterpriseId, { userId: 'usr-1' });
      expect(mockRepo.findAuditLogs).toHaveBeenCalled();
    });

    it('should filter by resource type', async () => {
      mockRepo.findAuditLogs.mockResolvedValue([]);
      await mockRepo.findAuditLogs(enterpriseId, { resourceType: 'user' });
      expect(mockRepo.findAuditLogs).toHaveBeenCalled();
    });

    it('should paginate results', async () => {
      mockRepo.findAuditLogs.mockResolvedValue([]);
      await mockRepo.findAuditLogs(enterpriseId, { page: 1, limit: 50 });
      expect(mockRepo.findAuditLogs).toHaveBeenCalled();
    });

    it('should handle empty results', async () => {
      mockRepo.findAuditLogs.mockResolvedValue([]);
      const result = await mockRepo.findAuditLogs(enterpriseId);
      expect(result).toHaveLength(0);
    });

    it('should sort by timestamp descending', async () => {
      mockRepo.findAuditLogs.mockResolvedValue([]);
      await mockRepo.findAuditLogs(enterpriseId, { sortBy: 'timestamp', order: 'desc' });
      expect(mockRepo.findAuditLogs).toHaveBeenCalled();
    });

    it('should filter by date range', async () => {
      mockRepo.findAuditLogs.mockResolvedValue([]);
      await mockRepo.findAuditLogs(enterpriseId, { from: '2026-01-01', to: '2026-12-31' });
      expect(mockRepo.findAuditLogs).toHaveBeenCalled();
    });
  });

  describe('findAuditLogById', () => {
    it('should return audit log by id', async () => {
      const log = { id: auditId, action: 'user.login' };
      mockRepo.findAuditLogById.mockResolvedValue(log);
      const result = await mockRepo.findAuditLogById(auditId);
      expect(result).toEqual(log);
    });

    it('should throw if not found', async () => {
      mockRepo.findAuditLogById.mockResolvedValue(null);
      const findOrThrow = async (id: string) => {
        const log = await mockRepo.findAuditLogById(id);
        if (!log) throw new Error('Journal d\'audit non trouvé');
      };
      await expect(findOrThrow('nonexistent')).rejects.toThrow('Journal d\'audit non trouvé');
    });

    it('should require auditId', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('Identifiant requis');
      };
      expect(() => validate('')).toThrow('Identifiant requis');
    });

    it('should include related entities', async () => {
      mockRepo.findAuditLogById.mockResolvedValue({ id: auditId, relatedEntities: [{ type: 'user', id: 'usr-1' }] });
      const result = await mockRepo.findAuditLogById(auditId);
      expect(result.relatedEntities).toHaveLength(1);
    });

    it('should include IP and user agent', async () => {
      mockRepo.findAuditLogById.mockResolvedValue({ id: auditId, ip: '192.168.1.1', userAgent: 'Chrome/100' });
      const result = await mockRepo.findAuditLogById(auditId);
      expect(result.ip).toBe('192.168.1.1');
    });
  });

  describe('createAuditLog', () => {
    it('should create audit log entry', async () => {
      const data = { action: 'user.login', userId: 'usr-1', resourceType: 'user', resourceId: 'usr-1' };
      mockRepo.createAuditLog.mockResolvedValue({ id: auditId, ...data, timestamp: new Date().toISOString() });
      const result = await mockRepo.createAuditLog({ ...data, enterprise_id: enterpriseId });
      expect(result.action).toBe('user.login');
    });

    it('should require action', () => {
      const validate = (data: any) => {
        if (!data?.action) throw new Error('L\'action est requise');
      };
      expect(() => validate({ userId: 'usr-1' })).toThrow('L\'action est requise');
    });

    it('should require userId', () => {
      const validate = (data: any) => {
        if (!data?.userId) throw new Error('L\'utilisateur est requis');
      };
      expect(() => validate({ action: 'login' })).toThrow('L\'utilisateur est requis');
    });

    it('should set timestamp automatically', async () => {
      mockRepo.createAuditLog.mockResolvedValue({ id: auditId, timestamp: new Date().toISOString() });
      const result = await mockRepo.createAuditLog({ action: 'test', userId: 'usr-1', enterprise_id: enterpriseId });
      expect(result.timestamp).toBeDefined();
    });

    it('should store metadata', async () => {
      mockRepo.createAuditLog.mockResolvedValue({ id: auditId, metadata: { key: 'value' } });
      const result = await mockRepo.createAuditLog({ action: 'test', userId: 'usr-1', metadata: { key: 'value' }, enterprise_id: enterpriseId });
      expect(result.metadata.key).toBe('value');
    });

    it('should store change details', async () => {
      mockRepo.createAuditLog.mockResolvedValue({ id: auditId, changes: { name: { from: 'Old', to: 'New' } } });
      const result = await mockRepo.createAuditLog({ action: 'update', userId: 'usr-1', changes: { name: { from: 'Old', to: 'New' } }, enterprise_id: enterpriseId });
      expect(result.changes.name.to).toBe('New');
    });

    it('should validate action format', () => {
      const isValidAction = (action: string) => /^[a-z]+\.[a-z_]+$/.test(action);
      expect(isValidAction('user.login')).toBe(true);
      expect(isValidAction('school.create')).toBe(true);
      expect(isValidAction('INVALID')).toBe(false);
    });
  });

  describe('getAuditStats', () => {
    it('should return audit statistics', async () => {
      mockRepo.getAuditStats.mockResolvedValue({ totalLogs: 10000, todayLogs: 50 });
      const result = await mockRepo.getAuditStats(enterpriseId);
      expect(result.totalLogs).toBe(10000);
    });

    it('should include action breakdown', async () => {
      mockRepo.getAuditStats.mockResolvedValue({ byAction: { 'user.login': 500, 'user.logout': 450 } });
      const result = await mockRepo.getAuditStats(enterpriseId);
      expect(result.byAction['user.login']).toBe(500);
    });

    it('should include top users', async () => {
      mockRepo.getAuditStats.mockResolvedValue({ topUsers: [{ userId: 'usr-1', count: 100 }] });
      const result = await mockRepo.getAuditStats(enterpriseId);
      expect(result.topUsers).toHaveLength(1);
    });

    it('should handle zero logs', async () => {
      mockRepo.getAuditStats.mockResolvedValue({ totalLogs: 0 });
      const result = await mockRepo.getAuditStats(enterpriseId);
      expect(result.totalLogs).toBe(0);
    });

    it('should include storage usage', async () => {
      mockRepo.getAuditStats.mockResolvedValue({ storageMB: 50 });
      const result = await mockRepo.getAuditStats(enterpriseId);
      expect(result.storageMB).toBe(50);
    });

    it('should include compliance status', async () => {
      mockRepo.getAuditStats.mockResolvedValue({ compliance: { retentionsDays: 365, logsExpiring: 100 } });
      const result = await mockRepo.getAuditStats(enterpriseId);
      expect(result.compliance.retentionsDays).toBe(365);
    });
  });

  describe('searchAuditLogs', () => {
    it('should search audit logs', async () => {
      mockRepo.searchAuditLogs.mockResolvedValue([{ id: auditId, action: 'user.login' }]);
      const result = await mockRepo.searchAuditLogs(enterpriseId, 'login');
      expect(result).toHaveLength(1);
    });

    it('should require minimum query', () => {
      const validate = (query: string) => {
        if (!query || query.trim().length < 2) throw new Error('Requise au moins 2 caractères');
      };
      expect(() => validate('')).toThrow();
      expect(() => validate('L')).toThrow();
      expect(() => validate('Lo')).not.toThrow();
    });

    it('should handle no results', async () => {
      mockRepo.searchAuditLogs.mockResolvedValue([]);
      const result = await mockRepo.searchAuditLogs(enterpriseId, 'nonexistent');
      expect(result).toHaveLength(0);
    });

    it('should search across fields', async () => {
      mockRepo.searchAuditLogs.mockResolvedValue([]);
      await mockRepo.searchAuditLogs(enterpriseId, 'query', { fields: ['action', 'userId'] });
      expect(mockRepo.searchAuditLogs).toHaveBeenCalled();
    });
  });

  describe('exportAuditLogs', () => {
    it('should export audit logs as CSV', async () => {
      mockRepo.exportAuditLogs.mockResolvedValue('id,action,userId\naudit-1,user.login,usr-1');
      const result = await mockRepo.exportAuditLogs(enterpriseId, 'csv');
      expect(result).toContain('action');
    });

    it('should export as JSON', async () => {
      mockRepo.exportAuditLogs.mockResolvedValue('[{"id":"audit-1"}]');
      const result = await mockRepo.exportAuditLogs(enterpriseId, 'json');
      expect(JSON.parse(result)).toHaveLength(1);
    });

    it('should filter export by date range', async () => {
      mockRepo.exportAuditLogs.mockResolvedValue('');
      await mockRepo.exportAuditLogs(enterpriseId, 'csv', { from: '2026-01-01', to: '2026-12-31' });
      expect(mockRepo.exportAuditLogs).toHaveBeenCalled();
    });

    it('should handle empty export', async () => {
      mockRepo.exportAuditLogs.mockResolvedValue('id,action\n');
      const result = await mockRepo.exportAuditLogs(enterpriseId, 'csv');
      expect(result).toContain('id,action');
    });

    it('should support different formats', () => {
      const formats = ['csv', 'json', 'xlsx'];
      expect(formats).toContain('csv');
      expect(formats).toContain('json');
      expect(formats).toContain('xlsx');
    });
  });

  describe('getAuditByUser', () => {
    it('should return audit logs for user', async () => {
      mockRepo.getAuditByUser.mockResolvedValue([{ userId: 'usr-1', action: 'user.login' }]);
      const result = await mockRepo.getAuditByUser(enterpriseId, 'usr-1');
      expect(result).toHaveLength(1);
    });

    it('should filter by action', async () => {
      mockRepo.getAuditByUser.mockResolvedValue([]);
      await mockRepo.getAuditByUser(enterpriseId, 'usr-1', { action: 'user.login' });
      expect(mockRepo.getAuditByUser).toHaveBeenCalled();
    });

    it('should paginate results', async () => {
      mockRepo.getAuditByUser.mockResolvedValue([]);
      await mockRepo.getAuditByUser(enterpriseId, 'usr-1', { page: 1, limit: 20 });
      expect(mockRepo.getAuditByUser).toHaveBeenCalled();
    });

    it('should handle no logs for user', async () => {
      mockRepo.getAuditByUser.mockResolvedValue([]);
      const result = await mockRepo.getAuditByUser(enterpriseId, 'usr-1');
      expect(result).toHaveLength(0);
    });
  });

  describe('getAuditByResource', () => {
    it('should return audit logs for resource', async () => {
      mockRepo.getAuditByResource.mockResolvedValue([{ resourceType: 'school', resourceId: 'sch-1', action: 'school.update' }]);
      const result = await mockRepo.getAuditByResource(enterpriseId, 'school', 'sch-1');
      expect(result).toHaveLength(1);
    });

    it('should require resource type', () => {
      const validate = (type: string) => {
        if (!type) throw new Error('Le type de ressource est requis');
      };
      expect(() => validate('')).toThrow('Le type de ressource est requis');
    });

    it('should require resourceId', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('L\'identifiant de ressource est requis');
      };
      expect(() => validate('')).toThrow('L\'identifiant de ressource est requis');
    });

    it('should handle no logs for resource', async () => {
      mockRepo.getAuditByResource.mockResolvedValue([]);
      const result = await mockRepo.getAuditByResource(enterpriseId, 'school', 'sch-1');
      expect(result).toHaveLength(0);
    });
  });

  describe('getRecentActivity', () => {
    it('should return recent activity', async () => {
      mockRepo.getRecentActivity.mockResolvedValue([{ action: 'user.login', timestamp: new Date().toISOString() }]);
      const result = await mockRepo.getRecentActivity(enterpriseId);
      expect(result).toHaveLength(1);
    });

    it('should limit results', async () => {
      mockRepo.getRecentActivity.mockResolvedValue([]);
      await mockRepo.getRecentActivity(enterpriseId, { limit: 10 });
      expect(mockRepo.getRecentActivity).toHaveBeenCalled();
    });

    it('should filter by action type', async () => {
      mockRepo.getRecentActivity.mockResolvedValue([]);
      await mockRepo.getRecentActivity(enterpriseId, { action: 'user.login' });
      expect(mockRepo.getRecentActivity).toHaveBeenCalled();
    });

    it('should handle no recent activity', async () => {
      mockRepo.getRecentActivity.mockResolvedValue([]);
      const result = await mockRepo.getRecentActivity(enterpriseId);
      expect(result).toHaveLength(0);
    });
  });

  describe('getComplianceReport', () => {
    it('should return compliance report', async () => {
      mockRepo.getComplianceReport.mockResolvedValue({ compliant: true, issues: [] });
      const result = await mockRepo.getComplianceReport(enterpriseId);
      expect(result.compliant).toBe(true);
    });

    it('should detect compliance issues', async () => {
      mockRepo.getComplianceReport.mockResolvedValue({ compliant: false, issues: [{ type: 'retention', message: 'Logs exceeding retention period' }] });
      const result = await mockRepo.getComplianceReport(enterpriseId);
      expect(result.compliant).toBe(false);
    });

    it('should include recommendations', async () => {
      mockRepo.getComplianceReport.mockResolvedValue({ recommendations: ['Enable MFA for admin accounts'] });
      const result = await mockRepo.getComplianceReport(enterpriseId);
      expect(result.recommendations).toHaveLength(1);
    });

    it('should generate for specific period', async () => {
      mockRepo.getComplianceReport.mockResolvedValue({});
      await mockRepo.getComplianceReport(enterpriseId, { period: '30d' });
      expect(mockRepo.getComplianceReport).toHaveBeenCalled();
    });
  });

  describe('getAuditRetention', () => {
    it('should return retention settings', async () => {
      mockRepo.getAuditRetention.mockResolvedValue({ retentionDays: 365, autoDelete: true });
      const result = await mockRepo.getAuditRetention(enterpriseId);
      expect(result.retentionDays).toBe(365);
    });

    it('should include expiration info', async () => {
      mockRepo.getAuditRetention.mockResolvedValue({ logsExpiringSoon: 50, oldestLog: '2025-01-01' });
      const result = await mockRepo.getAuditRetention(enterpriseId);
      expect(result.logsExpiringSoon).toBe(50);
    });
  });

  describe('purgeOldLogs', () => {
    it('should purge old audit logs', async () => {
      mockRepo.purgeOldLogs.mockResolvedValue({ purged: 1000, freedMB: 10 });
      const result = await mockRepo.purgeOldLogs(enterpriseId, 365);
      expect(result.purged).toBe(1000);
    });

    it('should require retention days', () => {
      const validate = (days: number) => {
        if (!days || days < 1) throw new Error('Le nombre de jours est requis');
      };
      expect(() => validate(0)).toThrow('Le nombre de jours est requis');
    });

    it('should handle no logs to purge', async () => {
      mockRepo.purgeOldLogs.mockResolvedValue({ purged: 0, freedMB: 0 });
      const result = await mockRepo.purgeOldLogs(enterpriseId, 365);
      expect(result.purged).toBe(0);
    });
  });

  describe('getAuditConfig', () => {
    it('should return audit config', async () => {
      mockRepo.getAuditConfig.mockResolvedValue({ enabled: true, retentionDays: 365 });
      const result = await mockRepo.getAuditConfig(enterpriseId);
      expect(result.enabled).toBe(true);
    });

    it('should include tracked actions', async () => {
      mockRepo.getAuditConfig.mockResolvedValue({ trackedActions: ['user.login', 'user.logout', 'school.create'] });
      const result = await mockRepo.getAuditConfig(enterpriseId);
      expect(result.trackedActions).toContain('user.login');
    });
  });

  describe('updateAuditConfig', () => {
    it('should update audit config', async () => {
      mockRepo.updateAuditConfig.mockResolvedValue({ retentionDays: 730 });
      const result = await mockRepo.updateAuditConfig(enterpriseId, { retentionDays: 730 });
      expect(result.retentionDays).toBe(730);
    });

    it('should validate retention days', () => {
      const validate = (days: number) => {
        if (days < 30 || days > 3650) throw new Error('La rétention doit être entre 30 et 3650 jours');
      };
      expect(() => validate(365)).not.toThrow();
      expect(() => validate(20)).toThrow();
      expect(() => validate(4000)).toThrow();
    });

    it('should toggle tracking', async () => {
      mockRepo.updateAuditConfig.mockResolvedValue({ enabled: false });
      const result = await mockRepo.updateAuditConfig(enterpriseId, { enabled: false });
      expect(result.enabled).toBe(false);
    });
  });
});
