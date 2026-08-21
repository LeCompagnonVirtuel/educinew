import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ClusterService } from '../cluster-service';
import { GecirapClusterError, GecirapNotFoundError, GecirapNamespaceError } from '@educi/errors';

const mockClusterRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
  findByProvider: vi.fn(),
};

const mockNodeRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
  findByClusterId: vi.fn(),
  findUnhealthy: vi.fn(),
};

const mockNodePoolRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
};

const mockNamespaceRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
  findByName: vi.fn(),
  findByClusterId: vi.fn(),
};

const SCHOOL_ID = '550e8400-e29b-41d4-a716-446655440000';
const CLUSTER_ID = '660e8400-e29b-41d4-a716-446655440001';
const NODE_ID = '770e8400-e29b-41d4-a716-446655440002';
const NS_ID = '880e8400-e29b-41d4-a716-446655440003';

const mockCluster = {
  id: CLUSTER_ID,
  school_id: SCHOOL_ID,
  name: 'prod-cluster',
  provider: 'AWS',
  region: 'us-east-1',
  status: 'PROVISIONING',
  node_count: 3,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const mockNode = {
  id: NODE_ID,
  school_id: SCHOOL_ID,
  cluster_id: CLUSTER_ID,
  name: 'node-1',
  role: 'worker',
  instance_type: 't3.medium',
  status: 'ready',
  cpu: { total: 4, used: 0 },
  memory: { total: 16, used: 0 },
  disk: { total: 100, used: 0 },
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const mockNamespace = {
  id: NS_ID,
  school_id: SCHOOL_ID,
  cluster_id: CLUSTER_ID,
  name: 'production',
  status: 'active',
  labels: {},
  quotas: {},
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

let service: ClusterService;

beforeEach(() => {
  vi.clearAllMocks();
  service = new ClusterService(
    mockClusterRepo as never,
    mockNodeRepo as never,
    mockNodePoolRepo as never,
    mockNamespaceRepo as never,
  );
});

describe('ClusterService', () => {
  describe('listClusters', () => {
    it('should list clusters for a school', async () => {
      mockClusterRepo.findAll.mockResolvedValue({ data: [mockCluster], total: 1 });

      const result = await service.listClusters(SCHOOL_ID);

      expect(result.data).toHaveLength(1);
      expect(result.total).toBe(1);
    });

    it('should reject empty school_id', async () => {
      await expect(service.listClusters('')).rejects.toThrow();
    });
  });

  describe('getCluster', () => {
    it('should retrieve a cluster by id', async () => {
      mockClusterRepo.exists.mockResolvedValue(true);
      mockClusterRepo.findById.mockResolvedValue(mockCluster);

      const result = await service.getCluster(SCHOOL_ID, CLUSTER_ID);

      expect(result).toEqual(mockCluster);
    });

    it('should throw if cluster not found', async () => {
      mockClusterRepo.exists.mockResolvedValue(false);

      await expect(service.getCluster(SCHOOL_ID, 'nonexistent')).rejects.toThrow(GecirapNotFoundError);
    });
  });

  describe('createCluster', () => {
    it('should create a cluster successfully', async () => {
      mockClusterRepo.findAll.mockResolvedValue({ data: [], total: 0 });
      mockClusterRepo.create.mockResolvedValue(mockCluster);

      const result = await service.createCluster(SCHOOL_ID, {
        schoolId: SCHOOL_ID,
        name: 'prod-cluster',
        provider: 'AWS',
        region: 'us-east-1',
        region_code: 'us-east-1',
        kubernetes_version: '1.28.0',
      });

      expect(result).toEqual(mockCluster);
    });

    it('should reject duplicate cluster name', async () => {
      mockClusterRepo.findAll.mockResolvedValue({ data: [mockCluster], total: 1 });

      await expect(service.createCluster(SCHOOL_ID, {
        schoolId: SCHOOL_ID,
        name: 'prod-cluster',
        provider: 'AWS',
        region: 'us-east-1',
        region_code: 'us-east-1',
        kubernetes_version: '1.28.0',
      })).rejects.toThrow(GecirapClusterError);
    });
  });

  describe('deleteCluster', () => {
    it('should soft delete a cluster', async () => {
      mockClusterRepo.exists.mockResolvedValue(true);
      mockClusterRepo.findById.mockResolvedValue(mockCluster);
      mockNodeRepo.findByClusterId.mockResolvedValue({ data: [], total: 0 });
      mockClusterRepo.softDelete.mockResolvedValue(undefined);

      await service.deleteCluster(SCHOOL_ID, CLUSTER_ID);

      expect(mockClusterRepo.softDelete).toHaveBeenCalledWith(CLUSTER_ID, SCHOOL_ID);
    });

    it('should reject deleting cluster with nodes', async () => {
      mockClusterRepo.exists.mockResolvedValue(true);
      mockClusterRepo.findById.mockResolvedValue(mockCluster);
      mockNodeRepo.findByClusterId.mockResolvedValue({ data: [mockNode], total: 1 });

      await expect(service.deleteCluster(SCHOOL_ID, CLUSTER_ID)).rejects.toThrow(GecirapClusterError);
    });
  });

  describe('createNode', () => {
    it('should create a node successfully', async () => {
      mockClusterRepo.exists.mockResolvedValue(true);
      mockNodeRepo.create.mockResolvedValue(mockNode);

      const result = await service.createNode(SCHOOL_ID, {
        schoolId: SCHOOL_ID,
        cluster_id: CLUSTER_ID,
        clusterId: CLUSTER_ID,
        name: 'node-1',
        role: 'worker',
        instance_type: 't3.medium',
        cpu: { total: 4, used: 0 },
        memory: { total: 16, used: 0 },
        disk: { total: 100, used: 0 },
      });

      expect(result).toEqual(mockNode);
    });
  });

  describe('createNamespace', () => {
    it('should create a namespace successfully', async () => {
      mockClusterRepo.exists.mockResolvedValue(true);
      mockNamespaceRepo.findByName.mockResolvedValue(null);
      mockNamespaceRepo.create.mockResolvedValue(mockNamespace);

      const result = await service.createNamespace(SCHOOL_ID, {
        schoolId: SCHOOL_ID,
        cluster_id: CLUSTER_ID,
        clusterId: CLUSTER_ID,
        name: 'production',
      });

      expect(result).toEqual(mockNamespace);
    });

    it('should reject duplicate namespace in same cluster', async () => {
      mockClusterRepo.exists.mockResolvedValue(true);
      mockNamespaceRepo.findByName.mockResolvedValue(mockNamespace);

      await expect(service.createNamespace(SCHOOL_ID, {
        schoolId: SCHOOL_ID,
        cluster_id: CLUSTER_ID,
        clusterId: CLUSTER_ID,
        name: 'production',
      })).rejects.toThrow(GecirapNamespaceError);
    });
  });

  describe('getClusterOverview', () => {
    it('should return cluster overview stats', async () => {
      mockClusterRepo.findAll.mockResolvedValue({ data: [mockCluster], total: 1 });
      mockNodeRepo.findAll.mockResolvedValue({ data: [mockNode], total: 1 });
      mockNamespaceRepo.findAll.mockResolvedValue({ data: [mockNamespace], total: 1 });

      const result = await service.getClusterOverview(SCHOOL_ID);

      expect(result.totalClusters).toBe(1);
      expect(result.active).toBe(0);
      expect(result.totalNodes).toBe(1);
      expect(result.healthyNodes).toBe(1);
      expect(result.totalNamespaces).toBe(1);
    });
  });
});
