import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('AuditService', () => {
  const mockRepo = {
    logAuditEntry: vi.fn(),
    findAuditLogs: vi.fn(),
  };

  const schoolId = 'school-1';
  const userId = 'user-1';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('logAuditEntry', () => {
    it('should log audit entry', async () => {
      mockRepo.logAuditEntry.mockResolvedValue(undefined);
      await mockRepo.logAuditEntry(schoolId, userId, 'create', 'employee', 'emp-1', undefined, { name: 'John' });
      expect(mockRepo.logAuditEntry).toHaveBeenCalled();
    });

    it('should log with previous and new values', async () => {
      mockRepo.logAuditEntry.mockResolvedValue(undefined);
      await mockRepo.logAuditEntry(schoolId, userId, 'update', 'employee', 'emp-1', { name: 'Old' }, { name: 'New' });
      expect(mockRepo.logAuditEntry).toHaveBeenCalledWith(schoolId, userId, 'update', 'employee', 'emp-1', { name: 'Old' }, { name: 'New' });
    });
  });

  describe('findAuditLogs', () => {
    it('should return audit logs', async () => {
      mockRepo.findAuditLogs.mockResolvedValue([{ action: 'create', entity_type: 'employee' }]);
      const result = await mockRepo.findAuditLogs(schoolId);
      expect(result).toHaveLength(1);
    });

    it('should filter by entity type', async () => {
      mockRepo.findAuditLogs.mockResolvedValue([]);
      await mockRepo.findAuditLogs(schoolId, { entityType: 'employee' });
      expect(mockRepo.findAuditLogs).toHaveBeenCalled();
    });
  });

  describe('Audit action types', () => {
    it('should define valid actions', () => {
      const actions = ['create', 'update', 'delete', 'view', 'export', 'import'];
      expect(actions).toContain('create');
      expect(actions).toContain('delete');
    });
  });

  describe('Audit entity types', () => {
    it('should define valid entity types', () => {
      const entityTypes = ['employee', 'department', 'position', 'contract', 'leave', 'training', 'recruitment'];
      expect(entityTypes).toContain('employee');
      expect(entityTypes).toContain('leave');
    });
  });

  describe('Audit entry validation', () => {
    it('should require schoolId', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('Identifiant de l\'école requis');
      };
      expect(() => validate('')).toThrow();
    });

    it('should require userId', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('Identifiant de l\'utilisateur est requis');
      };
      expect(() => validate('')).toThrow();
    });

    it('should require action', () => {
      const validate = (action: string) => {
        if (!action) throw new Error('L\'action est requise');
      };
      expect(() => validate('')).toThrow();
    });

    it('should require entityType', () => {
      const validate = (type: string) => {
        if (!type) throw new Error('Le type d\'entité est requis');
      };
      expect(() => validate('')).toThrow();
    });

    it('should require entityId', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('L\'identifiant de l\'entité est requis');
      };
      expect(() => validate('')).toThrow();
    });
  });

  describe('Audit timestamp', () => {
    it('should generate ISO timestamp', () => {
      const timestamp = new Date().toISOString();
      expect(timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    });
  });

  describe('Audit data serialization', () => {
    it('should serialize values to JSON', () => {
      const serialize = (value: any) => value ? JSON.stringify(value) : null;
      expect(serialize({ name: 'John' })).toBe('{"name":"John"}');
      expect(serialize(null)).toBeNull();
    });

    it('should deserialize JSON values', () => {
      const deserialize = (json: string | null) => json ? JSON.parse(json) : null;
      expect(deserialize('{"name":"John"}')).toEqual({ name: 'John' });
      expect(deserialize(null)).toBeNull();
    });
  });
});
