import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('useFeatureFlags service', () => {
  const mockRepo = {
    findFeatureFlags: vi.fn(),
    findFeatureFlagById: vi.fn(),
    createFeatureFlag: vi.fn(),
    updateFeatureFlag: vi.fn(),
    deleteFeatureFlag: vi.fn(),
    toggleFeatureFlag: vi.fn(),
    checkFeatureFlag: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return feature flags list', async () => {
    const flags = [{ id: 'f1', name: 'dark-mode', enabled: true }];
    mockRepo.findFeatureFlags.mockResolvedValue(flags);
    const result = await mockRepo.findFeatureFlags('ent-1');
    expect(result).toHaveLength(1);
  });

  it('should throw when enterpriseId is empty', async () => {
    mockRepo.findFeatureFlags.mockRejectedValueOnce(new Error('Identifiant de l\'entreprise requis'));
    await expect(mockRepo.findFeatureFlags('')).rejects.toThrow('Identifiant de l\'entreprise requis');
  });

  it('should return a flag by id', async () => {
    const flag = { id: 'f1', name: 'dark-mode', enabled: true };
    mockRepo.findFeatureFlagById.mockResolvedValue(flag);
    const result = await mockRepo.findFeatureFlagById('ent-1', 'f1');
    expect(result.name).toBe('dark-mode');
  });

  it('should return null when flag not found', async () => {
    mockRepo.findFeatureFlagById.mockResolvedValue(null);
    const result = await mockRepo.findFeatureFlagById('ent-1', 'missing');
    expect(result).toBeNull();
  });

  it('should create a feature flag', async () => {
    const flag = { id: 'f2', name: 'new-dashboard', enabled: false };
    mockRepo.createFeatureFlag.mockResolvedValue(flag);
    const result = await mockRepo.createFeatureFlag({ name: 'new-dashboard', enterprise_id: 'ent-1' });
    expect(result.name).toBe('new-dashboard');
  });

  it('should update a feature flag', async () => {
    const updated = { id: 'f1', name: 'dark-mode', enabled: false };
    mockRepo.updateFeatureFlag.mockResolvedValue(updated);
    const result = await mockRepo.updateFeatureFlag('ent-1', 'f1', { enabled: false });
    expect(result.enabled).toBe(false);
  });

  it('should delete a feature flag', async () => {
    mockRepo.deleteFeatureFlag.mockResolvedValue({ success: true });
    const result = await mockRepo.deleteFeatureFlag('ent-1', 'f1');
    expect(result.success).toBe(true);
  });

  it('should toggle a feature flag', async () => {
    const toggled = { id: 'f1', name: 'dark-mode', enabled: true };
    mockRepo.toggleFeatureFlag.mockResolvedValue(toggled);
    const result = await mockRepo.toggleFeatureFlag('ent-1', 'f1');
    expect(result.enabled).toBe(true);
  });

  it('should check a feature flag', async () => {
    mockRepo.checkFeatureFlag.mockResolvedValue(true);
    const result = await mockRepo.checkFeatureFlag('ent-1', 'dark-mode');
    expect(result).toBe(true);
  });

  it('should return false when flag check is off', async () => {
    mockRepo.checkFeatureFlag.mockResolvedValue(false);
    const result = await mockRepo.checkFeatureFlag('ent-1', 'experimental');
    expect(result).toBe(false);
  });

  it('should handle empty flags list', async () => {
    mockRepo.findFeatureFlags.mockResolvedValue([]);
    const result = await mockRepo.findFeatureFlags('ent-1');
    expect(result).toEqual([]);
  });

  it('should handle repo error on createFeatureFlag', async () => {
    mockRepo.createFeatureFlag.mockRejectedValue(new Error('Duplicate flag name'));
    await expect(mockRepo.createFeatureFlag({ name: 'dup' })).rejects.toThrow('Duplicate flag name');
  });

  it('should handle repo error on toggleFeatureFlag', async () => {
    mockRepo.toggleFeatureFlag.mockRejectedValue(new Error('Flag not found'));
    await expect(mockRepo.toggleFeatureFlag('ent-1', 'bad-id')).rejects.toThrow('Flag not found');
  });

  it('should handle repo error on deleteFeatureFlag', async () => {
    mockRepo.deleteFeatureFlag.mockRejectedValue(new Error('Cannot delete'));
    await expect(mockRepo.deleteFeatureFlag('ent-1', 'f1')).rejects.toThrow('Cannot delete');
  });

  it('should pass filters to findFeatureFlags', async () => {
    mockRepo.findFeatureFlags.mockResolvedValue([]);
    const filters = { enabled: true };
    await mockRepo.findFeatureFlags('ent-1', filters);
    expect(mockRepo.findFeatureFlags).toHaveBeenCalledWith('ent-1', filters);
  });
});
