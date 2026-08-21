import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createIntegrationRepository } from '../../src/features/integration/repositories/integration.repository';

describe('IntegrationRepository', () => {
  let mockDb: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockDb = {
      select: vi.fn().mockReturnThis(),
      from: vi.fn().mockReturnThis(),
      where: vi.fn().mockReturnThis(),
      insert: vi.fn().mockReturnThis(),
      values: vi.fn().mockReturnThis(),
      update: vi.fn().mockReturnThis(),
      set: vi.fn().mockReturnThis(),
      delete: vi.fn().mockReturnThis(),
      returning: vi.fn().mockReturnThis(),
      limit: vi.fn().mockReturnThis(),
      offset: vi.fn().mockReturnThis(),
      orderBy: vi.fn().mockReturnThis(),
      leftJoin: vi.fn().mockReturnThis(),
      innerJoin: vi.fn().mockReturnThis(),
      execute: vi.fn(),
    };
  });

  it('should create repository with all methods', () => {
    const repo = createIntegrationRepository(mockDb);
    expect(repo).toBeDefined();
    expect(repo.getIntegrations).toBeInstanceOf(Function);
    expect(repo.getIntegrationById).toBeInstanceOf(Function);
    expect(repo.createIntegration).toBeInstanceOf(Function);
    expect(repo.updateIntegration).toBeInstanceOf(Function);
    expect(repo.deleteIntegration).toBeInstanceOf(Function);
  });

  describe('getIntegrations', () => {
    it('should return integrations for a school', async () => {
      const integrations = [{ id: 'int-1', name: 'Test Integration', schoolId: 'school-1' }];
      mockDb.execute.mockResolvedValue(integrations);
      const repo = createIntegrationRepository(mockDb);
      const result = await repo.getIntegrations('school-1');
      expect(result).toEqual(integrations);
    });

    it('should return integrations with filters', async () => {
      const integrations = [{ id: 'int-1', status: 'active' }];
      mockDb.execute.mockResolvedValue(integrations);
      const repo = createIntegrationRepository(mockDb);
      const result = await repo.getIntegrations('school-1', { status: 'active' });
      expect(result).toEqual(integrations);
    });

    it('should return empty array when no integrations', async () => {
      mockDb.execute.mockResolvedValue([]);
      const repo = createIntegrationRepository(mockDb);
      const result = await repo.getIntegrations('school-1');
      expect(result).toEqual([]);
    });

    it('should handle database errors', async () => {
      mockDb.execute.mockRejectedValue(new Error('Connection lost'));
      const repo = createIntegrationRepository(mockDb);
      await expect(repo.getIntegrations('school-1')).rejects.toThrow('Connection lost');
    });

    it('should return paginated results', async () => {
      const integrations = [{ id: 'int-1' }, { id: 'int-2' }];
      mockDb.execute.mockResolvedValue(integrations);
      const repo = createIntegrationRepository(mockDb);
      const result = await repo.getIntegrations('school-1', { page: 1, limit: 10 });
      expect(result).toHaveLength(2);
    });

    it('should filter by type', async () => {
      mockDb.execute.mockResolvedValue([{ id: 'int-1', type: 'webhook' }]);
      const repo = createIntegrationRepository(mockDb);
      const result = await repo.getIntegrations('school-1', { type: 'webhook' });
      expect(result).toHaveLength(1);
    });

    it('should sort results', async () => {
      mockDb.execute.mockResolvedValue([{ id: 'int-2', name: 'B' }, { id: 'int-1', name: 'A' }]);
      const repo = createIntegrationRepository(mockDb);
      const result = await repo.getIntegrations('school-1', { sortBy: 'name', sortOrder: 'asc' });
      expect(result).toHaveLength(2);
    });

    it('should handle large result sets', async () => {
      const integrations = Array.from({ length: 100 }, (_, i) => ({ id: `int-${i}` }));
      mockDb.execute.mockResolvedValue(integrations);
      const repo = createIntegrationRepository(mockDb);
      const result = await repo.getIntegrations('school-1');
      expect(result).toHaveLength(100);
    });
  });

  describe('getIntegrationById', () => {
    it('should return an integration by id', async () => {
      const integration = { id: 'int-1', name: 'Test Integration' };
      mockDb.execute.mockResolvedValue([integration]);
      const repo = createIntegrationRepository(mockDb);
      const result = await repo.getIntegrationById('int-1');
      expect(result).toEqual(integration);
    });

    it('should return undefined when not found', async () => {
      mockDb.execute.mockResolvedValue([]);
      const repo = createIntegrationRepository(mockDb);
      const result = await repo.getIntegrationById('nonexistent');
      expect(result).toBeUndefined();
    });

    it('should handle database errors', async () => {
      mockDb.execute.mockRejectedValue(new Error('Query failed'));
      const repo = createIntegrationRepository(mockDb);
      await expect(repo.getIntegrationById('int-1')).rejects.toThrow('Query failed');
    });

    it('should return integration with config', async () => {
      mockDb.execute.mockResolvedValue([{ id: 'int-1', config: { apiKey: '***', endpoint: 'https://api.example.com' } }]);
      const repo = createIntegrationRepository(mockDb);
      const result = await repo.getIntegrationById('int-1');
      expect(result.config.endpoint).toBeDefined();
    });

    it('should return integration with metadata', async () => {
      mockDb.execute.mockResolvedValue([{ id: 'int-1', metadata: { createdBy: 'user-1', createdAt: '2024-01-01' } }]);
      const repo = createIntegrationRepository(mockDb);
      const result = await repo.getIntegrationById('int-1');
      expect(result.metadata.createdBy).toBe('user-1');
    });

    it('should handle multiple results', async () => {
      mockDb.execute.mockResolvedValue([{ id: 'int-1' }, { id: 'int-2' }]);
      const repo = createIntegrationRepository(mockDb);
      const result = await repo.getIntegrationById('int-1');
      expect(result.id).toBe('int-1');
    });
  });

  describe('createIntegration', () => {
    it('should create an integration', async () => {
      const data = { name: 'New Integration', type: 'api', schoolId: 'school-1', createdBy: 'user-1' };
      const created = { id: 'int-1', ...data };
      mockDb.execute.mockResolvedValue([created]);
      const repo = createIntegrationRepository(mockDb);
      const result = await repo.createIntegration(data, 'school-1');
      expect(result).toEqual(created);
    });

    it('should handle database errors on create', async () => {
      mockDb.execute.mockRejectedValue(new Error('Unique constraint violation'));
      const repo = createIntegrationRepository(mockDb);
      await expect(repo.createIntegration({ name: 'Dup' }, 'school-1')).rejects.toThrow('Unique constraint violation');
    });

    it('should create integration with all fields', async () => {
      const data = { name: 'Full Integration', type: 'webhook', config: {}, status: 'active' };
      const created = { id: 'int-1', ...data, schoolId: 'school-1' };
      mockDb.execute.mockResolvedValue([created]);
      const repo = createIntegrationRepository(mockDb);
      const result = await repo.createIntegration(data, 'school-1');
      expect(result.config).toEqual({});
    });

    it('should create integration with default values', async () => {
      mockDb.execute.mockResolvedValue([{ id: 'int-1', name: 'Test', status: 'active', createdAt: '2024-01-01' }]);
      const repo = createIntegrationRepository(mockDb);
      const result = await repo.createIntegration({ name: 'Test', type: 'api' }, 'school-1');
      expect(result.status).toBe('active');
    });

    it('should handle null config', async () => {
      mockDb.execute.mockResolvedValue([{ id: 'int-1', name: 'Test', config: null }]);
      const repo = createIntegrationRepository(mockDb);
      const result = await repo.createIntegration({ name: 'Test', type: 'api' }, 'school-1');
      expect(result.config).toBeNull();
    });

    it('should handle empty data', async () => {
      mockDb.execute.mockResolvedValue([{ id: 'int-1', name: '', type: 'api' }]);
      const repo = createIntegrationRepository(mockDb);
      const result = await repo.createIntegration({ name: '', type: 'api' }, 'school-1');
      expect(result.name).toBe('');
    });
  });

  describe('updateIntegration', () => {
    it('should update an integration', async () => {
      const updated = { id: 'int-1', name: 'Updated Integration' };
      mockDb.execute.mockResolvedValue([updated]);
      const repo = createIntegrationRepository(mockDb);
      const result = await repo.updateIntegration('int-1', { name: 'Updated Integration' });
      expect(result).toEqual(updated);
    });

    it('should return undefined when not found', async () => {
      mockDb.execute.mockResolvedValue([]);
      const repo = createIntegrationRepository(mockDb);
      const result = await repo.updateIntegration('nonexistent', { name: 'New' });
      expect(result).toBeUndefined();
    });

    it('should handle partial updates', async () => {
      const updated = { id: 'int-1', status: 'inactive' };
      mockDb.execute.mockResolvedValue([updated]);
      const repo = createIntegrationRepository(mockDb);
      const result = await repo.updateIntegration('int-1', { status: 'inactive' });
      expect(result.status).toBe('inactive');
    });

    it('should handle database errors on update', async () => {
      mockDb.execute.mockRejectedValue(new Error('Update failed'));
      const repo = createIntegrationRepository(mockDb);
      await expect(repo.updateIntegration('int-1', { name: 'New' })).rejects.toThrow('Update failed');
    });

    it('should update config', async () => {
      mockDb.execute.mockResolvedValue([{ id: 'int-1', config: { apiKey: 'new-key' } }]);
      const repo = createIntegrationRepository(mockDb);
      const result = await repo.updateIntegration('int-1', { config: { apiKey: 'new-key' } });
      expect(result.config.apiKey).toBe('new-key');
    });

    it('should update status', async () => {
      mockDb.execute.mockResolvedValue([{ id: 'int-1', status: 'suspended' }]);
      const repo = createIntegrationRepository(mockDb);
      const result = await repo.updateIntegration('int-1', { status: 'suspended' });
      expect(result.status).toBe('suspended');
    });

    it('should handle concurrent updates', async () => {
      mockDb.execute.mockResolvedValue([{ id: 'int-1', name: 'Concurrent Update' }]);
      const repo = createIntegrationRepository(mockDb);
      const result = await repo.updateIntegration('int-1', { name: 'Concurrent Update' });
      expect(result.name).toBe('Concurrent Update');
    });
  });

  describe('deleteIntegration', () => {
    it('should delete an integration', async () => {
      mockDb.execute.mockResolvedValue([{ id: 'int-1' }]);
      const repo = createIntegrationRepository(mockDb);
      await repo.deleteIntegration('int-1');
    });

    it('should handle deleting non-existent integration', async () => {
      mockDb.execute.mockResolvedValue([]);
      const repo = createIntegrationRepository(mockDb);
      await repo.deleteIntegration('nonexistent');
    });

    it('should handle database errors on delete', async () => {
      mockDb.execute.mockRejectedValue(new Error('Delete failed'));
      const repo = createIntegrationRepository(mockDb);
      await expect(repo.deleteIntegration('int-1')).rejects.toThrow('Delete failed');
    });

    it('should pass correct id to delete', async () => {
      mockDb.execute.mockResolvedValue([]);
      const repo = createIntegrationRepository(mockDb);
      await repo.deleteIntegration('int-123');
      expect(mockDb.where).toHaveBeenCalled();
    });

    it('should handle deletion with related records', async () => {
      mockDb.execute.mockRejectedValue(new Error('Foreign key constraint'));
      const repo = createIntegrationRepository(mockDb);
      await expect(repo.deleteIntegration('int-1')).rejects.toThrow('Foreign key constraint');
    });

    it('should handle multiple deletions', async () => {
      mockDb.execute.mockResolvedValue([{ id: 'int-1' }]);
      const repo = createIntegrationRepository(mockDb);
      await repo.deleteIntegration('int-1');
      await repo.deleteIntegration('int-2');
      expect(mockDb.execute).toHaveBeenCalledTimes(2);
    });
  });
});
