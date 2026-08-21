import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createApiVersionService } from '../../src/features/integration/services/api-version.service';

describe('ApiVersionService', () => {
  let mockRepository: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockRepository = {
      getVersions: vi.fn(),
      getVersionById: vi.fn(),
      createVersion: vi.fn(),
      updateVersion: vi.fn(),
      deleteVersion: vi.fn(),
      deprecateVersion: vi.fn(),
      getVersionChangelog: vi.fn(),
      getVersionUsage: vi.fn(),
    };
  });

  it('should create service with all methods', () => {
    const service = createApiVersionService(mockRepository);
    expect(service).toBeDefined();
    expect(service.getVersions).toBeInstanceOf(Function);
    expect(service.getVersionById).toBeInstanceOf(Function);
    expect(service.createVersion).toBeInstanceOf(Function);
    expect(service.updateVersion).toBeInstanceOf(Function);
    expect(service.deleteVersion).toBeInstanceOf(Function);
    expect(service.deprecateVersion).toBeInstanceOf(Function);
    expect(service.getVersionChangelog).toBeInstanceOf(Function);
    expect(service.getVersionUsage).toBeInstanceOf(Function);
  });

  describe('getVersions', () => {
    it('should return versions list', async () => {
      mockRepository.getVersions.mockResolvedValue([{ id: 'av-1', version: 'v1', status: 'active' }]);
      const service = createApiVersionService(mockRepository);
      const result = await service.getVersions('school-1');
      expect(result).toHaveLength(1);
    });

    it('should return versions with filters', async () => {
      mockRepository.getVersions.mockResolvedValue([{ id: 'av-1' }]);
      const service = createApiVersionService(mockRepository);
      await service.getVersions('school-1', { status: 'active' });
      expect(mockRepository.getVersions).toHaveBeenCalledWith('school-1', { status: 'active' });
    });

    it('should throw if schoolId is missing', async () => {
      const service = createApiVersionService(mockRepository);
      await expect(service.getVersions('')).rejects.toThrow('schoolId is required');
    });

    it('should return empty list', async () => {
      mockRepository.getVersions.mockResolvedValue([]);
      const service = createApiVersionService(mockRepository);
      const result = await service.getVersions('school-1');
      expect(result).toEqual([]);
    });

    it('should return paginated versions', async () => {
      mockRepository.getVersions.mockResolvedValue({ data: [{ id: 'av-1' }], total: 10 });
      const service = createApiVersionService(mockRepository);
      const result = await service.getVersions('school-1', { page: 1, limit: 5 });
      expect(result.data).toHaveLength(1);
    });

    it('should filter by status', async () => {
      mockRepository.getVersions.mockResolvedValue([{ id: 'av-1', status: 'deprecated' }]);
      const service = createApiVersionService(mockRepository);
      const result = await service.getVersions('school-1', { status: 'deprecated' });
      expect(result).toHaveLength(1);
    });

    it('should return versions with release date', async () => {
      mockRepository.getVersions.mockResolvedValue([{ id: 'av-1', version: 'v1', releasedAt: '2024-01-01' }]);
      const service = createApiVersionService(mockRepository);
      const result = await service.getVersions('school-1');
      expect(result[0].releasedAt).toBeDefined();
    });

    it('should handle repository errors', async () => {
      mockRepository.getVersions.mockRejectedValue(new Error('DB error'));
      const service = createApiVersionService(mockRepository);
      await expect(service.getVersions('school-1')).rejects.toThrow('DB error');
    });
  });

  describe('getVersionById', () => {
    it('should return a single version', async () => {
      mockRepository.getVersionById.mockResolvedValue({ id: 'av-1', version: 'v1', status: 'active' });
      const service = createApiVersionService(mockRepository);
      const result = await service.getVersionById('av-1');
      expect(result.id).toBe('av-1');
    });

    it('should throw if version not found', async () => {
      mockRepository.getVersionById.mockResolvedValue(null);
      const service = createApiVersionService(mockRepository);
      await expect(service.getVersionById('nonexistent')).rejects.toThrow('API version not found');
    });

    it('should throw if id is missing', async () => {
      const service = createApiVersionService(mockRepository);
      await expect(service.getVersionById('')).rejects.toThrow('Version ID is required');
    });

    it('should return version with endpoints', async () => {
      mockRepository.getVersionById.mockResolvedValue({ id: 'av-1', endpoints: [{ path: '/api/v1/documents', methods: ['GET', 'POST'] }] });
      const service = createApiVersionService(mockRepository);
      const result = await service.getVersionById('av-1');
      expect(result.endpoints).toHaveLength(1);
    });

    it('should return version with changelog', async () => {
      mockRepository.getVersionById.mockResolvedValue({ id: 'av-1', changelog: [{ version: 'v1', changes: ['Initial release'] }] });
      const service = createApiVersionService(mockRepository);
      const result = await service.getVersionById('av-1');
      expect(result.changelog).toHaveLength(1);
    });

    it('should handle repository errors', async () => {
      mockRepository.getVersionById.mockRejectedValue(new Error('Query timeout'));
      const service = createApiVersionService(mockRepository);
      await expect(service.getVersionById('av-1')).rejects.toThrow('Query timeout');
    });
  });

  describe('createVersion', () => {
    it('should create a version', async () => {
      mockRepository.createVersion.mockResolvedValue({ id: 'av-1', version: 'v2', status: 'draft' });
      const service = createApiVersionService(mockRepository);
      const result = await service.createVersion('school-1', 'user-1', { version: 'v2', description: 'Version 2 API' });
      expect(result.id).toBe('av-1');
    });

    it('should throw if schoolId is missing', async () => {
      const service = createApiVersionService(mockRepository);
      await expect(service.createVersion('', 'user-1', { version: 'T' })).rejects.toThrow('schoolId is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createApiVersionService(mockRepository);
      await expect(service.createVersion('school-1', '', { version: 'T' })).rejects.toThrow('userId is required');
    });

    it('should throw if version is missing', async () => {
      const service = createApiVersionService(mockRepository);
      await expect(service.createVersion('school-1', 'user-1', { version: '' })).rejects.toThrow('Version number is required');
    });

    it('should create version with description', async () => {
      mockRepository.createVersion.mockResolvedValue({ id: 'av-1', description: 'Version 2 with new features' });
      const service = createApiVersionService(mockRepository);
      const result = await service.createVersion('school-1', 'user-1', { version: 'v2', description: 'Version 2 with new features' });
      expect(result.description).toBe('Version 2 with new features');
    });

    it('should create version with endpoints', async () => {
      mockRepository.createVersion.mockResolvedValue({ id: 'av-1', endpoints: [{ path: '/api/v2/documents', methods: ['GET'] }] });
      const service = createApiVersionService(mockRepository);
      const result = await service.createVersion('school-1', 'user-1', { version: 'v2', endpoints: [{ path: '/api/v2/documents', methods: ['GET'] }] });
      expect(result.endpoints).toHaveLength(1);
    });

    it('should handle creation failure', async () => {
      mockRepository.createVersion.mockRejectedValue(new Error('Version already exists'));
      const service = createApiVersionService(mockRepository);
      await expect(service.createVersion('school-1', 'user-1', { version: 'v1' })).rejects.toThrow('Version already exists');
    });
  });

  describe('updateVersion', () => {
    it('should update a version', async () => {
      mockRepository.getVersionById.mockResolvedValue({ id: 'av-1', version: 'v1' });
      mockRepository.updateVersion.mockResolvedValue({ id: 'av-1', version: 'v1', description: 'Updated' });
      const service = createApiVersionService(mockRepository);
      const result = await service.updateVersion('av-1', 'user-1', { description: 'Updated' });
      expect(result.description).toBe('Updated');
    });

    it('should throw if version not found', async () => {
      mockRepository.getVersionById.mockResolvedValue(null);
      const service = createApiVersionService(mockRepository);
      await expect(service.updateVersion('nonexistent', 'user-1', { description: 'New' })).rejects.toThrow();
    });

    it('should throw if id is missing', async () => {
      const service = createApiVersionService(mockRepository);
      await expect(service.updateVersion('', 'user-1', { description: 'New' })).rejects.toThrow('Version ID is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createApiVersionService(mockRepository);
      await expect(service.updateVersion('av-1', '', { description: 'New' })).rejects.toThrow('userId is required');
    });

    it('should update version endpoints', async () => {
      mockRepository.getVersionById.mockResolvedValue({ id: 'av-1' });
      mockRepository.updateVersion.mockResolvedValue({ id: 'av-1', endpoints: [{ path: '/api/v1/new', methods: ['GET'] }] });
      const service = createApiVersionService(mockRepository);
      const result = await service.updateVersion('av-1', 'user-1', { endpoints: [{ path: '/api/v1/new', methods: ['GET'] }] });
      expect(result.endpoints).toHaveLength(1);
    });

    it('should handle update failure', async () => {
      mockRepository.getVersionById.mockResolvedValue({ id: 'av-1' });
      mockRepository.updateVersion.mockRejectedValue(new Error('Cannot update'));
      const service = createApiVersionService(mockRepository);
      await expect(service.updateVersion('av-1', 'user-1', { description: 'New' })).rejects.toThrow('Cannot update');
    });
  });

  describe('deleteVersion', () => {
    it('should delete a version', async () => {
      mockRepository.getVersionById.mockResolvedValue({ id: 'av-1' });
      mockRepository.deleteVersion.mockResolvedValue({ success: true });
      const service = createApiVersionService(mockRepository);
      await service.deleteVersion('av-1', 'user-1');
      expect(mockRepository.deleteVersion).toHaveBeenCalledWith('av-1');
    });

    it('should throw if version not found', async () => {
      mockRepository.getVersionById.mockResolvedValue(null);
      const service = createApiVersionService(mockRepository);
      await expect(service.deleteVersion('nonexistent', 'user-1')).rejects.toThrow();
    });

    it('should throw if id is missing', async () => {
      const service = createApiVersionService(mockRepository);
      await expect(service.deleteVersion('', 'user-1')).rejects.toThrow('Version ID is required');
    });

    it('should handle deletion with active consumers', async () => {
      mockRepository.getVersionById.mockResolvedValue({ id: 'av-1' });
      mockRepository.deleteVersion.mockRejectedValue(new Error('Version has active consumers'));
      const service = createApiVersionService(mockRepository);
      await expect(service.deleteVersion('av-1', 'user-1')).rejects.toThrow('Version has active consumers');
    });

    it('should force delete version', async () => {
      mockRepository.getVersionById.mockResolvedValue({ id: 'av-1' });
      mockRepository.deleteVersion.mockResolvedValue({ success: true, forceDeleted: true });
      const service = createApiVersionService(mockRepository);
      const result = await service.deleteVersion('av-1', 'user-1', { force: true });
      expect(result.forceDeleted).toBe(true);
    });
  });

  describe('deprecateVersion', () => {
    it('should deprecate a version', async () => {
      mockRepository.deprecateVersion.mockResolvedValue({ versionId: 'av-1', status: 'deprecated', deprecatedAt: '2024-01-01', sunsetAt: '2024-06-01' });
      const service = createApiVersionService(mockRepository);
      const result = await service.deprecateVersion('av-1', 'user-1', { sunsetDate: '2024-06-01' });
      expect(result.status).toBe('deprecated');
    });

    it('should throw if versionId is missing', async () => {
      const service = createApiVersionService(mockRepository);
      await expect(service.deprecateVersion('', 'user-1', {})).rejects.toThrow('Version ID is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createApiVersionService(mockRepository);
      await expect(service.deprecateVersion('av-1', '', {})).rejects.toThrow('userId is required');
    });

    it('should handle deprecation failure', async () => {
      mockRepository.deprecateVersion.mockRejectedValue(new Error('Cannot deprecate'));
      const service = createApiVersionService(mockRepository);
      await expect(service.deprecateVersion('av-1', 'user-1', {})).rejects.toThrow('Cannot deprecate');
    });

    it('should return deprecation details', async () => {
      mockRepository.deprecateVersion.mockResolvedValue({ versionId: 'av-1', status: 'deprecated', deprecatedAt: '2024-01-01', sunsetAt: '2024-06-01', migrationGuide: 'Use v2 instead' });
      const service = createApiVersionService(mockRepository);
      const result = await service.deprecateVersion('av-1', 'user-1', { sunsetDate: '2024-06-01', migrationGuide: 'Use v2 instead' });
      expect(result.migrationGuide).toBe('Use v2 instead');
    });
  });

  describe('getVersionChangelog', () => {
    it('should return version changelog', async () => {
      mockRepository.getVersionChangelog.mockResolvedValue([{ version: 'v1', changes: ['Initial release'], date: '2024-01-01' }]);
      const service = createApiVersionService(mockRepository);
      const result = await service.getVersionChangelog('av-1');
      expect(result).toHaveLength(1);
    });

    it('should throw if versionId is missing', async () => {
      const service = createApiVersionService(mockRepository);
      await expect(service.getVersionChangelog('')).rejects.toThrow('Version ID is required');
    });

    it('should return empty changelog', async () => {
      mockRepository.getVersionChangelog.mockResolvedValue([]);
      const service = createApiVersionService(mockRepository);
      const result = await service.getVersionChangelog('av-1');
      expect(result).toEqual([]);
    });

    it('should handle repository errors', async () => {
      mockRepository.getVersionChangelog.mockRejectedValue(new Error('DB error'));
      const service = createApiVersionService(mockRepository);
      await expect(service.getVersionChangelog('av-1')).rejects.toThrow('DB error');
    });
  });

  describe('getVersionUsage', () => {
    it('should return version usage', async () => {
      mockRepository.getVersionUsage.mockResolvedValue({ versionId: 'av-1', totalRequests: 10000, activeConsumers: 50 });
      const service = createApiVersionService(mockRepository);
      const result = await service.getVersionUsage('av-1');
      expect(result.totalRequests).toBe(10000);
    });

    it('should throw if versionId is missing', async () => {
      const service = createApiVersionService(mockRepository);
      await expect(service.getVersionUsage('')).rejects.toThrow('Version ID is required');
    });

    it('should return zero usage', async () => {
      mockRepository.getVersionUsage.mockResolvedValue({ versionId: 'av-1', totalRequests: 0 });
      const service = createApiVersionService(mockRepository);
      const result = await service.getVersionUsage('av-1');
      expect(result.totalRequests).toBe(0);
    });

    it('should handle repository errors', async () => {
      mockRepository.getVersionUsage.mockRejectedValue(new Error('DB error'));
      const service = createApiVersionService(mockRepository);
      await expect(service.getVersionUsage('av-1')).rejects.toThrow('DB error');
    });
  });
});
