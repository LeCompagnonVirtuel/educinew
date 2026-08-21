import { describe, it, expect, vi, beforeEach } from 'vitest';
import { EdgeService } from '../edge-service';
import { GecirapNotFoundError } from '@educi/errors';

const mockNodeRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
  findByNodeType: vi.fn(),
  findOffline: vi.fn(),
};

const mockClusterRepo = {
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
  findActive: vi.fn(),
  findByClusterId: vi.fn(),
};

const mockPolicyRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
  findActive: vi.fn(),
};

const SCHOOL_ID = '550e8400-e29b-41d4-a716-446655440000';
const NODE_ID = '660e8400-e29b-41d4-a716-446655440001';
const CLUSTER_ID = '770e8400-e29b-41d4-a716-446655440002';
const DEPLOYMENT_ID = '880e8400-e29b-41d4-a716-446655440003';

const mockEdgeNode = {
  id: NODE_ID,
  school_id: SCHOOL_ID,
  name: 'edge-abidjan-01',
  location: 'Abidjan, CI',
  node_type: 'GATEWAY',
  status: 'online',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const mockEdgeCluster = {
  id: CLUSTER_ID,
  school_id: SCHOOL_ID,
  name: 'edge-west-africa',
  cluster_type: 'GATEWAY',
  status: 'active',
  node_count: 5,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const mockEdgeDeployment = {
  id: DEPLOYMENT_ID,
  school_id: SCHOOL_ID,
  cluster_id: CLUSTER_ID,
  name: 'edge-app-v2',
  version: '2.0.0',
  status: 'completed',
  deployed_at: new Date().toISOString(),
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const mockEdgePolicy = {
  id: 'ep-001',
  school_id: SCHOOL_ID,
  name: 'edge-security-policy',
  policy_type: 'SECURITY',
  rules: [{ action: 'ENFORCE', resource: 'tls' }],
  target_clusters: [CLUSTER_ID],
  is_active: true,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

let service: EdgeService;

beforeEach(() => {
  vi.clearAllMocks();
  service = new EdgeService(
    mockNodeRepo as never,
    mockClusterRepo as never,
    mockDeploymentRepo as never,
    mockPolicyRepo as never,
  );
});

describe('EdgeService', () => {
  describe('listNodes', () => {
    it('should list edge nodes for a school', async () => {
      mockNodeRepo.findAll.mockResolvedValue({ data: [mockEdgeNode], total: 1 });

      const result = await service.listNodes(SCHOOL_ID);

      expect(result.data).toHaveLength(1);
      expect(result.total).toBe(1);
    });

    it('should reject empty school_id', async () => {
      await expect(service.listNodes('')).rejects.toThrow();
    });
  });

  describe('getNode', () => {
    it('should retrieve an edge node by id', async () => {
      mockNodeRepo.exists.mockResolvedValue(true);
      mockNodeRepo.findById.mockResolvedValue(mockEdgeNode);

      const result = await service.getNode(SCHOOL_ID, NODE_ID);

      expect(result).toEqual(mockEdgeNode);
    });

    it('should throw if edge node not found', async () => {
      mockNodeRepo.exists.mockResolvedValue(false);

      await expect(service.getNode(SCHOOL_ID, 'nonexistent')).rejects.toThrow(GecirapNotFoundError);
    });
  });

  describe('createNode', () => {
    it('should create an edge node successfully', async () => {
      mockNodeRepo.create.mockResolvedValue(mockEdgeNode);

      const result = await service.createNode(SCHOOL_ID, {
        schoolId: SCHOOL_ID,
        name: 'edge-abidjan-01',
        location: 'Abidjan, CI',
        node_type: 'GATEWAY',
        type: 'GATEWAY',
      });

      expect(result).toEqual(mockEdgeNode);
    });
  });

  describe('createCluster', () => {
    it('should create an edge cluster', async () => {
      mockClusterRepo.create.mockResolvedValue(mockEdgeCluster);

      const result = await service.createCluster(SCHOOL_ID, {
        schoolId: SCHOOL_ID,
        name: 'edge-west-africa',
        cluster_type: 'GATEWAY',
        nodes: [NODE_ID],
      });

      expect(result).toEqual(mockEdgeCluster);
    });
  });

  describe('createDeployment', () => {
    it('should create an edge deployment', async () => {
      mockNodeRepo.exists.mockResolvedValue(true);
      mockDeploymentRepo.create.mockResolvedValue(mockEdgeDeployment);

      const result = await service.createDeployment(SCHOOL_ID, {
        schoolId: SCHOOL_ID,
        cluster_id: CLUSTER_ID,
        edgeNodeId: CLUSTER_ID,
        name: 'edge-app-v2',
        image: 'edge-app:2.0',
        version: '2.0.0',
      });

      expect(result).toEqual(mockEdgeDeployment);
    });
  });

  describe('createPolicy', () => {
    it('should create an edge policy', async () => {
      mockPolicyRepo.create.mockResolvedValue(mockEdgePolicy);

      const result = await service.createPolicy(SCHOOL_ID, {
        schoolId: SCHOOL_ID,
        name: 'edge-security-policy',
        policy_type: 'SECURITY',
        syncFrequency: 300,
        offlineCap: 'FULL',
        cacheSize: 1024,
        priority: 1,
        rules: [{ action: 'ENFORCE', resource: 'tls' }],
        target_clusters: [CLUSTER_ID],
      });

      expect(result).toEqual(mockEdgePolicy);
    });
  });

  describe('deleteNode', () => {
    it('should soft delete an edge node', async () => {
      mockNodeRepo.exists.mockResolvedValue(true);
      mockNodeRepo.findById.mockResolvedValue(mockEdgeNode);
      mockNodeRepo.softDelete.mockResolvedValue(undefined);

      await service.deleteNode(SCHOOL_ID, NODE_ID);

      expect(mockNodeRepo.softDelete).toHaveBeenCalledWith(NODE_ID, SCHOOL_ID);
    });
  });

  describe('getEdgeOverview', () => {
    it('should return edge overview stats', async () => {
      mockNodeRepo.findAll.mockResolvedValue({ data: [mockEdgeNode], total: 1 });
      mockClusterRepo.findAll.mockResolvedValue({ data: [mockEdgeCluster], total: 1 });
      mockDeploymentRepo.findActive.mockResolvedValue([mockEdgeDeployment]);
      mockPolicyRepo.findActive.mockResolvedValue([mockEdgePolicy]);
      mockNodeRepo.findOffline.mockResolvedValue([]);

      const result = await service.getEdgeOverview(SCHOOL_ID);

      expect(result.totalNodes).toBe(1);
      expect(result.onlineNodes).toBe(1);
      expect(result.offlineNodes).toBe(0);
      expect(result.totalClusters).toBe(1);
      expect(result.activeDeployments).toBe(1);
      expect(result.activePolicies).toBe(1);
    });
  });
});
