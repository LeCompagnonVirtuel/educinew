import { describe, it, expect, vi, beforeEach } from 'vitest';
import { IAMService } from '../iam-service';
import { GestcrpNotFoundError, GestcrpValidationError } from '@educi/errors';

const mockPoliciesRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
};

const mockEventsRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
};

const mockSessionsRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
};

const mockCredentialRotationsRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
};

const mockBiometricCredentialsRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
};

const mockIAMRepo = {
  policies: mockPoliciesRepo,
  events: mockEventsRepo,
  sessions: mockSessionsRepo,
  credentialRotations: mockCredentialRotationsRepo,
  biometricCredentials: mockBiometricCredentialsRepo,
  findByUserId: vi.fn(),
  findActiveSessions: vi.fn(),
};

const mockPolicy = {
  id: 'pol-001',
  school_id: 'sch-001',
  name: 'Admin Policy',
  description: 'Full admin access',
  enabled: true,
  effect: 'ALLOW' as const,
  subjects: ['admin'],
  resources: ['*'],
  actions: ['*'],
  conditions: [],
  priority: 10,
  created_at: new Date().toISOString(),
};

const mockSession = {
  id: 'sess-001',
  school_id: 'sch-001',
  user_id: 'user-001',
  token_hash: 'hash-001',
  auth_method: 'PASSWORD',
  ip_address: '192.168.1.1',
  active: true,
  expires_at: new Date(Date.now() + 86400000).toISOString(),
  risk_score: 10,
  created_at: new Date().toISOString(),
};

let service: IAMService;

beforeEach(() => {
  vi.clearAllMocks();
  service = new IAMService(mockIAMRepo as never);
});

