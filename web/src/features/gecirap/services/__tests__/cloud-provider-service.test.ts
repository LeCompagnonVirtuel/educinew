import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CloudProviderService } from '../cloud-provider-service';
import {
  GecirapCloudProviderError,
  GecirapCloudAccountConflictError,
  GecirapNotFoundError,
} from '@educi/errors';

const mockProviderRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
};

const mockAccountRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
  findByProviderId: vi.fn(),
  findByExternalId: vi.fn(),
};

const mockRegionRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
};

const mockEnvironmentRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
};

const mockDeploymentRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
};

const mockQuotaRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
  findExceeded: vi.fn(),
};

const SCHOOL_ID = '550e8400-e29b-41d4-a716-446655440000';
const PROVIDER_ID = '660e8400-e29b-41d4-a716-446655440001';
const ACCOUNT_ID = '770e8400-e29b-41d4-a716-446655440002';
const DEPLOYMENT_ID = '880e8400-e29b-41d4-a716-446655440003';

const mockProvider = {
  id: PROVIDER_ID,
  school_id: SCHOOL_ID,
  name: 'aws',
  display_name: 'Amazon Web Services',
  provider_type: 'PUBLIC_CLOUD',
  auth_method: 'API_KEY',
  is_active: true,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const mockAccount = {
  id: ACCOUNT_ID,
  school_id: SCHOOL_ID,
  provider_id: PROVIDER_ID,
  account_name: 'Production Account',
  account_external_id: '123456789012',
  status: 'active',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

let service: CloudProviderService;

beforeEach(() => {
  vi.clearAllMocks();
  service = new CloudProviderService(
    mockProviderRepo as never,
    mockAccountRepo as never,
    mockRegionRepo as never,
    mockEnvironmentRepo as never,
    mockDeploymentRepo as never,
    mockQuotaRepo as never,
  );
});

describe('CloudProviderService', () => {
  describe('listProviders', () => {
    it('should list providers for a school', async () => {
      mockProviderRepo.findAll.mockResolvedValue({ data: [mockProvider], total: 1 });

      const result = await service.listProviders(SCHOOL_ID);

      expect(result.data).toHaveLength(1);
      expect(result.total).toBe(1);
    });

    it('should reject empty school_id', async () => {
      await expect(service.listProviders('')).rejects.toThrow();
    });
  });

  describe('getProvider', () => {
    it('should retrieve a provider by id', async () => {
      mockProviderRepo.exists.mockResolvedValue(true);
      mockProviderRepo.findById.mockResolvedValue(mockProvider);

      const result = await service.getProvider(SCHOOL_ID, PROVIDER_ID);

      expect(result).toEqual(mockProvider);
    });

    it('should throw if provider not found', async () => {
      mockProviderRepo.exists.mockResolvedValue(false);

      await expect(service.getProvider(SCHOOL_ID, 'nonexistent')).rejects.toThrow(GecirapNotFoundError);
    });
  });

  describe('createProvider', () => {
    it('should create a provider successfully', async () => {
      mockProviderRepo.findAll.mockResolvedValue({ data: [], total: 0 });
      mockProviderRepo.create.mockResolvedValue(mockProvider);

      const result = await service.createProvider(SCHOOL_ID, {
        schoolId: SCHOOL_ID,
        name: 'aws',
        display_name: 'Amazon Web Services',
        type: 'AWS',
        provider_type: 'PUBLIC_CLOUD',
        auth_method: 'API_KEY',
      });

      expect(result).toEqual(mockProvider);
    });

    it('should reject duplicate provider name', async () => {
      mockProviderRepo.findAll.mockResolvedValue({ data: [mockProvider], total: 1 });

      await expect(service.createProvider(SCHOOL_ID, {
        schoolId: SCHOOL_ID,
        name: 'aws',
        display_name: 'Amazon Web Services',
        type: 'AWS',
        provider_type: 'PUBLIC_CLOUD',
        auth_method: 'API_KEY',
      })).rejects.toThrow(GecirapCloudProviderError);
    });
  });

  describe('deleteProvider', () => {
    it('should soft delete a provider', async () => {
      mockProviderRepo.exists.mockResolvedValue(true);
      mockProviderRepo.findById.mockResolvedValue(mockProvider);
      mockAccountRepo.findByProviderId.mockResolvedValue({ data: [], total: 0 });
      mockProviderRepo.softDelete.mockResolvedValue(undefined);

      await service.deleteProvider(SCHOOL_ID, PROVIDER_ID);

      expect(mockProviderRepo.softDelete).toHaveBeenCalledWith(PROVIDER_ID, SCHOOL_ID);
    });

    it('should reject deleting provider with associated accounts', async () => {
      mockProviderRepo.exists.mockResolvedValue(true);
      mockProviderRepo.findById.mockResolvedValue(mockProvider);
      mockAccountRepo.findByProviderId.mockResolvedValue({ data: [mockAccount], total: 1 });

      await expect(service.deleteProvider(SCHOOL_ID, PROVIDER_ID)).rejects.toThrow(GecirapCloudProviderError);
    });
  });

  describe('createAccount', () => {
    it('should create an account successfully', async () => {
      mockAccountRepo.findByExternalId.mockResolvedValue(null);
      mockAccountRepo.create.mockResolvedValue(mockAccount);

      const result = await service.createAccount(SCHOOL_ID, {
        schoolId: SCHOOL_ID,
        provider_id: PROVIDER_ID,
        providerId: PROVIDER_ID,
        account_name: 'Production Account',
        name: 'Production Account',
        account_external_id: '123456789012',
        accountId: '123456789012',
        credentials: { api_key: 'test' },
      });

      expect(result).toEqual(mockAccount);
    });

    it('should reject duplicate external id', async () => {
      mockAccountRepo.findByExternalId.mockResolvedValue(mockAccount);

      await expect(service.createAccount(SCHOOL_ID, {
        schoolId: SCHOOL_ID,
        provider_id: PROVIDER_ID,
        providerId: PROVIDER_ID,
        account_name: 'Production Account',
        name: 'Production Account',
        account_external_id: '123456789012',
        accountId: '123456789012',
        credentials: { api_key: 'test' },
      })).rejects.toThrow(GecirapCloudAccountConflictError);
    });
  });

  describe('cancelDeployment', () => {
    it('should cancel a running deployment', async () => {
      const mockDeployment = { id: DEPLOYMENT_ID, status: 'running', school_id: SCHOOL_ID };
      mockDeploymentRepo.exists.mockResolvedValue(true);
      mockDeploymentRepo.findById.mockResolvedValue(mockDeployment);
      mockDeploymentRepo.update.mockResolvedValue({ ...mockDeployment, status: 'cancelled' });

      const result = await service.cancelDeployment(SCHOOL_ID, DEPLOYMENT_ID);

      expect(result.status).toBe('cancelled');
    });

    it('should reject cancelling a completed deployment', async () => {
      const mockDeployment = { id: DEPLOYMENT_ID, status: 'completed', school_id: SCHOOL_ID };
      mockDeploymentRepo.exists.mockResolvedValue(true);
      mockDeploymentRepo.findById.mockResolvedValue(mockDeployment);

      await expect(service.cancelDeployment(SCHOOL_ID, DEPLOYMENT_ID)).rejects.toThrow();
    });
  });

  describe('checkQuotaHealth', () => {
    it('should return quota health summary', async () => {
      mockQuotaRepo.findAll.mockResolvedValue({
        data: [
          { quota_limit: 100, quota_used: 110, alert_threshold: 80 },
          { quota_limit: 100, quota_used: 85, alert_threshold: 80 },
          { quota_limit: 100, quota_used: 50, alert_threshold: 80 },
        ],
        total: 3,
      });

      const result = await service.checkQuotaHealth(SCHOOL_ID);

      expect(result.total).toBe(3);
      expect(result.exceeded).toBe(1);
      expect(result.warning).toBe(1);
      expect(result.healthy).toBe(1);
    });
  });
});
