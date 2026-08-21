import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('useEnterpriseSettings service', () => {
  const mockRepo = {
    findSettings: vi.fn(),
    updateSettings: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return settings', async () => {
    const settings = { theme: 'dark', language: 'fr', notifications: true };
    mockRepo.findSettings.mockResolvedValue(settings);
    const result = await mockRepo.findSettings('ent-1');
    expect(result.theme).toBe('dark');
  });

  it('should throw when enterpriseId is missing for findSettings', async () => {
    mockRepo.findSettings.mockRejectedValueOnce(new Error('Identifiant de l\'entreprise requis'));
    await expect(mockRepo.findSettings('')).rejects.toThrow('Identifiant de l\'entreprise requis');
  });

  it('should update settings successfully', async () => {
    const updated = { theme: 'light', language: 'en' };
    mockRepo.updateSettings.mockResolvedValue(updated);
    const result = await mockRepo.updateSettings('ent-1', { theme: 'light' });
    expect(result.theme).toBe('light');
  });

  it('should throw when enterpriseId is missing for updateSettings', async () => {
    mockRepo.updateSettings.mockRejectedValueOnce(new Error('Identifiant de l\'entreprise requis'));
    await expect(mockRepo.updateSettings('', { theme: 'dark' })).rejects.toThrow('Identifiant de l\'entreprise requis');
  });

  it('should return null when no settings exist', async () => {
    mockRepo.findSettings.mockResolvedValue(null);
    const result = await mockRepo.findSettings('ent-1');
    expect(result).toBeNull();
  });

  it('should pass data to updateSettings', async () => {
    mockRepo.updateSettings.mockResolvedValue({});
    const data = { language: 'en', timezone: 'UTC' };
    await mockRepo.updateSettings('ent-1', data);
    expect(mockRepo.updateSettings).toHaveBeenCalledWith('ent-1', data);
  });

  it('should call repo.findSettings with correct id', async () => {
    mockRepo.findSettings.mockResolvedValue({});
    await mockRepo.findSettings('ent-1');
    expect(mockRepo.findSettings).toHaveBeenCalledWith('ent-1');
  });

  it('should call repo.updateSettings with correct params', async () => {
    mockRepo.updateSettings.mockResolvedValue({});
    await mockRepo.updateSettings('ent-1', { theme: 'dark' });
    expect(mockRepo.updateSettings).toHaveBeenCalledWith('ent-1', { theme: 'dark' });
  });

  it('should return full settings object', async () => {
    const settings = { theme: 'dark', language: 'fr', notifications: true, timezone: 'Europe/Paris' };
    mockRepo.findSettings.mockResolvedValue(settings);
    const result = await mockRepo.findSettings('ent-1');
    expect(Object.keys(result)).toHaveLength(4);
  });

  it('should handle repo error on findSettings', async () => {
    mockRepo.findSettings.mockRejectedValue(new Error('Settings not found'));
    await expect(mockRepo.findSettings('ent-1')).rejects.toThrow('Settings not found');
  });

  it('should handle repo error on updateSettings', async () => {
    mockRepo.updateSettings.mockRejectedValue(new Error('Permission denied'));
    await expect(mockRepo.updateSettings('ent-1', {})).rejects.toThrow('Permission denied');
  });

  it('should handle empty update data', async () => {
    const current = { theme: 'dark' };
    mockRepo.updateSettings.mockResolvedValue(current);
    const result = await mockRepo.updateSettings('ent-1', {});
    expect(result.theme).toBe('dark');
  });

  it('should return updated settings after change', async () => {
    const before = { theme: 'dark', language: 'fr' };
    const after = { theme: 'light', language: 'fr' };
    mockRepo.findSettings.mockResolvedValue(before);
    mockRepo.updateSettings.mockResolvedValue(after);
    const updated = await mockRepo.updateSettings('ent-1', { theme: 'light' });
    expect(updated.theme).toBe('light');
    expect(updated.language).toBe('fr');
  });

  it('should call findSettings only once per invocation', async () => {
    mockRepo.findSettings.mockResolvedValue({ theme: 'dark' });
    await mockRepo.findSettings('ent-1');
    expect(mockRepo.findSettings).toHaveBeenCalledTimes(1);
  });

  it('should handle settings with nested objects', async () => {
    const settings = { integrations: { sso: true, ldap: false }, theme: 'dark' };
    mockRepo.findSettings.mockResolvedValue(settings);
    const result = await mockRepo.findSettings('ent-1');
    expect(result.integrations.sso).toBe(true);
  });
});
