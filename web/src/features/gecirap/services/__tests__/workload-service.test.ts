import { describe, it, expect, vi, beforeEach } from 'vitest';
import { WorkloadService } from '../workload-service';
import { GecirapNotFoundError } from '@educi/errors';

const mockWorkloadRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
  findByNamespaceId: vi.fn(),
  findByWorkloadType: vi.fn(),
};

const mockContainerRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
  findUnhealthy: vi.fn(),
};

const mockServiceRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
};

const mockIngressRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
  findByHostname: vi.fn(),
};

const mockNamespaceRepo = {
  exists: vi.fn(),
  findById: vi.fn(),
};

const SCHOOL_ID = '550e8400-e29b-41d4-a716-446655440000';
const WORKLOAD_ID = '660e8400-e29b-41d4-a716-446655440001';
const NS_ID = '770e8400-e29b-41d4-a716-446655440002';
const CLUSTER_ID = '880e8400-e29b-41d4-a716-446655440003';

const mockWorkload = {
  id: WORKLOAD_ID,
  school_id: SCHOOL_ID,
  cluster_id: CLUSTER_ID,
  namespace_id: NS_ID,
  name: 'api-server',
  workload_type: 'DEPLOYMENT',
  replicas_desired: 3,
  replicas_ready: 3,
  status: 'RUNNING',
  image: 'node:18',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const mockContainer = {
  id: 'ctr-001',
  school_id: SCHOOL_ID,
  workload_id: WORKLOAD_ID,
  name: 'api-container',
  image: 'node:18',
  status: 'RUNNING',
  restart_count: 0,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const mockIngress = {
  id: 'ing-001',
  school_id: SCHOOL_ID,
  cluster_id: CLUSTER_ID,
  namespace_id: NS_ID,
  name: 'api-ingress',
  hostname: 'api.school.com',
  tls_enabled: true,
  status: 'ACTIVE',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

let service: WorkloadService;

beforeEach(() => {
  vi.clearAllMocks();
  service = new WorkloadService(
    mockWorkloadRepo as never,
    mockContainerRepo as never,
    mockServiceRepo as never,
    mockIngressRepo as never,
    mockNamespaceRepo as never,
  );
});

describe('WorkloadService', () => {
  describe('listWorkloads', () => {
    it('should list workloads for a school', async () => {
      mockWorkloadRepo.findAll.mockResolvedValue({ data: [mockWorkload], total: 1 });

      const result = await service.listWorkloads(SCHOOL_ID);

      expect(result.data).toHaveLength(1);
      expect(result.total).toBe(1);
    });

    it('should reject empty school_id', async () => {
      await expect(service.listWorkloads('')).rejects.toThrow();
    });
  });

  describe('getWorkload', () => {
    it('should retrieve a workload by id', async () => {
      mockWorkloadRepo.exists.mockResolvedValue(true);
      mockWorkloadRepo.findById.mockResolvedValue(mockWorkload);

      const result = await service.getWorkload(SCHOOL_ID, WORKLOAD_ID);

      expect(result).toEqual(mockWorkload);
    });

    it('should throw if workload not found', async () => {
      mockWorkloadRepo.exists.mockResolvedValue(false);

      await expect(service.getWorkload(SCHOOL_ID, 'nonexistent')).rejects.toThrow(GecirapNotFoundError);
    });
  });

  describe('createWorkload', () => {
    it('should create a workload successfully', async () => {
      mockNamespaceRepo.exists.mockResolvedValue(true);
      mockWorkloadRepo.create.mockResolvedValue(mockWorkload);

      const result = await service.createWorkload(SCHOOL_ID, {
        schoolId: SCHOOL_ID,
        cluster_id: CLUSTER_ID,
        namespace_id: NS_ID,
        namespaceId: NS_ID,
        name: 'api-server',
        type: 'DEPLOYMENT',
        workload_type: 'DEPLOYMENT',
        image: 'node:18',
      });

      expect(result).toEqual(mockWorkload);
    });
  });

  describe('scaleWorkload', () => {
    it('should scale workload to desired replicas', async () => {
      mockWorkloadRepo.exists.mockResolvedValue(true);
      mockWorkloadRepo.findById.mockResolvedValue(mockWorkload);
      mockWorkloadRepo.update.mockResolvedValue({ ...mockWorkload, replicas_desired: 5 });

      const result = await service.scaleWorkload(SCHOOL_ID, WORKLOAD_ID, 5);

      expect(result.replicas_desired).toBe(5);
    });

    it('should reject invalid replica count', async () => {
      await expect(service.scaleWorkload(SCHOOL_ID, WORKLOAD_ID, -1)).rejects.toThrow();
    });
  });

  describe('createIngress', () => {
    it('should create an ingress successfully', async () => {
      mockIngressRepo.findByHostname.mockResolvedValue(null);
      mockIngressRepo.create.mockResolvedValue(mockIngress);

      const result = await service.createIngress(SCHOOL_ID, {
        schoolId: SCHOOL_ID,
        cluster_id: CLUSTER_ID,
        namespace_id: NS_ID,
        namespaceId: NS_ID,
        name: 'api-ingress',
        hostname: 'api.school.com',
        host: 'api.school.com',
        paths: [{ path: '/', pathType: 'Prefix', backend: {} }],
      });

      expect(result).toEqual(mockIngress);
    });

    it('should reject duplicate hostname', async () => {
      mockIngressRepo.findByHostname.mockResolvedValue(mockIngress);

      await expect(service.createIngress(SCHOOL_ID, {
        schoolId: SCHOOL_ID,
        cluster_id: CLUSTER_ID,
        namespace_id: NS_ID,
        namespaceId: NS_ID,
        name: 'api-ingress',
        hostname: 'api.school.com',
        host: 'api.school.com',
        paths: [{ path: '/', pathType: 'Prefix', backend: {} }],
      })).rejects.toThrow();
    });
  });

  describe('getWorkloadOverview', () => {
    it('should return workload overview stats', async () => {
      mockWorkloadRepo.findAll.mockResolvedValue({ data: [mockWorkload], total: 1 });
      mockContainerRepo.findAll.mockResolvedValue({ data: [mockContainer], total: 1 });
      mockContainerRepo.findUnhealthy.mockResolvedValue([]);

      const result = await service.getWorkloadOverview(SCHOOL_ID);

      expect(result.totalWorkloads).toBe(1);
      expect(result.running).toBe(1);
      expect(result.totalContainers).toBe(1);
      expect(result.unhealthyContainers).toBe(0);
    });
  });
});
