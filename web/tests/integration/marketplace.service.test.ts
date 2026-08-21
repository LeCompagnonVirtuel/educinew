import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createMarketplaceService } from '../../src/features/integration/services/marketplace.service';

describe('MarketplaceService', () => {
  let mockRepository: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockRepository = {
      getPlugins: vi.fn(),
      getPluginById: vi.fn(),
      installPlugin: vi.fn(),
      uninstallPlugin: vi.fn(),
      updatePlugin: vi.fn(),
      getPluginReviews: vi.fn(),
      getPluginStats: vi.fn(),
      searchPlugins: vi.fn(),
    };
  });

  it('should create service with all methods', () => {
    const service = createMarketplaceService(mockRepository);
    expect(service).toBeDefined();
    expect(service.getPlugins).toBeInstanceOf(Function);
    expect(service.getPluginById).toBeInstanceOf(Function);
    expect(service.installPlugin).toBeInstanceOf(Function);
    expect(service.uninstallPlugin).toBeInstanceOf(Function);
    expect(service.updatePlugin).toBeInstanceOf(Function);
    expect(service.getPluginReviews).toBeInstanceOf(Function);
    expect(service.getPluginStats).toBeInstanceOf(Function);
    expect(service.searchPlugins).toBeInstanceOf(Function);
  });

  describe('getPlugins', () => {
    it('should return plugins list', async () => {
      mockRepository.getPlugins.mockResolvedValue([{ id: 'pl-1', name: 'Google Drive Plugin' }]);
      const service = createMarketplaceService(mockRepository);
      const result = await service.getPlugins('school-1');
      expect(result).toHaveLength(1);
    });

    it('should return plugins with filters', async () => {
      mockRepository.getPlugins.mockResolvedValue([{ id: 'pl-1' }]);
      const service = createMarketplaceService(mockRepository);
      await service.getPlugins('school-1', { status: 'installed' });
      expect(mockRepository.getPlugins).toHaveBeenCalledWith('school-1', { status: 'installed' });
    });

    it('should throw if schoolId is missing', async () => {
      const service = createMarketplaceService(mockRepository);
      await expect(service.getPlugins('')).rejects.toThrow('schoolId is required');
    });

    it('should return empty list', async () => {
      mockRepository.getPlugins.mockResolvedValue([]);
      const service = createMarketplaceService(mockRepository);
      const result = await service.getPlugins('school-1');
      expect(result).toEqual([]);
    });

    it('should return paginated plugins', async () => {
      mockRepository.getPlugins.mockResolvedValue({ data: [{ id: 'pl-1' }], total: 50 });
      const service = createMarketplaceService(mockRepository);
      const result = await service.getPlugins('school-1', { page: 1, limit: 10 });
      expect(result.data).toHaveLength(1);
    });

    it('should filter by category', async () => {
      mockRepository.getPlugins.mockResolvedValue([{ id: 'pl-1', category: 'storage' }]);
      const service = createMarketplaceService(mockRepository);
      const result = await service.getPlugins('school-1', { category: 'storage' });
      expect(result).toHaveLength(1);
    });

    it('should return plugins with rating', async () => {
      mockRepository.getPlugins.mockResolvedValue([{ id: 'pl-1', rating: 4.5, reviewCount: 100 }]);
      const service = createMarketplaceService(mockRepository);
      const result = await service.getPlugins('school-1');
      expect(result[0].rating).toBe(4.5);
    });

    it('should handle repository errors', async () => {
      mockRepository.getPlugins.mockRejectedValue(new Error('DB error'));
      const service = createMarketplaceService(mockRepository);
      await expect(service.getPlugins('school-1')).rejects.toThrow('DB error');
    });
  });

  describe('getPluginById', () => {
    it('should return a single plugin', async () => {
      mockRepository.getPluginById.mockResolvedValue({ id: 'pl-1', name: 'Google Drive Plugin' });
      const service = createMarketplaceService(mockRepository);
      const result = await service.getPluginById('pl-1');
      expect(result.id).toBe('pl-1');
    });

    it('should throw if plugin not found', async () => {
      mockRepository.getPluginById.mockResolvedValue(null);
      const service = createMarketplaceService(mockRepository);
      await expect(service.getPluginById('nonexistent')).rejects.toThrow('Plugin not found');
    });

    it('should throw if id is missing', async () => {
      const service = createMarketplaceService(mockRepository);
      await expect(service.getPluginById('')).rejects.toThrow('Plugin ID is required');
    });

    it('should return plugin with details', async () => {
      mockRepository.getPluginById.mockResolvedValue({ id: 'pl-1', name: 'Test', description: 'Test plugin', version: '1.0.0', author: 'Author', size: 1024 });
      const service = createMarketplaceService(mockRepository);
      const result = await service.getPluginById('pl-1');
      expect(result.version).toBe('1.0.0');
    });

    it('should return plugin with permissions', async () => {
      mockRepository.getPluginById.mockResolvedValue({ id: 'pl-1', permissions: ['read', 'write'] });
      const service = createMarketplaceService(mockRepository);
      const result = await service.getPluginById('pl-1');
      expect(result.permissions).toHaveLength(2);
    });

    it('should return plugin with changelog', async () => {
      mockRepository.getPluginById.mockResolvedValue({ id: 'pl-1', changelog: [{ version: '1.0.0', changes: ['Initial release'] }] });
      const service = createMarketplaceService(mockRepository);
      const result = await service.getPluginById('pl-1');
      expect(result.changelog).toHaveLength(1);
    });

    it('should handle repository errors', async () => {
      mockRepository.getPluginById.mockRejectedValue(new Error('Query timeout'));
      const service = createMarketplaceService(mockRepository);
      await expect(service.getPluginById('pl-1')).rejects.toThrow('Query timeout');
    });
  });

  describe('installPlugin', () => {
    it('should install a plugin', async () => {
      mockRepository.installPlugin.mockResolvedValue({ pluginId: 'pl-1', schoolId: 'school-1', status: 'installed', installedAt: '2024-01-01' });
      const service = createMarketplaceService(mockRepository);
      const result = await service.installPlugin('pl-1', 'school-1', 'user-1');
      expect(result.status).toBe('installed');
    });

    it('should throw if pluginId is missing', async () => {
      const service = createMarketplaceService(mockRepository);
      await expect(service.installPlugin('', 'school-1', 'user-1')).rejects.toThrow('Plugin ID is required');
    });

    it('should throw if schoolId is missing', async () => {
      const service = createMarketplaceService(mockRepository);
      await expect(service.installPlugin('pl-1', '', 'user-1')).rejects.toThrow('schoolId is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createMarketplaceService(mockRepository);
      await expect(service.installPlugin('pl-1', 'school-1', '')).rejects.toThrow('userId is required');
    });

    it('should handle already installed', async () => {
      mockRepository.installPlugin.mockResolvedValue({ status: 'already_installed' });
      const service = createMarketplaceService(mockRepository);
      const result = await service.installPlugin('pl-1', 'school-1', 'user-1');
      expect(result.status).toBe('already_installed');
    });

    it('should handle installation failure', async () => {
      mockRepository.installPlugin.mockRejectedValue(new Error('Installation failed'));
      const service = createMarketplaceService(mockRepository);
      await expect(service.installPlugin('pl-1', 'school-1', 'user-1')).rejects.toThrow('Installation failed');
    });

    it('should return installation details', async () => {
      mockRepository.installPlugin.mockResolvedValue({ pluginId: 'pl-1', status: 'installed', config: { apiKey: '***' } });
      const service = createMarketplaceService(mockRepository);
      const result = await service.installPlugin('pl-1', 'school-1', 'user-1');
      expect(result.config).toBeDefined();
    });
  });

  describe('uninstallPlugin', () => {
    it('should uninstall a plugin', async () => {
      mockRepository.uninstallPlugin.mockResolvedValue({ pluginId: 'pl-1', status: 'uninstalled' });
      const service = createMarketplaceService(mockRepository);
      const result = await service.uninstallPlugin('pl-1', 'school-1', 'user-1');
      expect(result.status).toBe('uninstalled');
    });

    it('should throw if pluginId is missing', async () => {
      const service = createMarketplaceService(mockRepository);
      await expect(service.uninstallPlugin('', 'school-1', 'user-1')).rejects.toThrow('Plugin ID is required');
    });

    it('should throw if schoolId is missing', async () => {
      const service = createMarketplaceService(mockRepository);
      await expect(service.uninstallPlugin('pl-1', '', 'user-1')).rejects.toThrow('schoolId is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createMarketplaceService(mockRepository);
      await expect(service.uninstallPlugin('pl-1', 'school-1', '')).rejects.toThrow('userId is required');
    });

    it('should handle not installed', async () => {
      mockRepository.uninstallPlugin.mockRejectedValue(new Error('Plugin not installed'));
      const service = createMarketplaceService(mockRepository);
      await expect(service.uninstallPlugin('pl-1', 'school-1', 'user-1')).rejects.toThrow('Plugin not installed');
    });

    it('should return uninstall details', async () => {
      mockRepository.uninstallPlugin.mockResolvedValue({ pluginId: 'pl-1', status: 'uninstalled', removedData: true });
      const service = createMarketplaceService(mockRepository);
      const result = await service.uninstallPlugin('pl-1', 'school-1', 'user-1');
      expect(result.removedData).toBe(true);
    });
  });

  describe('updatePlugin', () => {
    it('should update a plugin', async () => {
      mockRepository.updatePlugin.mockResolvedValue({ pluginId: 'pl-1', status: 'updated', newVersion: '1.1.0' });
      const service = createMarketplaceService(mockRepository);
      const result = await service.updatePlugin('pl-1', 'school-1', 'user-1');
      expect(result.status).toBe('updated');
    });

    it('should throw if pluginId is missing', async () => {
      const service = createMarketplaceService(mockRepository);
      await expect(service.updatePlugin('', 'school-1', 'user-1')).rejects.toThrow('Plugin ID is required');
    });

    it('should throw if schoolId is missing', async () => {
      const service = createMarketplaceService(mockRepository);
      await expect(service.updatePlugin('pl-1', '', 'user-1')).rejects.toThrow('schoolId is required');
    });

    it('should throw if userId is missing', async () => {
      const service = createMarketplaceService(mockRepository);
      await expect(service.updatePlugin('pl-1', 'school-1', '')).rejects.toThrow('userId is required');
    });

    it('should handle already up to date', async () => {
      mockRepository.updatePlugin.mockResolvedValue({ status: 'already_up_to_date' });
      const service = createMarketplaceService(mockRepository);
      const result = await service.updatePlugin('pl-1', 'school-1', 'user-1');
      expect(result.status).toBe('already_up_to_date');
    });

    it('should handle update failure', async () => {
      mockRepository.updatePlugin.mockRejectedValue(new Error('Update failed'));
      const service = createMarketplaceService(mockRepository);
      await expect(service.updatePlugin('pl-1', 'school-1', 'user-1')).rejects.toThrow('Update failed');
    });
  });

  describe('getPluginReviews', () => {
    it('should return plugin reviews', async () => {
      mockRepository.getPluginReviews.mockResolvedValue([{ id: 'rv-1', userId: 'user-1', rating: 5, comment: 'Great plugin' }]);
      const service = createMarketplaceService(mockRepository);
      const result = await service.getPluginReviews('pl-1');
      expect(result).toHaveLength(1);
    });

    it('should return paginated reviews', async () => {
      mockRepository.getPluginReviews.mockResolvedValue({ data: [{ id: 'rv-1' }], total: 50 });
      const service = createMarketplaceService(mockRepository);
      const result = await service.getPluginReviews('pl-1', { page: 1, limit: 10 });
      expect(result.data).toHaveLength(1);
    });

    it('should throw if pluginId is missing', async () => {
      const service = createMarketplaceService(mockRepository);
      await expect(service.getPluginReviews('')).rejects.toThrow('Plugin ID is required');
    });

    it('should return empty reviews', async () => {
      mockRepository.getPluginReviews.mockResolvedValue([]);
      const service = createMarketplaceService(mockRepository);
      const result = await service.getPluginReviews('pl-1');
      expect(result).toEqual([]);
    });
  });

  describe('getPluginStats', () => {
    it('should return plugin stats', async () => {
      mockRepository.getPluginStats.mockResolvedValue({ pluginId: 'pl-1', installs: 100, rating: 4.5, reviewCount: 50 });
      const service = createMarketplaceService(mockRepository);
      const result = await service.getPluginStats('pl-1');
      expect(result.installs).toBe(100);
    });

    it('should throw if pluginId is missing', async () => {
      const service = createMarketplaceService(mockRepository);
      await expect(service.getPluginStats('')).rejects.toThrow('Plugin ID is required');
    });

    it('should return zero stats for new plugin', async () => {
      mockRepository.getPluginStats.mockResolvedValue({ pluginId: 'pl-1', installs: 0, rating: 0, reviewCount: 0 });
      const service = createMarketplaceService(mockRepository);
      const result = await service.getPluginStats('pl-1');
      expect(result.installs).toBe(0);
    });

    it('should handle repository errors', async () => {
      mockRepository.getPluginStats.mockRejectedValue(new Error('DB error'));
      const service = createMarketplaceService(mockRepository);
      await expect(service.getPluginStats('pl-1')).rejects.toThrow('DB error');
    });
  });

  describe('searchPlugins', () => {
    it('should search plugins', async () => {
      mockRepository.searchPlugins.mockResolvedValue([{ id: 'pl-1', name: 'Google Drive' }]);
      const service = createMarketplaceService(mockRepository);
      const result = await service.searchPlugins('school-1', 'google');
      expect(result).toHaveLength(1);
      expect(mockRepository.searchPlugins).toHaveBeenCalledWith('school-1', 'google');
    });

    it('should throw if schoolId is missing', async () => {
      const service = createMarketplaceService(mockRepository);
      await expect(service.searchPlugins('', 'query')).rejects.toThrow('schoolId is required');
    });

    it('should throw if query is missing', async () => {
      const service = createMarketplaceService(mockRepository);
      await expect(service.searchPlugins('school-1', '')).rejects.toThrow('Search query is required');
    });

    it('should return empty search results', async () => {
      mockRepository.searchPlugins.mockResolvedValue([]);
      const service = createMarketplaceService(mockRepository);
      const result = await service.searchPlugins('school-1', 'nonexistent');
      expect(result).toEqual([]);
    });

    it('should return paginated search results', async () => {
      mockRepository.searchPlugins.mockResolvedValue({ data: [{ id: 'pl-1' }], total: 5 });
      const service = createMarketplaceService(mockRepository);
      const result = await service.searchPlugins('school-1', 'drive', { page: 1, limit: 5 });
      expect(result.data).toHaveLength(1);
    });

    it('should handle repository errors', async () => {
      mockRepository.searchPlugins.mockRejectedValue(new Error('DB error'));
      const service = createMarketplaceService(mockRepository);
      await expect(service.searchPlugins('school-1', 'query')).rejects.toThrow('DB error');
    });
  });
});
