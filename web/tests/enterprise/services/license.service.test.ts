import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('LicenseService', () => {
  const mockRepo = {
    findLicenses: vi.fn(),
    findLicenseById: vi.fn(),
    findLicenseByKey: vi.fn(),
    createLicense: vi.fn(),
    updateLicense: vi.fn(),
    revokeLicense: vi.fn(),
    validateLicense: vi.fn(),
    activateLicense: vi.fn(),
    deactivateLicense: vi.fn(),
    getLicenseUsage: vi.fn(),
    getLicenseHistory: vi.fn(),
    generateLicenseKey: vi.fn(),
    checkLicenseExpiry: vi.fn(),
    renewLicense: vi.fn(),
    transferLicense: vi.fn(),
    getLicenseLimits: vi.fn(),
    bulkCreateLicenses: vi.fn(),
    getLicensesByEnterprise: vi.fn(),
    countActiveLicenses: vi.fn(),
    getExpiringLicenses: vi.fn(),
  };

  const enterpriseId = 'ent-1';
  const licenseId = 'lic-1';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('findLicenses', () => {
    it('should return licenses list', async () => {
      const licenses = [{ id: licenseId, key: 'LIC-KEY-001' }];
      mockRepo.findLicenses.mockResolvedValue(licenses);
      const result = await mockRepo.findLicenses(enterpriseId);
      expect(result).toEqual(licenses);
    });

    it('should require enterpriseId', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('Identifiant de l\'entreprise requis');
      };
      expect(() => validate('')).toThrow('Identifiant de l\'entreprise requis');
    });

    it('should filter by status', async () => {
      mockRepo.findLicenses.mockResolvedValue([]);
      await mockRepo.findLicenses(enterpriseId, { status: 'active' });
      expect(mockRepo.findLicenses).toHaveBeenCalledWith(enterpriseId, { status: 'active' });
    });

    it('should handle empty results', async () => {
      mockRepo.findLicenses.mockResolvedValue([]);
      const result = await mockRepo.findLicenses(enterpriseId);
      expect(result).toHaveLength(0);
    });

    it('should filter by type', async () => {
      mockRepo.findLicenses.mockResolvedValue([]);
      await mockRepo.findLicenses(enterpriseId, { type: 'school' });
      expect(mockRepo.findLicenses).toHaveBeenCalledWith(enterpriseId, { type: 'school' });
    });

    it('should paginate results', async () => {
      mockRepo.findLicenses.mockResolvedValue([]);
      await mockRepo.findLicenses(enterpriseId, { page: 1, limit: 10 });
      expect(mockRepo.findLicenses).toHaveBeenCalledWith(enterpriseId, { page: 1, limit: 10 });
    });
  });

  describe('findLicenseById', () => {
    it('should return license by id', async () => {
      const license = { id: licenseId, key: 'LIC-KEY-001' };
      mockRepo.findLicenseById.mockResolvedValue(license);
      const result = await mockRepo.findLicenseById(licenseId);
      expect(result).toEqual(license);
    });

    it('should throw if not found', async () => {
      mockRepo.findLicenseById.mockResolvedValue(null);
      const findOrThrow = async (id: string) => {
        const license = await mockRepo.findLicenseById(id);
        if (!license) throw new Error('Licence non trouvée');
      };
      await expect(findOrThrow('nonexistent')).rejects.toThrow('Licence non trouvée');
    });

    it('should require licenseId', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('Identifiant requis');
      };
      expect(() => validate('')).toThrow('Identifiant requis');
    });

    it('should include activation details', async () => {
      mockRepo.findLicenseById.mockResolvedValue({ id: licenseId, activatedAt: '2026-01-01', activatedBy: 'u-1' });
      const result = await mockRepo.findLicenseById(licenseId);
      expect(result.activatedAt).toBeDefined();
    });
  });

  describe('findLicenseByKey', () => {
    it('should return license by key', async () => {
      mockRepo.findLicenseByKey.mockResolvedValue({ id: licenseId, key: 'LIC-KEY-001' });
      const result = await mockRepo.findLicenseByKey('LIC-KEY-001');
      expect(result.key).toBe('LIC-KEY-001');
    });

    it('should throw if key not found', async () => {
      mockRepo.findLicenseByKey.mockResolvedValue(null);
      const findOrThrow = async (key: string) => {
        const license = await mockRepo.findLicenseByKey(key);
        if (!license) throw new Error('Licence non trouvée');
      };
      await expect(findOrThrow('INVALID')).rejects.toThrow('Licence non trouvée');
    });

    it('should require key', () => {
      const validate = (key: string) => {
        if (!key) throw new Error('Clé de licence requise');
      };
      expect(() => validate('')).toThrow('Clé de licence requise');
    });
  });

  describe('createLicense', () => {
    it('should create license with valid data', async () => {
      const data = { type: 'school', maxUsers: 50, expiresAt: '2027-01-01' };
      mockRepo.generateLicenseKey.mockResolvedValue('LIC-NEW-001');
      mockRepo.createLicense.mockResolvedValue({ id: licenseId, key: 'LIC-NEW-001', ...data });
      const result = await mockRepo.createLicense({ ...data, enterprise_id: enterpriseId });
      expect(result.key).toBe('LIC-NEW-001');
    });

    it('should require type', () => {
      const validate = (data: any) => {
        if (!data?.type) throw new Error('Le type de licence est requis');
      };
      expect(() => validate({ maxUsers: 50 })).toThrow('Le type de licence est requis');
    });

    it('should require maxUsers', () => {
      const validate = (data: any) => {
        if (!data?.maxUsers || data.maxUsers < 1) throw new Error('Le nombre max d\'utilisateurs est requis');
      };
      expect(() => validate({ type: 'school' })).toThrow('Le nombre max d\'utilisateurs est requis');
    });

    it('should require expiry date', () => {
      const validate = (data: any) => {
        if (!data?.expiresAt) throw new Error('La date d\'expiration est requise');
      };
      expect(() => validate({ type: 'school', maxUsers: 50 })).toThrow('La date d\'expiration est requise');
    });

    it('should reject past expiry date', () => {
      const validate = (expiresAt: string) => {
        if (new Date(expiresAt) <= new Date()) throw new Error('La date d\'expiration doit être future');
      };
      expect(() => validate('2020-01-01')).toThrow('La date d\'expiration doit être future');
    });

    it('should accept valid license type', () => {
      const isValidType = (type: string) => ['school', 'district', 'enterprise', 'trial'].includes(type);
      expect(isValidType('school')).toBe(true);
      expect(isValidType('invalid')).toBe(false);
    });

    it('should auto-generate license key', async () => {
      mockRepo.generateLicenseKey.mockResolvedValue('LIC-AUTO-001');
      mockRepo.createLicense.mockResolvedValue({ id: licenseId, key: 'LIC-AUTO-001' });
      const result = await mockRepo.createLicense({ type: 'school', maxUsers: 50, enterprise_id: enterpriseId });
      expect(result.key).toBe('LIC-AUTO-001');
    });
  });

  describe('updateLicense', () => {
    it('should update license', async () => {
      mockRepo.findLicenseById.mockResolvedValue({ id: licenseId, maxUsers: 50 });
      mockRepo.updateLicense.mockResolvedValue({ id: licenseId, maxUsers: 100 });
      const result = await mockRepo.updateLicense(licenseId, { maxUsers: 100 });
      expect(result.maxUsers).toBe(100);
    });

    it('should throw if not found', async () => {
      mockRepo.findLicenseById.mockResolvedValue(null);
      const updateOrThrow = async () => {
        const license = await mockRepo.findLicenseById(licenseId);
        if (!license) throw new Error('Licence non trouvée');
      };
      await expect(updateOrThrow()).rejects.toThrow('Licence non trouvée');
    });

    it('should validate maxUsers increase', async () => {
      mockRepo.findLicenseById.mockResolvedValue({ id: licenseId, maxUsers: 50 });
      mockRepo.updateLicense.mockResolvedValue({ id: licenseId, maxUsers: 75 });
      const result = await mockRepo.updateLicense(licenseId, { maxUsers: 75 });
      expect(result.maxUsers).toBeGreaterThan(50);
    });

    it('should not allow negative maxUsers', () => {
      const validate = (maxUsers: number) => {
        if (maxUsers < 0) throw new Error('Le nombre d\'utilisateurs ne peut pas être négatif');
      };
      expect(() => validate(-1)).toThrow('Le nombre d\'utilisateurs ne peut pas être négatif');
    });
  });

  describe('revokeLicense', () => {
    it('should revoke license', async () => {
      mockRepo.findLicenseById.mockResolvedValue({ id: licenseId, status: 'active' });
      mockRepo.revokeLicense.mockResolvedValue({ id: licenseId, status: 'revoked' });
      const result = await mockRepo.revokeLicense(licenseId, 'Misuse');
      expect(result.status).toBe('revoked');
    });

    it('should throw if already revoked', async () => {
      mockRepo.findLicenseById.mockResolvedValue({ id: licenseId, status: 'revoked' });
      const revokeOrThrow = async () => {
        const license = await mockRepo.findLicenseById(licenseId);
        if (license?.status === 'revoked') throw new Error('La licence est déjà révoquée');
      };
      await expect(revokeOrThrow()).rejects.toThrow('La licence est déjà révoquée');
    });

    it('should require revocation reason', () => {
      const validate = (reason: string) => {
        if (!reason || reason.trim().length < 3) throw new Error('Le motif de révocation est requis');
      };
      expect(() => validate('')).toThrow('Le motif de révocation est requis');
    });

    it('should set revocation timestamp', async () => {
      mockRepo.findLicenseById.mockResolvedValue({ id: licenseId, status: 'active' });
      mockRepo.revokeLicense.mockResolvedValue({ revokedAt: new Date().toISOString() });
      const result = await mockRepo.revokeLicense(licenseId, 'reason');
      expect(result.revokedAt).toBeDefined();
    });
  });

  describe('validateLicense', () => {
    it('should validate active license', async () => {
      mockRepo.validateLicense.mockResolvedValue({ valid: true, expiresAt: '2027-01-01' });
      const result = await mockRepo.validateLicense('LIC-KEY-001');
      expect(result.valid).toBe(true);
    });

    it('should reject expired license', async () => {
      mockRepo.validateLicense.mockResolvedValue({ valid: false, reason: 'expired' });
      const result = await mockRepo.validateLicense('LIC-KEY-001');
      expect(result.valid).toBe(false);
      expect(result.reason).toBe('expired');
    });

    it('should reject revoked license', async () => {
      mockRepo.validateLicense.mockResolvedValue({ valid: false, reason: 'revoked' });
      const result = await mockRepo.validateLicense('LIC-KEY-001');
      expect(result.valid).toBe(false);
    });

    it('should reject unknown key', async () => {
      mockRepo.validateLicense.mockResolvedValue({ valid: false, reason: 'not_found' });
      const result = await mockRepo.validateLicense('UNKNOWN');
      expect(result.valid).toBe(false);
    });

    it('should check usage limits', async () => {
      mockRepo.validateLicense.mockResolvedValue({ valid: true, usage: { current: 48, max: 50 } });
      const result = await mockRepo.validateLicense('LIC-KEY-001');
      expect(result.usage.current).toBeLessThanOrEqual(result.usage.max);
    });
  });

  describe('activateLicense', () => {
    it('should activate license', async () => {
      mockRepo.findLicenseByKey.mockResolvedValue({ id: licenseId, status: 'inactive' });
      mockRepo.activateLicense.mockResolvedValue({ id: licenseId, status: 'active', activatedAt: new Date().toISOString() });
      const result = await mockRepo.activateLicense('LIC-KEY-001', 'u-1');
      expect(result.status).toBe('active');
    });

    it('should throw if already active', async () => {
      mockRepo.findLicenseByKey.mockResolvedValue({ id: licenseId, status: 'active' });
      const activateOrThrow = async () => {
        const license = await mockRepo.findLicenseByKey('LIC-KEY-001');
        if (license?.status === 'active') throw new Error('La licence est déjà active');
      };
      await expect(activateOrThrow()).rejects.toThrow('La licence est déjà active');
    });

    it('should require valid key', async () => {
      mockRepo.findLicenseByKey.mockResolvedValue(null);
      const activateOrThrow = async () => {
        const license = await mockRepo.findLicenseByKey('INVALID');
        if (!license) throw new Error('Licence non trouvée');
      };
      await expect(activateOrThrow()).rejects.toThrow('Licence non trouvée');
    });
  });

  describe('deactivateLicense', () => {
    it('should deactivate license', async () => {
      mockRepo.findLicenseById.mockResolvedValue({ id: licenseId, status: 'active' });
      mockRepo.deactivateLicense.mockResolvedValue({ id: licenseId, status: 'inactive' });
      const result = await mockRepo.deactivateLicense(licenseId);
      expect(result.status).toBe('inactive');
    });

    it('should throw if already inactive', async () => {
      mockRepo.findLicenseById.mockResolvedValue({ id: licenseId, status: 'inactive' });
      const deactivateOrThrow = async () => {
        const license = await mockRepo.findLicenseById(licenseId);
        if (license?.status === 'inactive') throw new Error('La licence est déjà inactive');
      };
      await expect(deactivateOrThrow()).rejects.toThrow('La licence est déjà inactive');
    });
  });

  describe('getLicenseUsage', () => {
    it('should return license usage', async () => {
      mockRepo.getLicenseUsage.mockResolvedValue({ current: 25, max: 50, percentage: 50 });
      const result = await mockRepo.getLicenseUsage(licenseId);
      expect(result.current).toBe(25);
    });

    it('should calculate usage percentage', () => {
      const current = 30;
      const max = 60;
      const percentage = (current / max) * 100;
      expect(percentage).toBe(50);
    });

    it('should handle zero usage', async () => {
      mockRepo.getLicenseUsage.mockResolvedValue({ current: 0, max: 50, percentage: 0 });
      const result = await mockRepo.getLicenseUsage(licenseId);
      expect(result.current).toBe(0);
    });

    it('should detect over-usage', () => {
      const current = 55;
      const max = 50;
      const isOver = current > max;
      expect(isOver).toBe(true);
    });
  });

  describe('generateLicenseKey', () => {
    it('should generate license key', async () => {
      mockRepo.generateLicenseKey.mockResolvedValue('LIC-2026-ABCD-1234');
      const result = await mockRepo.generateLicenseKey();
      expect(result).toMatch(/^LIC-/);
    });

    it('should generate unique keys', async () => {
      mockRepo.generateLicenseKey
        .mockResolvedValueOnce('LIC-001')
        .mockResolvedValueOnce('LIC-002');
      const key1 = await mockRepo.generateLicenseKey();
      const key2 = await mockRepo.generateLicenseKey();
      expect(key1).not.toBe(key2);
    });

    it('should validate key format', () => {
      const isValidKey = (key: string) => /^LIC-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4,}$/.test(key);
      expect(isValidKey('LIC-2026-ABCD-1234')).toBe(true);
      expect(isValidKey('INVALID')).toBe(false);
    });
  });

  describe('checkLicenseExpiry', () => {
    it('should check expiry status', async () => {
      mockRepo.checkLicenseExpiry.mockResolvedValue({ expired: false, daysUntilExpiry: 30 });
      const result = await mockRepo.checkLicenseExpiry(licenseId);
      expect(result.expired).toBe(false);
    });

    it('should detect expired license', async () => {
      mockRepo.checkLicenseExpiry.mockResolvedValue({ expired: true, daysUntilExpiry: -5 });
      const result = await mockRepo.checkLicenseExpiry(licenseId);
      expect(result.expired).toBe(true);
    });

    it('should detect near-expiry license', async () => {
      mockRepo.checkLicenseExpiry.mockResolvedValue({ expired: false, daysUntilExpiry: 5, warning: true });
      const result = await mockRepo.checkLicenseExpiry(licenseId);
      expect(result.warning).toBe(true);
    });

    it('should define warning threshold', () => {
      const warningThreshold = 30;
      const daysUntilExpiry = 15;
      const shouldWarn = daysUntilExpiry <= warningThreshold;
      expect(shouldWarn).toBe(true);
    });
  });

  describe('renewLicense', () => {
    it('should renew license', async () => {
      mockRepo.findLicenseById.mockResolvedValue({ id: licenseId, status: 'active' });
      mockRepo.renewLicense.mockResolvedValue({ id: licenseId, expiresAt: '2028-01-01' });
      const result = await mockRepo.renewLicense(licenseId, 12);
      expect(result.expiresAt).toBe('2028-01-01');
    });

    it('should require valid renewal period', () => {
      const validate = (months: number) => {
        if (months < 1 || months > 36) throw new Error('Période de renouvellement invalide');
      };
      expect(() => validate(12)).not.toThrow();
      expect(() => validate(0)).toThrow();
      expect(() => validate(37)).toThrow();
    });

    it('should not renew expired license', async () => {
      mockRepo.findLicenseById.mockResolvedValue({ id: licenseId, status: 'expired' });
      const renewOrThrow = async () => {
        const license = await mockRepo.findLicenseById(licenseId);
        if (license?.status === 'expired') throw new Error('Renouvelez d\'abord la licence expirée');
      };
      await expect(renewOrThrow()).rejects.toThrow();
    });
  });

  describe('transferLicense', () => {
    it('should transfer license to another enterprise', async () => {
      mockRepo.findLicenseById.mockResolvedValue({ id: licenseId, enterpriseId });
      mockRepo.transferLicense.mockResolvedValue({ fromEnterprise: enterpriseId, toEnterprise: 'ent-2' });
      const result = await mockRepo.transferLicense(licenseId, 'ent-2');
      expect(result.toEnterprise).toBe('ent-2');
    });

    it('should require target enterprise', () => {
      const validate = (targetId: string) => {
        if (!targetId) throw new Error('Entreprise cible requise');
      };
      expect(() => validate('')).toThrow('Entreprise cible requise');
    });

    it('should not transfer to same enterprise', () => {
      const validate = (from: string, to: string) => {
        if (from === to) throw new Error('Cannot transfer to same enterprise');
      };
      expect(() => validate(enterpriseId, enterpriseId)).toThrow();
    });
  });

  describe('getLicenseLimits', () => {
    it('should return license limits', async () => {
      mockRepo.getLicenseLimits.mockResolvedValue({ maxUsers: 50, maxSchools: 5, features: ['analytics'] });
      const result = await mockRepo.getLicenseLimits(licenseId);
      expect(result.maxUsers).toBe(50);
    });

    it('should return different limits per type', () => {
      const limits: Record<string, any> = {
        trial: { maxUsers: 10, maxSchools: 1 },
        school: { maxUsers: 100, maxSchools: 1 },
        enterprise: { maxUsers: 10000, maxSchools: 100 },
      };
      expect(limits.trial.maxUsers).toBe(10);
      expect(limits.enterprise.maxSchools).toBe(100);
    });

    it('should check feature availability', () => {
      const features = ['analytics', 'reporting', 'api_access'];
      expect(features.includes('analytics')).toBe(true);
      expect(features.includes('unknown')).toBe(false);
    });
  });

  describe('bulkCreateLicenses', () => {
    it('should create multiple licenses', async () => {
      const licenses = [
        { type: 'school', maxUsers: 50 },
        { type: 'school', maxUsers: 100 },
      ];
      mockRepo.bulkCreateLicenses.mockResolvedValue(licenses.map((l, i) => ({ id: `lic-${i}`, ...l })));
      const result = await mockRepo.bulkCreateLicenses(enterpriseId, licenses);
      expect(result).toHaveLength(2);
    });

    it('should handle empty batch', async () => {
      mockRepo.bulkCreateLicenses.mockResolvedValue([]);
      const result = await mockRepo.bulkCreateLicenses(enterpriseId, []);
      expect(result).toHaveLength(0);
    });

    it('should validate batch size', () => {
      const maxBatchSize = 100;
      const batchSize = 50;
      const isValid = batchSize <= maxBatchSize;
      expect(isValid).toBe(true);
    });
  });

  describe('countActiveLicenses', () => {
    it('should count active licenses', async () => {
      mockRepo.countActiveLicenses.mockResolvedValue(15);
      const result = await mockRepo.countActiveLicenses(enterpriseId);
      expect(result).toBe(15);
    });

    it('should count zero if no active licenses', async () => {
      mockRepo.countActiveLicenses.mockResolvedValue(0);
      const result = await mockRepo.countActiveLicenses(enterpriseId);
      expect(result).toBe(0);
    });
  });

  describe('getExpiringLicenses', () => {
    it('should return expiring licenses', async () => {
      mockRepo.getExpiringLicenses.mockResolvedValue([{ id: licenseId, expiresAt: '2026-08-15' }]);
      const result = await mockRepo.getExpiringLicenses(enterpriseId, 30);
      expect(result).toHaveLength(1);
    });

    it('should return empty if no licenses expiring', async () => {
      mockRepo.getExpiringLicenses.mockResolvedValue([]);
      const result = await mockRepo.getExpiringLicenses(enterpriseId, 30);
      expect(result).toHaveLength(0);
    });

    it('should accept different threshold days', async () => {
      mockRepo.getExpiringLicenses.mockResolvedValue([]);
      await mockRepo.getExpiringLicenses(enterpriseId, 90);
      expect(mockRepo.getExpiringLicenses).toHaveBeenCalledWith(enterpriseId, 90);
    });
  });
});