describe('IAMService', () => {
  describe('listPolicies', () => {
    it('should list policies for a school', async () => {
      mockPoliciesRepo.findAll.mockResolvedValue({ data: [mockPolicy], total: 1 });

      const result = await service.listPolicies('sch-001');

      expect(result.data).toHaveLength(1);
      expect(result.total).toBe(1);
    });

    it('should reject empty school_id', async () => {
      await expect(service.listPolicies('')).rejects.toThrow(GestcrpValidationError);
    });
  });

  describe('getPolicy', () => {
    it('should retrieve a policy by id', async () => {
      mockPoliciesRepo.exists.mockResolvedValue(true);
      mockPoliciesRepo.findById.mockResolvedValue(mockPolicy);

      const result = await service.getPolicy('sch-001', 'pol-001');

      expect(result).toEqual(mockPolicy);
    });

    it('should throw if policy not found', async () => {
      mockPoliciesRepo.exists.mockResolvedValue(false);

      await expect(service.getPolicy('sch-001', 'nonexistent')).rejects.toThrow(GestcrpNotFoundError);
    });
  });

  describe('createPolicy', () => {
    it('should create a policy successfully', async () => {
      mockPoliciesRepo.findAll.mockResolvedValue({ data: [], total: 0 });
      mockPoliciesRepo.create.mockResolvedValue(mockPolicy);

      const result = await service.createPolicy('sch-001', {
        name: 'Admin Policy',
        description: 'Full admin access',
        effect: 'ALLOW',
        subjects: ['admin'],
        resources: ['*'],
        actions: ['*'],
      });

      expect(result).toEqual(mockPolicy);
    });

    it('should reject duplicate policy name', async () => {
      mockPoliciesRepo.findAll.mockResolvedValue({ data: [mockPolicy], total: 1 });

      await expect(service.createPolicy('sch-001', {
        name: 'Admin Policy',
        description: 'Full admin access',
        effect: 'ALLOW',
        subjects: ['admin'],
        resources: ['*'],
        actions: ['*'],
      })).rejects.toThrow();
    });

    it('should reject invalid effect', async () => {
      await expect(service.createPolicy('sch-001', {
        name: 'Test',
        description: 'Test',
        effect: 'INVALID',
        subjects: ['admin'],
        resources: ['*'],
        actions: ['*'],
      })).rejects.toThrow(GestcrpValidationError);
    });
  });

  describe('updatePolicy', () => {
    it('should update a policy', async () => {
      mockPoliciesRepo.exists.mockResolvedValue(true);
      mockPoliciesRepo.findById.mockResolvedValue(mockPolicy);
      mockPoliciesRepo.update.mockResolvedValue({ ...mockPolicy, name: 'Updated' });

      const result = await service.updatePolicy('sch-001', 'pol-001', { name: 'Updated' });

      expect(result.name).toBe('Updated');
    });
  });

  describe('deletePolicy', () => {
    it('should soft delete a policy', async () => {
      mockPoliciesRepo.exists.mockResolvedValue(true);
      mockPoliciesRepo.findById.mockResolvedValue(mockPolicy);
      mockPoliciesRepo.softDelete.mockResolvedValue(undefined);

      await service.deletePolicy('sch-001', 'pol-001');

      expect(mockPoliciesRepo.softDelete).toHaveBeenCalledWith('pol-001', 'sch-001');
    });
  });

  describe('togglePolicy', () => {
    it('should toggle policy enabled state', async () => {
      mockPoliciesRepo.exists.mockResolvedValue(true);
      mockPoliciesRepo.findById.mockResolvedValue(mockPolicy);
      mockPoliciesRepo.update.mockResolvedValue({ ...mockPolicy, enabled: false });

      const result = await service.togglePolicy('sch-001', 'pol-001', false);

      expect(result.enabled).toBe(false);
    });
  });

  describe('createEvent', () => {
    it('should create an IAM event', async () => {
      const mockEvent = {
        id: 'evt-001',
        school_id: 'sch-001',
        user_id: 'user-001',
        event_type: 'LOGIN',
        auth_method: 'PASSWORD',
        ip_address: '192.168.1.1',
        success: true,
      };
      mockEventsRepo.create.mockResolvedValue(mockEvent);

      const result = await service.createEvent('sch-001', {
        user_id: 'user-001',
        event_type: 'LOGIN',
        auth_method: 'PASSWORD',
        ip_address: '192.168.1.1',
        success: true,
      });

      expect(result).toEqual(mockEvent);
    });

    it('should reject missing required fields', async () => {
      await expect(service.createEvent('sch-001', {
        user_id: 'user-001',
      })).rejects.toThrow(GestcrpValidationError);
    });
  });

  describe('createSession', () => {
    it('should create a session', async () => {
      mockSessionsRepo.create.mockResolvedValue(mockSession);

      const result = await service.createSession('sch-001', {
        user_id: 'user-001',
        token_hash: 'hash-001',
        auth_method: 'PASSWORD',
        ip_address: '192.168.1.1',
      });

      expect(result).toEqual(mockSession);
    });
  });

  describe('invalidateSession', () => {
    it('should invalidate a session', async () => {
      mockSessionsRepo.exists.mockResolvedValue(true);
      mockSessionsRepo.findById.mockResolvedValue(mockSession);
      mockSessionsRepo.update.mockResolvedValue({ ...mockSession, active: false });

      const result = await service.invalidateSession('sch-001', 'sess-001');

      expect(result.active).toBe(false);
    });
  });

  describe('invalidateAllUserSessions', () => {
    it('should invalidate all sessions for a user', async () => {
      mockIAMRepo.findActiveSessions.mockResolvedValue({ data: [mockSession], total: 1 });
      mockSessionsRepo.update.mockResolvedValue({ ...mockSession, active: false });

      await service.invalidateAllUserSessions('sch-001', 'user-001');

      expect(mockSessionsRepo.update).toHaveBeenCalledWith('sess-001', 'sch-001', { active: false });
    });
  });

  describe('createCredentialRotation', () => {
    it('should create a credential rotation', async () => {
      const mockRotation = {
        id: 'rot-001',
        school_id: 'sch-001',
        credential_type: 'PASSWORD' as const,
        rotation_interval_days: 90,
        max_age: 365,
      };
      mockCredentialRotationsRepo.create.mockResolvedValue(mockRotation);

      const result = await service.createCredentialRotation('sch-001', {
        credential_type: 'PASSWORD',
        rotation_interval_days: 90,
        max_age: 365,
      });

      expect(result).toEqual(mockRotation);
    });

    it('should reject invalid credential_type', async () => {
      await expect(service.createCredentialRotation('sch-001', {
        credential_type: 'INVALID',
        rotation_interval_days: 90,
        max_age: 365,
      })).rejects.toThrow(GestcrpValidationError);
    });

    it('should reject invalid rotation interval', async () => {
      await expect(service.createCredentialRotation('sch-001', {
        credential_type: 'PASSWORD',
        rotation_interval_days: 500,
        max_age: 365,
      })).rejects.toThrow(GestcrpValidationError);
    });
  });

  describe('enrollBiometric', () => {
    it('should enroll a biometric credential', async () => {
      const mockBiometric = {
        id: 'bio-001',
        school_id: 'sch-001',
        user_id: 'user-001',
        type: 'FINGERPRINT' as const,
        enabled: true,
      };
      mockBiometricCredentialsRepo.findAll.mockResolvedValue({ data: [], total: 0 });
      mockBiometricCredentialsRepo.create.mockResolvedValue(mockBiometric);

      const result = await service.enrollBiometric('sch-001', {
        user_id: 'user-001',
        type: 'FINGERPRINT',
        template_hash: 'hash',
        salt: 'salt',
        algorithm: 'SHA256',
      });

      expect(result).toEqual(mockBiometric);
    });

    it('should reject duplicate biometric type for same user', async () => {
      mockBiometricCredentialsRepo.findAll.mockResolvedValue({
        data: [{ type: 'FINGERPRINT', enabled: true }],
        total: 1,
      });

      await expect(service.enrollBiometric('sch-001', {
        user_id: 'user-001',
        type: 'FINGERPRINT',
        template_hash: 'hash',
        salt: 'salt',
        algorithm: 'SHA256',
      })).rejects.toThrow();
    });
  });

  describe('getSessionStats', () => {
    it('should return session statistics', async () => {
      mockSessionsRepo.findAll.mockResolvedValue({
        data: [mockSession, { ...mockSession, id: 'sess-002', active: false, expires_at: new Date(Date.now() - 86400000).toISOString() }],
        total: 2,
      });

      const result = await service.getSessionStats('sch-001');

      expect(result.totalActive).toBeDefined();
      expect(result.totalExpired).toBeDefined();
      expect(result.byAuthMethod).toBeDefined();
      expect(result.averageRiskScore).toBeDefined();
    });
  });
});
