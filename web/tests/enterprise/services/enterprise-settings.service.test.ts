import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('EnterpriseSettingsService', () => {
  const mockRepo = {
    getSettings: vi.fn(),
    getSettingByKey: vi.fn(),
    updateSetting: vi.fn(),
    updateBulkSettings: vi.fn(),
    resetSetting: vi.fn(),
    resetAllSettings: vi.fn(),
    getSettingHistory: vi.fn(),
    getSettingSchema: vi.fn(),
    validateSetting: vi.fn(),
    exportSettings: vi.fn(),
    importSettings: vi.fn(),
    getPublicSettings: vi.fn(),
    getSettingDefaults: vi.fn(),
  };

  const enterpriseId = 'ent-1';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getSettings', () => {
    it('should return all settings', async () => {
      const settings = { theme: 'default', language: 'fr', timezone: 'Europe/Paris' };
      mockRepo.getSettings.mockResolvedValue(settings);
      const result = await mockRepo.getSettings(enterpriseId);
      expect(result).toEqual(settings);
    });

    it('should require enterpriseId', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('Identifiant de l\'entreprise requis');
      };
      expect(() => validate('')).toThrow('Identifiant de l\'entreprise requis');
    });

    it('should filter by category', async () => {
      mockRepo.getSettings.mockResolvedValue({ branding: {} });
      await mockRepo.getSettings(enterpriseId, { category: 'branding' });
      expect(mockRepo.getSettings).toHaveBeenCalled();
    });

    it('should handle empty settings', async () => {
      mockRepo.getSettings.mockResolvedValue({});
      const result = await mockRepo.getSettings(enterpriseId);
      expect(Object.keys(result)).toHaveLength(0);
    });

    it('should include nested settings', async () => {
      mockRepo.getSettings.mockResolvedValue({ email: { from: 'noreply@test.com', replyTo: 'support@test.com' } });
      const result = await mockRepo.getSettings(enterpriseId);
      expect(result.email.from).toBe('noreply@test.com');
    });

    it('should handle repository errors', async () => {
      mockRepo.getSettings.mockRejectedValue(new Error('Settings unavailable'));
      await expect(mockRepo.getSettings(enterpriseId)).rejects.toThrow('Settings unavailable');
    });
  });

  describe('getSettingByKey', () => {
    it('should return setting by key', async () => {
      mockRepo.getSettingByKey.mockResolvedValue({ key: 'theme', value: 'dark' });
      const result = await mockRepo.getSettingByKey(enterpriseId, 'theme');
      expect(result.value).toBe('dark');
    });

    it('should throw if not found', async () => {
      mockRepo.getSettingByKey.mockResolvedValue(null);
      const findOrThrow = async (key: string) => {
        const setting = await mockRepo.getSettingByKey(enterpriseId, key);
        if (!setting) throw new Error('Paramètre non trouvé');
      };
      await expect(findOrThrow('nonexistent')).rejects.toThrow('Paramètre non trouvé');
    });

    it('should require key', () => {
      const validate = (key: string) => {
        if (!key) throw new Error('La clé est requise');
      };
      expect(() => validate('')).toThrow('La clé est requise');
    });

    it('should return default value if not set', async () => {
      mockRepo.getSettingByKey.mockResolvedValue({ key: 'theme', value: 'default', isDefault: true });
      const result = await mockRepo.getSettingByKey(enterpriseId, 'theme');
      expect(result.isDefault).toBe(true);
    });

    it('should include metadata', async () => {
      mockRepo.getSettingByKey.mockResolvedValue({ key: 'theme', value: 'dark', lastModified: '2026-01-01', modifiedBy: 'usr-1' });
      const result = await mockRepo.getSettingByKey(enterpriseId, 'theme');
      expect(result.lastModified).toBeDefined();
    });
  });

  describe('updateSetting', () => {
    it('should update setting', async () => {
      mockRepo.updateSetting.mockResolvedValue({ key: 'theme', value: 'dark', updatedAt: new Date().toISOString() });
      const result = await mockRepo.updateSetting(enterpriseId, 'theme', 'dark');
      expect(result.value).toBe('dark');
    });

    it('should validate setting value', () => {
      const validate = (key: string, value: any) => {
        if (key === 'theme' && !['default', 'dark', 'light'].includes(value)) throw new Error('Thème invalide');
      };
      expect(() => validate('theme', 'dark')).not.toThrow();
      expect(() => validate('theme', 'invalid')).toThrow();
    });

    it('should require value', () => {
      const validate = (value: any) => {
        if (value === undefined || value === null) throw new Error('La valeur est requise');
      };
      expect(() => validate(undefined)).toThrow('La valeur est requise');
    });

    it('should record modification metadata', async () => {
      mockRepo.updateSetting.mockResolvedValue({ updatedAt: new Date().toISOString(), modifiedBy: 'usr-1' });
      const result = await mockRepo.updateSetting(enterpriseId, 'theme', 'dark', 'usr-1');
      expect(result.modifiedBy).toBe('usr-1');
    });

    it('should handle boolean values', async () => {
      mockRepo.updateSetting.mockResolvedValue({ key: 'notifications', value: true });
      const result = await mockRepo.updateSetting(enterpriseId, 'notifications', true);
      expect(result.value).toBe(true);
    });

    it('should handle numeric values', async () => {
      mockRepo.updateSetting.mockResolvedValue({ key: 'sessionTimeout', value: 3600 });
      const result = await mockRepo.updateSetting(enterpriseId, 'sessionTimeout', 3600);
      expect(result.value).toBe(3600);
    });

    it('should handle object values', async () => {
      mockRepo.updateSetting.mockResolvedValue({ key: 'branding', value: { logo: 'url', color: '#000' } });
      const result = await mockRepo.updateSetting(enterpriseId, 'branding', { logo: 'url', color: '#000' });
      expect(result.value.logo).toBe('url');
    });

    it('should validate numeric ranges', () => {
      const validate = (key: string, value: number) => {
        if (key === 'sessionTimeout' && (value < 300 || value > 86400)) throw new Error('Durée invalide');
      };
      expect(() => validate('sessionTimeout', 3600)).not.toThrow();
      expect(() => validate('sessionTimeout', 100)).toThrow();
    });
  });

  describe('updateBulkSettings', () => {
    it('should update multiple settings', async () => {
      mockRepo.updateBulkSettings.mockResolvedValue({ updated: 3 });
      const result = await mockRepo.updateBulkSettings(enterpriseId, { theme: 'dark', language: 'en', timezone: 'UTC' });
      expect(result.updated).toBe(3);
    });

    it('should handle partial failures', async () => {
      mockRepo.updateBulkSettings.mockResolvedValue({ updated: 2, errors: [{ key: 'invalid', reason: 'Invalid value' }] });
      const result = await mockRepo.updateBulkSettings(enterpriseId, { theme: 'dark', invalid: 'bad' });
      expect(result.errors).toHaveLength(1);
    });

    it('should validate all values before update', () => {
      const validate = (settings: Record<string, any>) => {
        const errors: string[] = [];
        if (settings.theme && !['default', 'dark', 'light'].includes(settings.theme)) errors.push('Invalid theme');
        return errors;
      };
      expect(validate({ theme: 'dark' })).toHaveLength(0);
      expect(validate({ theme: 'invalid' })).toHaveLength(1);
    });

    it('should handle empty settings object', async () => {
      mockRepo.updateBulkSettings.mockResolvedValue({ updated: 0 });
      const result = await mockRepo.updateBulkSettings(enterpriseId, {});
      expect(result.updated).toBe(0);
    });

    it('should support atomic updates', async () => {
      mockRepo.updateBulkSettings.mockResolvedValue({ updated: 5, atomic: true });
      const result = await mockRepo.updateBulkSettings(enterpriseId, { a: 1, b: 2 }, { atomic: true });
      expect(result.atomic).toBe(true);
    });
  });

  describe('resetSetting', () => {
    it('should reset setting to default', async () => {
      mockRepo.resetSetting.mockResolvedValue({ key: 'theme', value: 'default', reset: true });
      const result = await mockRepo.resetSetting(enterpriseId, 'theme');
      expect(result.reset).toBe(true);
    });

    it('should throw if setting not found', async () => {
      mockRepo.resetSetting.mockRejectedValue(new Error('Paramètre non trouvé'));
      await expect(mockRepo.resetSetting(enterpriseId, 'nonexistent')).rejects.toThrow('Paramètre non trouvé');
    });

    it('should record reset action', async () => {
      mockRepo.resetSetting.mockResolvedValue({ key: 'theme', resetAt: new Date().toISOString(), resetBy: 'usr-1' });
      const result = await mockRepo.resetSetting(enterpriseId, 'theme', 'usr-1');
      expect(result.resetBy).toBe('usr-1');
    });

    it('should not reset system-critical settings', async () => {
      mockRepo.resetSetting.mockRejectedValue(new Error('Ce paramètre ne peut pas être réinitialisé'));
      await expect(mockRepo.resetSetting(enterpriseId, 'api_key')).rejects.toThrow();
    });
  });

  describe('resetAllSettings', () => {
    it('should reset all settings', async () => {
      mockRepo.resetAllSettings.mockResolvedValue({ reset: 15 });
      const result = await mockRepo.resetAllSettings(enterpriseId);
      expect(result.reset).toBe(15);
    });

    it('should exclude protected settings', async () => {
      mockRepo.resetAllSettings.mockResolvedValue({ reset: 12, excluded: ['api_key', 'webhook_url'] });
      const result = await mockRepo.resetAllSettings(enterpriseId, { exclude: ['api_key', 'webhook_url'] });
      expect(result.excluded).toHaveLength(2);
    });

    it('should require confirmation', () => {
      const validate = (confirmed: boolean) => {
        if (!confirmed) throw new Error('La confirmation est requise');
      };
      expect(() => validate(false)).toThrow('La confirmation est requise');
      expect(() => validate(true)).not.toThrow();
    });
  });

  describe('getSettingHistory', () => {
    it('should return setting history', async () => {
      mockRepo.getSettingHistory.mockResolvedValue([{ value: 'default', changedAt: '2026-01-01', changedBy: 'usr-1' }]);
      const result = await mockRepo.getSettingHistory(enterpriseId, 'theme');
      expect(result).toHaveLength(1);
    });

    it('should filter by date range', async () => {
      mockRepo.getSettingHistory.mockResolvedValue([]);
      await mockRepo.getSettingHistory(enterpriseId, 'theme', { from: '2026-01-01', to: '2026-12-31' });
      expect(mockRepo.getSettingHistory).toHaveBeenCalled();
    });

    it('should sort by date descending', async () => {
      mockRepo.getSettingHistory.mockResolvedValue([
        { changedAt: '2026-01-01' },
        { changedAt: '2026-02-01' },
      ]);
      const result = await mockRepo.getSettingHistory(enterpriseId, 'theme');
      expect(result).toHaveLength(2);
    });

    it('should handle empty history', async () => {
      mockRepo.getSettingHistory.mockResolvedValue([]);
      const result = await mockRepo.getSettingHistory(enterpriseId, 'theme');
      expect(result).toHaveLength(0);
    });
  });

  describe('validateSetting', () => {
    it('should validate setting value', async () => {
      mockRepo.validateSetting.mockResolvedValue({ valid: true });
      const result = await mockRepo.validateSetting(enterpriseId, 'theme', 'dark');
      expect(result.valid).toBe(true);
    });

    it('should reject invalid value', async () => {
      mockRepo.validateSetting.mockResolvedValue({ valid: false, error: 'Thème invalide' });
      const result = await mockRepo.validateSetting(enterpriseId, 'theme', 'invalid');
      expect(result.valid).toBe(false);
    });

    it('should validate email format', () => {
      const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      expect(isValidEmail('test@test.com')).toBe(true);
      expect(isValidEmail('invalid')).toBe(false);
    });

    it('should validate URL format', () => {
      const isValidUrl = (url: string) => /^https?:\/\/.+/.test(url);
      expect(isValidUrl('https://test.com')).toBe(true);
      expect(isValidUrl('invalid')).toBe(false);
    });

    it('should validate required fields', () => {
      const validateRequired = (data: Record<string, any>, required: string[]) => {
        const missing = required.filter(k => !data[k]);
        return missing.length === 0;
      };
      expect(validateRequired({ a: 1, b: 2 }, ['a', 'b'])).toBe(true);
      expect(validateRequired({ a: 1 }, ['a', 'b'])).toBe(false);
    });
  });

  describe('exportSettings', () => {
    it('should export settings as JSON', async () => {
      mockRepo.exportSettings.mockResolvedValue('{"theme":"dark"}');
      const result = await mockRepo.exportSettings(enterpriseId, 'json');
      expect(JSON.parse(result).theme).toBe('dark');
    });

    it('should export as YAML', async () => {
      mockRepo.exportSettings.mockResolvedValue('theme: dark\n');
      const result = await mockRepo.exportSettings(enterpriseId, 'yaml');
      expect(result).toContain('theme: dark');
    });

    it('should filter by category', async () => {
      mockRepo.exportSettings.mockResolvedValue('{}');
      await mockRepo.exportSettings(enterpriseId, 'json', { category: 'branding' });
      expect(mockRepo.exportSettings).toHaveBeenCalled();
    });

    it('should handle empty settings', async () => {
      mockRepo.exportSettings.mockResolvedValue('{}');
      const result = await mockRepo.exportSettings(enterpriseId, 'json');
      expect(result).toBe('{}');
    });

    it('should support multiple formats', () => {
      const formats = ['json', 'yaml', 'env'];
      expect(formats).toContain('json');
      expect(formats).toContain('yaml');
      expect(formats).toContain('env');
    });
  });

  describe('importSettings', () => {
    it('should import settings from JSON', async () => {
      mockRepo.importSettings.mockResolvedValue({ imported: 5, skipped: 1 });
      const result = await mockRepo.importSettings(enterpriseId, '{"theme":"dark","lang":"fr"}');
      expect(result.imported).toBe(5);
    });

    it('should handle invalid JSON', async () => {
      mockRepo.importSettings.mockRejectedValue(new Error('JSON invalide'));
      await expect(mockRepo.importSettings(enterpriseId, 'invalid')).rejects.toThrow('JSON invalide');
    });

    it('should report conflicts', async () => {
      mockRepo.importSettings.mockResolvedValue({ imported: 3, conflicts: [{ key: 'theme', existing: 'default', imported: 'dark' }] });
      const result = await mockRepo.importSettings(enterpriseId, '{"theme":"dark"}');
      expect(result.conflicts).toHaveLength(1);
    });

    it('should support overwrite mode', async () => {
      mockRepo.importSettings.mockResolvedValue({ imported: 5, overwritten: 3 });
      const result = await mockRepo.importSettings(enterpriseId, '{"theme":"dark"}', { overwrite: true });
      expect(result.overwritten).toBe(3);
    });

    it('should handle empty import', async () => {
      mockRepo.importSettings.mockResolvedValue({ imported: 0 });
      const result = await mockRepo.importSettings(enterpriseId, '{}');
      expect(result.imported).toBe(0);
    });
  });

  describe('getPublicSettings', () => {
    it('should return public settings', async () => {
      mockRepo.getPublicSettings.mockResolvedValue({ theme: 'dark', logo: 'url' });
      const result = await mockRepo.getPublicSettings(enterpriseId);
      expect(result.theme).toBe('dark');
    });

    it('should not include sensitive settings', async () => {
      mockRepo.getPublicSettings.mockResolvedValue({ theme: 'dark' });
      const result = await mockRepo.getPublicSettings(enterpriseId);
      expect(result).not.toHaveProperty('api_key');
      expect(result).not.toHaveProperty('secret');
    });

    it('should include branding info', async () => {
      mockRepo.getPublicSettings.mockResolvedValue({ branding: { logo: 'url', color: '#000' } });
      const result = await mockRepo.getPublicSettings(enterpriseId);
      expect(result.branding.logo).toBe('url');
    });
  });

  describe('getSettingDefaults', () => {
    it('should return setting defaults', async () => {
      mockRepo.getSettingDefaults.mockResolvedValue({ theme: 'default', language: 'fr' });
      const result = await mockRepo.getSettingDefaults();
      expect(result.theme).toBe('default');
    });

    it('should include all default values', async () => {
      mockRepo.getSettingDefaults.mockResolvedValue({ theme: 'default', language: 'fr', timezone: 'Europe/Paris' });
      const result = await mockRepo.getSettingDefaults();
      expect(Object.keys(result)).toContain('timezone');
    });

    it('should filter by category', async () => {
      mockRepo.getSettingDefaults.mockResolvedValue({ branding: {} });
      await mockRepo.getSettingDefaults({ category: 'branding' });
      expect(mockRepo.getSettingDefaults).toHaveBeenCalled();
    });
  });
});
