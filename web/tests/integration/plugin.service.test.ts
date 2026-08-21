import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createPluginService } from '../../src/features/integration/services/plugin.service';

describe('PluginService', () => {
  let mockRepository: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockRepository = {
      getPlugins: vi.fn(),
      getPluginById: vi.fn(),
      installPlugin: vi.fn(),
      uninstallPlugin: vi.fn(),
      updatePlugin: vi.fn(),
      enablePlugin: vi.fn(),
      disablePlugin: vi.fn(),
      getPluginConfig: vi.fn(),
    };
  });

  it('should create service with all methods', () => {
    const service = createPluginService(mockRepository);
    expect(service).toBeDefined();
    expect(service.getPlugins).toBeInstanceOf(Function);
    expect(service.getPluginById).toBeInstanceOf(Function);
    expect(service.installPlugin).toBeInstanceOf(Function);
    expect(service.uninstallPlugin).toBeInstanceOf(Function);
    expect(service.updatePlugin).toBeInstanceOf(Function);
    expect(service.enablePlugin).toBeInstanceOf(Function);
    expect(service.disablePlugin).toBeInstanceOf(Function);
    expect(service.getPluginConfig).toBeInstanceOf(Function);
  });

  describe('getPlugins', () => {
    it('should return plugins list', async () => {
      mockRepository.getPlugins.mockResolvedValue([{ id: 'pl-1', name: 'Google Drive', status: 'installed' }]);
      const service = createPluginService(mockRepository);
      const result = await service.getPlugins('school-1');
      expect(result).toHaveLength(1);
    });

    it('should return plugins with filters', async () => {
      mockRepository.getPlugins.mockResolvedValue([{ id: 'pl-1' }]);
      const service = createPluginService(mockRepository);
      await service.getPlugins('school-1', { status: 'installed' });
      expect(mockRepository.getPlugins).toHaveBeenCalledWith('school-1', { status: 'installed' });
    });

    it('should throw if schoolId is missing', async () => {
      const service = createPluginService(mockRepository);
      await expect(service.getPlugins('')).rejects.toThrow('schoolId is required');
    });

    it('should return empty list', async () => {
      mockRepository.getPlugins.mockResolvedValue([]);
      const service = createPluginService(mockRepository);
      const result = await service.getPlugins('school-1');
      expect(result).toEqual([]);
    });

    it('should return paginated plugins', async () => {
      mockRepository.getPlugins.mockResolvedValue({ data: [{ id: 'pl-1' }], total: 20 });
      const service = createPluginService(mockRepository);
      const result = await service.getPlugins('school-1', { page: 1, limit: 5 });
      expect(result.data).toHaveLength(1);
    });

    it('should filter by category', async () => {
      mockRepository.getPlugins.mockResolvedValue([{ id: 'pl-1', category: 'storage' }]);
      const service = createPluginService(mockRepository);
      const result = await service.getPlugins('school-1', { category: 'storage' });
      expect(result).toHaveLength(1);
    });

    it('should return plugins with version', async () => {
      mockRepository.getPlugins.mockResolvedValue([{ id: 'pl-1', version: '2.1.0' }]);
      const service = createPluginService(mockRepository);
      const result = await service.getPlugins('school-1');
      expect(result[0].version).toBe('2.1.0');
    });

    it('should handle repository errors', async () => {
      mockRepository.getPlugins.mockRejectedValue(new Error('DB error'));
      const service = createPluginService(mockRepository);
      await expect(service.getPlugins('school-1')).rejects.toThrow('DB error');
    });
  });

  describe('getPluginById', () => {
    it('should return a single plugin', async () => {
      mockRepository.getPluginById.mockResolvedValue({ id: 'pl-1', name: 'Google Drive', status: 'installed' });
      const service = createPluginService(mockRepository);
      const result = await service.getPluginById('pl-1');
      expect(result.id).toBe('pl-1');
    });

    it('should throw if plugin not found', async () => {
      mockRepository.getPluginById.mockResolvedValue(null);
      const service = createPluginService(mockRepository);
      await expect(service.getPluginById('nonexistent')).rejects.toThrow('Plugin not found');
    });

    it('should throw if id is missing', async () => {
      const service = createPluginService(mockRepository);
      await expect(service.getPluginById('')).rejects.toThrow('Plugin ID is required');
    });

    it('should return plugin with config', async () => {
      mockRepository.getPluginById.mockResolvedValue({ id: 'pl-1', config: { apiKey: '***', folder: 'Documents' } });
      const service = createPluginService(mockRepository);
      const result = await service.getPluginById('pl-1');
      expect(result.config.apiKey).toBeDefined();
    });

    it('should return plugin with permissions', async () => {
      mockRepository.getPluginById.mockResolvedValue({ id: 'pl-1', permissions: ['read', 'write'] });
      const service = createPluginService(mockRepository);
      const result = await service.getPluginById('pl-1');
      expect(result.permissions).toHaveLength(2);
    });

    it('should return plugin with health', async () => {
      mockRepository.getPluginById.mockResolvedValue({ id: 'pl-1', health: { status: 'healthy', lastCheck: '2024-01-01' } });
      const service = createPluginService(mockRepository);
      const result = await service.getPluginById('pl-1');
      expect(result.health.status).toBe('healthy');
    });

    it('should handle repository errors', async () => {
      mockRepository.getPluginById.mockRejectedValue(new Error('Query timeout'));
      const service = createPluginService(mockRepository);
      await expect(service.getPluginById('pl-1')).rejects.toThrow('Query timeout');
    });
  });

  describe('installPlugin', () => {
    it('should install a plugin', async () => {
      mockRepository.installPlugin.mockResolvedValue({ pluginId: 'pl-1', schoolId: 'school-1', status: 'installed' });
      const service = createPluginService(mockRepository);
      const result = await service.installPlugin('pl-1', 'school-1', 'user-1');
      expect(result.status).toBe('installed');
    });

    it('should throw if pluginId is missing', async () => {
      const service = createPluginService(mockRepository);
      await expect(service.installPlugin('', 'school-1', 'user-1')).rejects.toThrow('Plugin ID is required');
    });

    it('should throw if schoolId is missing', async () => {
      const service = createPluginService(mockRepository);
      await expect(service.installPlugin('pl-1', '', 'user-1')).rejects.toThrow('schoolId is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createPluginService(mockRepository);
      await expect(service.installPlugin('pl-1', 'school-1', '')).rejects.toThrow('userId is required');
    });

    it('should handle already installed', async () => {
      mockRepository.installPlugin.mockResolvedValue({ status: 'already_installed' });
      const service = createPluginService(mockRepository);
      const result = await service.installPlugin('pl-1', 'school-1', 'user-1');
      expect(result.status).toBe('already_installed');
    });

    it('should handle installation failure', async () => {
      mockRepository.installPlugin.mockRejectedValue(new Error('Installation failed'));
      const service = createPluginService(mockRepository);
      await expect(service.installPlugin('pl-1', 'school-1', 'user-1')).rejects.toThrow('Installation failed');
    });

    it('should return installation details', async () => {
      mockRepository.installPlugin.mockResolvedValue({ pluginId: 'pl-1', status: 'installed', config: { apiKey: '***' } });
      const service = createPluginService(mockRepository);
      const result = await service.installPlugin('pl-1', 'school-1', 'user-1');
      expect(result.config).toBeDefined();
    });
  });

  describe('uninstallPlugin', () => {
    it('should uninstall a plugin', async () => {
      mockRepository.uninstallPlugin.mockResolvedValue({ pluginId: 'pl-1', status: 'uninstalled' });
      const service = createPluginService(mockRepository);
      const result = await service.uninstallPlugin('pl-1', 'school-1', 'user-1');
      expect(result.status).toBe('uninstalled');
    });

    it('should throw if pluginId is missing', async () => {
      const service = createPluginService(mockRepository);
      await expect(service.uninstallPlugin('', 'school-1', 'user-1')).rejects.toThrow('Plugin ID is required');
    });

    it('should throw if schoolId is missing', async () => {
      const service = createPluginService(mockRepository);
      await expect(service.uninstallPlugin('pl-1', '', 'user-1')).rejects.toThrow('schoolId is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createPluginService(mockRepository);
      await expect(service.uninstallPlugin('pl-1', 'school-1', '')).rejects.toThrow('userId is required');
    });

    it('should handle not installed', async () => {
      mockRepository.uninstallPlugin.mockRejectedValue(new Error('Plugin not installed'));
      const service = createPluginService(mockRepository);
      await expect(service.uninstallPlugin('pl-1', 'school-1', 'user-1')).rejects.toThrow('Plugin not installed');
    });

    it('should return uninstall details', async () => {
      mockRepository.uninstallPlugin.mockResolvedValue({ pluginId: 'pl-1', status: 'uninstalled', removedData: true });
      const service = createPluginService(mockRepository);
      const result = await service.uninstallPlugin('pl-1', 'school-1', 'user-1');
      expect(result.removedData).toBe(true);
    });
  });

  describe('updatePlugin', () => {
    it('should update a plugin', async () => {
      mockRepository.updatePlugin.mockResolvedValue({ pluginId: 'pl-1', status: 'updated', newVersion: '2.2.0' });
      const service = createPluginService(mockRepository);
      const result = await service.updatePlugin('pl-1', 'school-1', 'user-1');
      expect(result.status).toBe('updated');
    });

    it('should throw if pluginId is missing', async () => {
      const service = createPluginService(mockRepository);
      await expect(service.updatePlugin('', 'school-1', 'user-1')).rejects.toThrow('Plugin ID is required');
    });

    it('should throw if schoolId is missing', async () => {
      const service = createPluginService(mockRepository);
      await expect(service.updatePlugin('pl-1', '', 'user-1')).rejects.toThrow('schoolId is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createPluginService(mockRepository);
      await expect(service.updatePlugin('pl-1', 'school-1', '')).rejects.toThrow('userId is required');
    });

    it('should handle already up to date', async () => {
      mockRepository.updatePlugin.mockResolvedValue({ status: 'already_up_to_date' });
      const service = createPluginService(mockRepository);
      const result = await service.updatePlugin('pl-1', 'school-1', 'user-1');
      expect(result.status).toBe('already_up_to_date');
    });

    it('should handle update failure', async () => {
      mockRepository.updatePlugin.mockRejectedValue(new Error('Update failed'));
      const service = createPluginService(mockRepository);
      await expect(service.updatePlugin('pl-1', 'school-1', 'user-1')).rejects.toThrow('Update failed');
    });
  });

  describe('enablePlugin', () => {
    it('should enable a plugin', async () => {
      mockRepository.enablePlugin.mockResolvedValue({ pluginId: 'pl-1', status: 'enabled' });
      const service = createPluginService(mockRepository);
      const result = await service.enablePlugin('pl-1', 'school-1', 'user-1');
      expect(result.status).toBe('enabled');
    });

    it('should throw if pluginId is missing', async () => {
      const service = createPluginService(mockRepository);
      await expect(service.enablePlugin('', 'school-1', 'user-1')).rejects.toThrow('Plugin ID is required');
    });

    it('should throw if schoolId is missing', async () => {
      const service = createPluginService(mockRepository);
      await expect(service.enablePlugin('pl-1', '', 'user-1')).rejects.toThrow('schoolId is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createPluginService(mockRepository);
      await expect(service.enablePlugin('pl-1', 'school-1', '')).rejects.toThrow('userId is required');
    });

    it('should handle already enabled', async () => {
      mockRepository.enablePlugin.mockResolvedValue({ status: 'already_enabled' });
      const service = createPluginService(mockRepository);
      const result = await service.enablePlugin('pl-1', 'school-1', 'user-1');
      expect(result.status).toBe('already_enabled');
    });
  });

  describe('disablePlugin', () => {
    it('should disable a plugin', async () => {
      mockRepository.disablePlugin.mockResolvedValue({ pluginId: 'pl-1', status: 'disabled' });
      const service = createPluginService(mockRepository);
      const result = await service.disablePlugin('pl-1', 'school-1', 'user-1');
      expect(result.status).toBe('disabled');
    });

    it('should throw if pluginId is missing', async () => {
      const service = createPluginService(mockRepository);
      await expect(service.disablePlugin('', 'school-1', 'user-1')).rejects.toThrow('Plugin ID is required');
    });

    it('should throw if schoolId is missing', async () => {
      const service = createPluginService(mockRepository);
      await expect(service.disablePlugin('pl-1', '', 'user-1')).rejects.toThrow('schoolId is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createPluginService(mockRepository);
      await expect(service.disablePlugin('pl-1', 'school-1', '')).rejects.toThrow('userId is required');
    });

    it('should handle already disabled', async () => {
      mockRepository.disablePlugin.mockResolvedValue({ status: 'already_disabled' });
      const service = createPluginService(mockRepository);
      const result = await service.disablePlugin('pl-1', 'school-1', 'user-1');
      expect(result.status).toBe('already_disabled');
    });
  });

  describe('getPluginConfig', () => {
    it('should return plugin config', async () => {
      mockRepository.getPluginConfig.mockResolvedValue({ pluginId: 'pl-1', config: { apiKey: '***', folder: 'Documents' } });
      const service = createPluginService(mockRepository);
      const result = await service.getPluginConfig('pl-1', 'school-1');
      expect(result.config).toBeDefined();
    });

    it('should throw if pluginId is missing', async () => {
      const service = createPluginService(mockRepository);
      await expect(service.getPluginConfig('', 'school-1')).rejects.toThrow('Plugin ID is required');
    });

    it('should throw if schoolId is missing', async () => {
      const service = createPluginService(mockRepository);
      await expect(service.getPluginConfig('pl-1', '')).rejects.toThrow('schoolId is required');
    });

    it('should return empty config', async () => {
      mockRepository.getPluginConfig.mockResolvedValue({ pluginId: 'pl-1', config: {} });
      const service = createPluginService(mockRepository);
      const result = await service.getPluginConfig('pl-1', 'school-1');
      expect(result.config).toEqual({});
    });

    it('should handle repository errors', async () => {
      mockRepository.getPluginConfig.mockRejectedValue(new Error('DB error'));
      const service = createPluginService(mockRepository);
      await expect(service.getPluginConfig('pl-1', 'school-1')).rejects.toThrow('DB error');
    });
  });
});
