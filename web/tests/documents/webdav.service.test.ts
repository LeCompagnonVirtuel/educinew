import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createWebdavService } from '../../src/features/documents/services/webdav.service';

describe('WebDAVService', () => {
  let mockRepository: {
    getWebDAVConfigs: ReturnType<typeof vi.fn>;
    createWebDAVConfig: ReturnType<typeof vi.fn>;
    updateWebDAVConfig: ReturnType<typeof vi.fn>;
    deleteWebDAVConfig: ReturnType<typeof vi.fn>;
    testWebDAVConnection: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockRepository = {
      getWebDAVConfigs: vi.fn(),
      createWebDAVConfig: vi.fn(),
      updateWebDAVConfig: vi.fn(),
      deleteWebDAVConfig: vi.fn(),
      testWebDAVConnection: vi.fn(),
    };
  });

  it('should create service with all methods', () => {
    const service = createWebdavService(mockRepository as any);
    expect(service).toBeDefined();
    expect(service.getWebDAVConfigs).toBeInstanceOf(Function);
    expect(service.createWebDAVConfig).toBeInstanceOf(Function);
    expect(service.updateWebDAVConfig).toBeInstanceOf(Function);
    expect(service.deleteWebDAVConfig).toBeInstanceOf(Function);
    expect(service.testWebDAVConnection).toBeInstanceOf(Function);
  });

  describe('getWebDAVConfigs', () => {
    it('should return WebDAV configs', async () => {
      const configs = [{ id: 'w-1', url: 'https://dav.example.com' }];
      mockRepository.getWebDAVConfigs.mockResolvedValue(configs);
      const service = createWebdavService(mockRepository as any);
      const result = await service.getWebDAVConfigs('school-1', 'user-1');
      expect(result).toEqual(configs);
      expect(mockRepository.getWebDAVConfigs).toHaveBeenCalledWith('school-1');
    });

    it('should return empty list when no configs', async () => {
      mockRepository.getWebDAVConfigs.mockResolvedValue([]);
      const service = createWebdavService(mockRepository as any);
      const result = await service.getWebDAVConfigs('school-1', 'user-1');
      expect(result).toEqual([]);
    });

    it('should return multiple configs', async () => {
      const configs = [{ id: 'w-1' }, { id: 'w-2' }];
      mockRepository.getWebDAVConfigs.mockResolvedValue(configs);
      const service = createWebdavService(mockRepository as any);
      const result = await service.getWebDAVConfigs('school-1', 'user-1');
      expect(result).toHaveLength(2);
    });

    it('should throw if schoolId missing', async () => {
      const service = createWebdavService(mockRepository as any);
      await expect(service.getWebDAVConfigs('', 'user-1')).rejects.toThrow('schoolId is required');
    });

    it('should throw if userId missing', async () => {
      const service = createWebdavService(mockRepository as any);
      await expect(service.getWebDAVConfigs('school-1', '')).rejects.toThrow('userId is required');
    });

    it('should throw if both missing', async () => {
      const service = createWebdavService(mockRepository as any);
      await expect(service.getWebDAVConfigs('', '')).rejects.toThrow('schoolId is required');
    });

    it('should handle repository errors', async () => {
      mockRepository.getWebDAVConfigs.mockRejectedValue(new Error('DB error'));
      const service = createWebdavService(mockRepository as any);
      await expect(service.getWebDAVConfigs('school-1', 'user-1')).rejects.toThrow('DB error');
    });

    it('should not swallow repository errors', async () => {
      mockRepository.getWebDAVConfigs.mockRejectedValue(new Error('Connection timeout'));
      const service = createWebdavService(mockRepository as any);
      await expect(service.getWebDAVConfigs('school-1', 'user-1')).rejects.toThrow('Connection timeout');
    });
  });

  describe('createWebDAVConfig', () => {
    it('should create a WebDAV config', async () => {
      const data = { url: 'https://dav.example.com', username: 'admin' };
      const created = { id: 'w-1', ...data, createdBy: 'user-1' };
      mockRepository.createWebDAVConfig.mockResolvedValue(created);
      const service = createWebdavService(mockRepository as any);
      const result = await service.createWebDAVConfig('school-1', 'user-1', data);
      expect(result).toEqual(created);
      expect(mockRepository.createWebDAVConfig).toHaveBeenCalledWith({ ...data, createdBy: 'user-1' }, 'school-1');
    });

    it('should pass extra fields to repository', async () => {
      const data = { url: 'https://dav.example.com', username: 'admin', password: 'secret' };
      mockRepository.createWebDAVConfig.mockResolvedValue({ id: 'w-1', ...data, createdBy: 'user-1' });
      const service = createWebdavService(mockRepository as any);
      await service.createWebDAVConfig('school-1', 'user-1', data);
      expect(mockRepository.createWebDAVConfig).toHaveBeenCalledWith(
        { url: 'https://dav.example.com', username: 'admin', password: 'secret', createdBy: 'user-1' },
        'school-1'
      );
    });

    it('should throw if schoolId missing', async () => {
      const service = createWebdavService(mockRepository as any);
      await expect(service.createWebDAVConfig('', 'user-1', { url: 'https://dav.example.com' })).rejects.toThrow('schoolId is required');
    });

    it('should throw if userId missing', async () => {
      const service = createWebdavService(mockRepository as any);
      await expect(service.createWebDAVConfig('school-1', '', { url: 'https://dav.example.com' })).rejects.toThrow('userId is required');
    });

    it('should throw if data missing', async () => {
      const service = createWebdavService(mockRepository as any);
      await expect(service.createWebDAVConfig('school-1', 'user-1', null as any)).rejects.toThrow('WebDAV url is required');
    });

    it('should throw if url missing from data', async () => {
      const service = createWebdavService(mockRepository as any);
      await expect(service.createWebDAVConfig('school-1', 'user-1', {})).rejects.toThrow('WebDAV url is required');
    });

    it('should throw if both schoolId and userId missing', async () => {
      const service = createWebdavService(mockRepository as any);
      await expect(service.createWebDAVConfig('', '', { url: 'https://dav.example.com' })).rejects.toThrow('schoolId is required');
    });

    it('should handle repository errors', async () => {
      mockRepository.createWebDAVConfig.mockRejectedValue(new Error('Create failed'));
      const service = createWebdavService(mockRepository as any);
      await expect(service.createWebDAVConfig('school-1', 'user-1', { url: 'https://dav.example.com' })).rejects.toThrow('Create failed');
    });
  });

  describe('updateWebDAVConfig', () => {
    it('should update a WebDAV config', async () => {
      mockRepository.getWebDAVConfigs.mockResolvedValue([{ id: 'w-1', url: 'https://old.example.com' }]);
      const updated = { id: 'w-1', url: 'https://new.example.com' };
      mockRepository.updateWebDAVConfig.mockResolvedValue(updated);
      const service = createWebdavService(mockRepository as any);
      const result = await service.updateWebDAVConfig('school-1', 'w-1', 'user-1', { url: 'https://new.example.com' });
      expect(result).toEqual(updated);
      expect(mockRepository.updateWebDAVConfig).toHaveBeenCalledWith('w-1', { url: 'https://new.example.com' });
    });

    it('should throw if schoolId missing', async () => {
      const service = createWebdavService(mockRepository as any);
      await expect(service.updateWebDAVConfig('', 'w-1', 'user-1', { url: 'test' })).rejects.toThrow('schoolId is required');
    });

    it('should throw if configId missing', async () => {
      const service = createWebdavService(mockRepository as any);
      await expect(service.updateWebDAVConfig('school-1', '', 'user-1', { url: 'test' })).rejects.toThrow('configId is required');
    });

    it('should throw if userId missing', async () => {
      const service = createWebdavService(mockRepository as any);
      await expect(service.updateWebDAVConfig('school-1', 'w-1', '', { url: 'test' })).rejects.toThrow('userId is required');
    });

    it('should throw if data missing', async () => {
      const service = createWebdavService(mockRepository as any);
      await expect(service.updateWebDAVConfig('school-1', 'w-1', 'user-1', null as any)).rejects.toThrow('update data is required');
    });

    it('should throw if config not found', async () => {
      mockRepository.getWebDAVConfigs.mockResolvedValue([]);
      const service = createWebdavService(mockRepository as any);
      await expect(service.updateWebDAVConfig('school-1', 'w-999', 'user-1', { url: 'test' })).rejects.toThrow();
    });

    it('should throw if schoolId and configId missing', async () => {
      const service = createWebdavService(mockRepository as any);
      await expect(service.updateWebDAVConfig('', '', 'user-1', { url: 'test' })).rejects.toThrow('schoolId is required');
    });

    it('should handle repository errors', async () => {
      mockRepository.getWebDAVConfigs.mockResolvedValue([{ id: 'w-1' }]);
      mockRepository.updateWebDAVConfig.mockRejectedValue(new Error('Update failed'));
      const service = createWebdavService(mockRepository as any);
      await expect(service.updateWebDAVConfig('school-1', 'w-1', 'user-1', { url: 'test' })).rejects.toThrow('Update failed');
    });
  });

  describe('deleteWebDAVConfig', () => {
    it('should delete a WebDAV config', async () => {
      mockRepository.getWebDAVConfigs.mockResolvedValue([{ id: 'w-1', url: 'https://dav.example.com' }]);
      mockRepository.deleteWebDAVConfig.mockResolvedValue(undefined);
      const service = createWebdavService(mockRepository as any);
      await service.deleteWebDAVConfig('school-1', 'w-1', 'user-1');
      expect(mockRepository.deleteWebDAVConfig).toHaveBeenCalledWith('w-1');
    });

    it('should throw if schoolId missing', async () => {
      const service = createWebdavService(mockRepository as any);
      await expect(service.deleteWebDAVConfig('', 'w-1', 'user-1')).rejects.toThrow('schoolId is required');
    });

    it('should throw if configId missing', async () => {
      const service = createWebdavService(mockRepository as any);
      await expect(service.deleteWebDAVConfig('school-1', '', 'user-1')).rejects.toThrow('configId is required');
    });

    it('should throw if userId missing', async () => {
      const service = createWebdavService(mockRepository as any);
      await expect(service.deleteWebDAVConfig('school-1', 'w-1', '')).rejects.toThrow('userId is required');
    });

    it('should throw if config not found', async () => {
      mockRepository.getWebDAVConfigs.mockResolvedValue([]);
      const service = createWebdavService(mockRepository as any);
      await expect(service.deleteWebDAVConfig('school-1', 'w-999', 'user-1')).rejects.toThrow();
    });

    it('should throw if schoolId and configId missing', async () => {
      const service = createWebdavService(mockRepository as any);
      await expect(service.deleteWebDAVConfig('', '', 'user-1')).rejects.toThrow('schoolId is required');
    });

    it('should handle repository errors', async () => {
      mockRepository.getWebDAVConfigs.mockResolvedValue([{ id: 'w-1' }]);
      mockRepository.deleteWebDAVConfig.mockRejectedValue(new Error('Delete failed'));
      const service = createWebdavService(mockRepository as any);
      await expect(service.deleteWebDAVConfig('school-1', 'w-1', 'user-1')).rejects.toThrow('Delete failed');
    });
  });

  describe('testWebDAVConnection', () => {
    it('should test WebDAV connection', async () => {
      mockRepository.getWebDAVConfigs.mockResolvedValue([{ id: 'w-1', url: 'https://dav.example.com' }]);
      const testResult = { success: true, latency: 120 };
      mockRepository.testWebDAVConnection.mockResolvedValue(testResult);
      const service = createWebdavService(mockRepository as any);
      const result = await service.testWebDAVConnection('school-1', 'w-1', 'user-1');
      expect(result).toEqual(testResult);
      expect(mockRepository.testWebDAVConnection).toHaveBeenCalledWith('w-1');
    });

    it('should return failed connection result', async () => {
      mockRepository.getWebDAVConfigs.mockResolvedValue([{ id: 'w-1' }]);
      mockRepository.testWebDAVConnection.mockResolvedValue({ success: false, error: 'Timeout' });
      const service = createWebdavService(mockRepository as any);
      const result = await service.testWebDAVConnection('school-1', 'w-1', 'user-1');
      expect(result).toEqual({ success: false, error: 'Timeout' });
    });

    it('should throw if schoolId missing', async () => {
      const service = createWebdavService(mockRepository as any);
      await expect(service.testWebDAVConnection('', 'w-1', 'user-1')).rejects.toThrow('schoolId is required');
    });

    it('should throw if configId missing', async () => {
      const service = createWebdavService(mockRepository as any);
      await expect(service.testWebDAVConnection('school-1', '', 'user-1')).rejects.toThrow('configId is required');
    });

    it('should throw if userId missing', async () => {
      const service = createWebdavService(mockRepository as any);
      await expect(service.testWebDAVConnection('school-1', 'w-1', '')).rejects.toThrow('userId is required');
    });

    it('should throw if config not found', async () => {
      mockRepository.getWebDAVConfigs.mockResolvedValue([]);
      const service = createWebdavService(mockRepository as any);
      await expect(service.testWebDAVConnection('school-1', 'w-999', 'user-1')).rejects.toThrow();
    });

    it('should throw if schoolId and configId missing', async () => {
      const service = createWebdavService(mockRepository as any);
      await expect(service.testWebDAVConnection('', '', 'user-1')).rejects.toThrow('schoolId is required');
    });

    it('should handle repository errors', async () => {
      mockRepository.getWebDAVConfigs.mockResolvedValue([{ id: 'w-1' }]);
      mockRepository.testWebDAVConnection.mockRejectedValue(new Error('Connection failed'));
      const service = createWebdavService(mockRepository as any);
      await expect(service.testWebDAVConnection('school-1', 'w-1', 'user-1')).rejects.toThrow('Connection failed');
    });
  });

  describe('method existence', () => {
    it('should have all 5 methods defined', () => {
      const service = createWebdavService(mockRepository as any);
      const methods = ['getWebDAVConfigs', 'createWebDAVConfig', 'updateWebDAVConfig', 'deleteWebDAVConfig', 'testWebDAVConnection'];
      methods.forEach((method) => {
        expect(service[method as keyof typeof service]).toBeDefined();
      });
    });

    it('should return object with correct shape', () => {
      const service = createWebdavService(mockRepository as any);
      expect(Object.keys(service)).toHaveLength(5);
    });

    it('should pass correct arguments to getWebDAVConfigs', async () => {
      mockRepository.getWebDAVConfigs.mockResolvedValue([]);
      const service = createWebdavService(mockRepository as any);
      await service.getWebDAVConfigs('school-1', 'user-1');
      expect(mockRepository.getWebDAVConfigs).toHaveBeenCalledWith('school-1');
    });

    it('should pass correct arguments to createWebDAVConfig', async () => {
      mockRepository.createWebDAVConfig.mockResolvedValue({ id: 'w-1' });
      const service = createWebdavService(mockRepository as any);
      await service.createWebDAVConfig('school-1', 'user-1', { url: 'https://dav.example.com' });
      expect(mockRepository.createWebDAVConfig).toHaveBeenCalledWith({ url: 'https://dav.example.com', createdBy: 'user-1' }, 'school-1');
    });

    it('should pass correct arguments to deleteWebDAVConfig', async () => {
      mockRepository.getWebDAVConfigs.mockResolvedValue([{ id: 'w-1' }]);
      mockRepository.deleteWebDAVConfig.mockResolvedValue(undefined);
      const service = createWebdavService(mockRepository as any);
      await service.deleteWebDAVConfig('school-1', 'w-1', 'user-1');
      expect(mockRepository.deleteWebDAVConfig).toHaveBeenCalledWith('w-1');
    });

    it('should pass correct arguments to testWebDAVConnection', async () => {
      mockRepository.getWebDAVConfigs.mockResolvedValue([{ id: 'w-1' }]);
      mockRepository.testWebDAVConnection.mockResolvedValue({ success: true });
      const service = createWebdavService(mockRepository as any);
      await service.testWebDAVConnection('school-1', 'w-1', 'user-1');
      expect(mockRepository.testWebDAVConnection).toHaveBeenCalledWith('w-1');
    });

    it('should validate schoolId before repository in getWebDAVConfigs', async () => {
      const service = createWebdavService(mockRepository as any);
      await expect(service.getWebDAVConfigs('', 'user-1')).rejects.toThrow();
      expect(mockRepository.getWebDAVConfigs).not.toHaveBeenCalled();
    });

    it('should validate data before repository in createWebDAVConfig', async () => {
      const service = createWebdavService(mockRepository as any);
      await expect(service.createWebDAVConfig('school-1', 'user-1', {})).rejects.toThrow();
      expect(mockRepository.createWebDAVConfig).not.toHaveBeenCalled();
    });

    it('should validate configId before repository in deleteWebDAVConfig', async () => {
      const service = createWebdavService(mockRepository as any);
      await expect(service.deleteWebDAVConfig('school-1', '', 'user-1')).rejects.toThrow();
      expect(mockRepository.deleteWebDAVConfig).not.toHaveBeenCalled();
    });

    it('should validate configId before repository in testWebDAVConnection', async () => {
      const service = createWebdavService(mockRepository as any);
      await expect(service.testWebDAVConnection('school-1', '', 'user-1')).rejects.toThrow();
      expect(mockRepository.testWebDAVConnection).not.toHaveBeenCalled();
    });
  });
});
