import { describe, it, expect, vi, beforeEach } from 'vitest';
import { DataSecurityService } from '../data-security-service';
import { GestcrpNotFoundError, GestcrpValidationError, GestcrpDLPPolicyError } from '@educi/errors';

const mockDLPPoliciesRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
};

const mockDLPIncidentsRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
};

const mockEncryptionKeysRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
};

const mockRetentionPoliciesRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
};

const mockMaskingRulesRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
};

const mockDataSecurityRepo = {
  dlpPolicies: mockDLPPoliciesRepo,
  dlpIncidents: mockDLPIncidentsRepo,
  encryptionKeys: mockEncryptionKeysRepo,
  retentionPolicies: mockRetentionPoliciesRepo,
  maskingRules: mockMaskingRulesRepo,
  findActiveDLPPolicies: vi.fn(),
  findUnreviewedIncidents: vi.fn(),
  findActiveEncryptionKeys: vi.fn(),
};

const mockDLPPolicy = {
  id: 'dlp-001',
  school_id: 'sch-001',
  name: 'Credit Card Protection',
  description: 'Prevent credit card data from leaving the network',
  enabled: true,
  policy_type: 'CONTENT',
  data_classification: ['CONFIDENTIAL'],
  patterns: ['\\d{4}-\\d{4}-\\d{4}-\\d{4}'],
  actions: ['BLOCK', 'ALERT'],
  exclusions: [],
  severity: 'HIGH',
  notification_channels: ['email'],
  applies_to: 'ALL',
  created_at: new Date().toISOString(),
};

const mockEncryptionKey = {
  id: 'key-001',
  school_id: 'sch-001',
  name: 'Master Encryption Key',
  algorithm: 'AES-256',
  size: 256,
  purpose: 'ENCRYPTION' as const,
  status: 'ACTIVE' as const,
  fingerprint: 'abc123',
  public_key: 'public-key-data',
  encrypted_private_key: 'encrypted-private-key',
  key_version: 1,
  expires_at: new Date(Date.now() + 365 * 86400000).toISOString(),
  created_at: new Date().toISOString(),
};

let service: DataSecurityService;

beforeEach(() => {
  vi.clearAllMocks();
  service = new DataSecurityService(mockDataSecurityRepo as never);
});

describe('DataSecurityService', () => {
  describe('listDLPPolicies', () => {
    it('should list DLP policies', async () => {
      mockDLPPoliciesRepo.findAll.mockResolvedValue({ data: [mockDLPPolicy], total: 1 });

      const result = await service.listDLPPolicies('sch-001');

      expect(result.data).toHaveLength(1);
      expect(result.total).toBe(1);
    });

    it('should reject empty school_id', async () => {
      await expect(service.listDLPPolicies('')).rejects.toThrow(GestcrpValidationError);
    });
  });

  describe('getDLPPolicy', () => {
    it('should retrieve a DLP policy by id', async () => {
      mockDLPPoliciesRepo.exists.mockResolvedValue(true);
      mockDLPPoliciesRepo.findById.mockResolvedValue(mockDLPPolicy);

      const result = await service.getDLPPolicy('sch-001', 'dlp-001');

      expect(result).toEqual(mockDLPPolicy);
    });

    it('should throw if policy not found', async () => {
      mockDLPPoliciesRepo.exists.mockResolvedValue(false);

      await expect(service.getDLPPolicy('sch-001', 'nonexistent')).rejects.toThrow(GestcrpNotFoundError);
    });
  });

  describe('createDLPPolicy', () => {
    it('should create a DLP policy', async () => {
      mockDLPPoliciesRepo.findAll.mockResolvedValue({ data: [], total: 0 });
      mockDLPPoliciesRepo.create.mockResolvedValue(mockDLPPolicy);

      const result = await service.createDLPPolicy('sch-001', {
        name: 'Credit Card Protection',
        description: 'Prevent credit card data from leaving the network',
        policy_type: 'CONTENT_INSPECTION',
        policyType: 'CONTENT_INSPECTION',
        data_classification: ['CONFIDENTIAL'],
        dataClassification: ['CONFIDENTIAL'],
        patterns: [{
          name: 'Credit Card Pattern',
          type: 'CREDIT_CARD',
          pattern: '\\d{4}-\\d{4}-\\d{4}-\\d{4}',
          confidence: 90,
          description: 'Credit card number pattern',
        }],
        actions: ['BLOCK', 'NOTIFY'],
        severity: 'HIGH',
        applies_to: 'ALL',
        appliesTo: 'ALL',
      });

      expect(result).toEqual(mockDLPPolicy);
    });

    it('should reject duplicate policy name', async () => {
      mockDLPPoliciesRepo.findAll.mockResolvedValue({ data: [mockDLPPolicy], total: 1 });

      await expect(service.createDLPPolicy('sch-001', {
        name: 'Credit Card Protection',
        description: 'Test',
        policy_type: 'CONTENT_INSPECTION',
        policyType: 'CONTENT_INSPECTION',
        data_classification: ['CONFIDENTIAL'],
        dataClassification: ['CONFIDENTIAL'],
        patterns: [{
          name: 'Test Pattern',
          type: 'REGEX',
          pattern: '.*',
          confidence: 50,
          description: 'Test',
        }],
        actions: ['BLOCK'],
        severity: 'HIGH',
        applies_to: 'ALL',
        appliesTo: 'ALL',
      })).rejects.toThrow();
    });
  });

  describe('toggleDLPPolicy', () => {
    it('should toggle DLP policy enabled state', async () => {
      mockDLPPoliciesRepo.exists.mockResolvedValue(true);
      mockDLPPoliciesRepo.findById.mockResolvedValue(mockDLPPolicy);
      mockDLPPoliciesRepo.update.mockResolvedValue({ ...mockDLPPolicy, enabled: false });

      const result = await service.toggleDLPPolicy('sch-001', 'dlp-001', false);

      expect(result.enabled).toBe(false);
    });
  });

  describe('createDLPIncident', () => {
    it('should create a DLP incident', async () => {
      const mockIncident = {
        id: 'dlp-inc-001',
        school_id: 'sch-001',
        policy_id: 'dlp-001',
        user_id: 'user-001',
        action: 'EMAIL',
        data_classification: 'CONFIDENTIAL',
        source: 'email-client',
        destination: 'external',
        content_preview: 'Credit card data detected',
        blocked: false,
      };
      mockDLPPoliciesRepo.exists.mockResolvedValue(true);
      mockDLPIncidentsRepo.create.mockResolvedValue(mockIncident);

      const result = await service.createDLPIncident('sch-001', {
        policy_id: 'dlp-001',
        user_id: 'user-001',
        action: 'EMAIL',
        data_classification: 'CONFIDENTIAL',
        source: 'email-client',
        destination: 'external',
        content_preview: 'Credit card data detected',
      });

      expect(result).toEqual(mockIncident);
    });

    it('should reject non-existent policy', async () => {
      mockDLPPoliciesRepo.exists.mockResolvedValue(false);

      await expect(service.createDLPIncident('sch-001', {
        policy_id: 'nonexistent',
        user_id: 'user-001',
        action: 'EMAIL',
        data_classification: 'CONFIDENTIAL',
        source: 'email',
        destination: 'external',
        content_preview: 'test',
      })).rejects.toThrow(GestcrpDLPPolicyError);
    });
  });

  describe('reviewDLPIncident', () => {
    it('should review a DLP incident', async () => {
      const mockIncident = { id: 'dlp-inc-001', school_id: 'sch-001', reviewed_by: undefined };
      mockDLPIncidentsRepo.exists.mockResolvedValue(true);
      mockDLPIncidentsRepo.findById.mockResolvedValue(mockIncident);
      mockDLPIncidentsRepo.update.mockResolvedValue({ ...mockIncident, reviewed_by: 'reviewer-001', disposition: 'TRUE_POSITIVE' });

      const result = await service.reviewDLPIncident('sch-001', 'dlp-inc-001', 'reviewer-001', 'TRUE_POSITIVE');

      expect(result.reviewed_by).toBe('reviewer-001');
      expect(result.disposition).toBe('TRUE_POSITIVE');
    });

    it('should reject reviewing already reviewed incident', async () => {
      mockDLPIncidentsRepo.exists.mockResolvedValue(true);
      mockDLPIncidentsRepo.findById.mockResolvedValue({ id: 'dlp-inc-001', reviewed_by: 'reviewer-001' });

      await expect(service.reviewDLPIncident('sch-001', 'dlp-inc-001', 'reviewer-002', 'TRUE_POSITIVE')).rejects.toThrow();
    });
  });

  describe('createEncryptionKey', () => {
    it('should create an encryption key', async () => {
      mockEncryptionKeysRepo.findAll.mockResolvedValue({ data: [], total: 0 });
      mockEncryptionKeysRepo.create.mockResolvedValue(mockEncryptionKey);

      const result = await service.createEncryptionKey('sch-001', {
        name: 'Master Encryption Key',
        algorithm: 'AES-256',
        size: 256,
        purpose: 'ENCRYPTION',
        fingerprint: 'abc123',
        encrypted_private_key: 'encrypted-private-key',
      });

      expect(result).toEqual(mockEncryptionKey);
    });

    it('should reject duplicate key name', async () => {
      mockEncryptionKeysRepo.findAll.mockResolvedValue({ data: [mockEncryptionKey], total: 1 });

      await expect(service.createEncryptionKey('sch-001', {
        name: 'Master Encryption Key',
        algorithm: 'AES-256',
        size: 256,
        purpose: 'ENCRYPTION',
        fingerprint: 'abc123',
        encrypted_private_key: 'encrypted',
      })).rejects.toThrow();
    });

    it('should reject invalid purpose', async () => {
      await expect(service.createEncryptionKey('sch-001', {
        name: 'Test Key',
        algorithm: 'AES-256',
        size: 256,
        purpose: 'INVALID',
        fingerprint: 'abc',
        encrypted_private_key: 'encrypted',
      })).rejects.toThrow(GestcrpValidationError);
    });
  });

  describe('rotateEncryptionKey', () => {
    it('should rotate an active key', async () => {
      mockEncryptionKeysRepo.exists.mockResolvedValue(true);
      mockEncryptionKeysRepo.findById.mockResolvedValue(mockEncryptionKey);
      mockEncryptionKeysRepo.update.mockResolvedValue({ ...mockEncryptionKey, key_version: 2 });

      const result = await service.rotateEncryptionKey('sch-001', 'key-001');

      expect(result.key_version).toBe(2);
    });

    it('should reject rotating a revoked key', async () => {
      mockEncryptionKeysRepo.exists.mockResolvedValue(true);
      mockEncryptionKeysRepo.findById.mockResolvedValue({ ...mockEncryptionKey, status: 'REVOKED' });

      await expect(service.rotateEncryptionKey('sch-001', 'key-001')).rejects.toThrow();
    });
  });

  describe('revokeEncryptionKey', () => {
    it('should revoke an encryption key', async () => {
      mockEncryptionKeysRepo.exists.mockResolvedValue(true);
      mockEncryptionKeysRepo.findById.mockResolvedValue(mockEncryptionKey);
      mockEncryptionKeysRepo.update.mockResolvedValue({ ...mockEncryptionKey, status: 'REVOKED' });

      const result = await service.revokeEncryptionKey('sch-001', 'key-001');

      expect(result.status).toBe('REVOKED');
    });
  });

  describe('createRetentionPolicy', () => {
    it('should create a retention policy', async () => {
      const mockRetentionPolicy = {
        id: 'ret-001',
        school_id: 'sch-001',
        name: 'Student Data Retention',
        description: 'Retain student data for 7 years',
        retention_days: 2555,
        deletion_method: 'SECURE_DELETE',
      };
      mockRetentionPoliciesRepo.findAll.mockResolvedValue({ data: [], total: 0 });
      mockRetentionPoliciesRepo.create.mockResolvedValue(mockRetentionPolicy);

      const result = await service.createRetentionPolicy('sch-001', {
        name: 'Student Data Retention',
        description: 'Retain student data for 7 years',
        data_classification: ['CONFIDENTIAL'],
        retention_days: 2555,
        deletion_method: 'SECURE_DELETE',
      });

      expect(result).toEqual(mockRetentionPolicy);
    });
  });

  describe('createMaskingRule', () => {
    it('should create a masking rule', async () => {
      const mockMaskingRule = {
        id: 'mask-001',
        school_id: 'sch-001',
        name: 'Credit Card Masking',
        description: 'Mask credit card numbers',
        masking_type: 'PARTIAL',
        field_patterns: ['credit_card'],
      };
      mockMaskingRulesRepo.findAll.mockResolvedValue({ data: [], total: 0 });
      mockMaskingRulesRepo.create.mockResolvedValue(mockMaskingRule);

      const result = await service.createMaskingRule('sch-001', {
        name: 'Credit Card Masking',
        description: 'Mask credit card numbers',
        field_patterns: ['credit_card'],
        masking_type: 'PARTIAL',
        applies_to: ['database'],
      });

      expect(result).toEqual(mockMaskingRule);
    });
  });

  describe('getDLPStats', () => {
    it('should return DLP statistics', async () => {
      mockDLPPoliciesRepo.findAll.mockResolvedValue({ data: [mockDLPPolicy], total: 1 });
      mockDLPIncidentsRepo.findAll.mockResolvedValue({ data: [], total: 0 });

      const result = await service.getDLPStats('sch-001');

      expect(result.totalPolicies).toBe(1);
      expect(result.activePolicies).toBeDefined();
      expect(result.totalIncidents).toBeDefined();
    });
  });

  describe('getEncryptionKeyStats', () => {
    it('should return encryption key statistics', async () => {
      mockEncryptionKeysRepo.findAll.mockResolvedValue({
        data: [mockEncryptionKey, { ...mockEncryptionKey, id: 'key-002', status: 'REVOKED' }],
        total: 2,
      });

      const result = await service.getEncryptionKeyStats('sch-001');

      expect(result.total).toBe(2);
      expect(result.active).toBeDefined();
      expect(result.revoked).toBeDefined();
    });
  });
});
