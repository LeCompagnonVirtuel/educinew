import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NetworkService } from '../network-service';
import { GecirapNotFoundError } from '@educi/errors';

const mockNetworkRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
  findByNetworkType: vi.fn(),
};

const mockRouteRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
  findActive: vi.fn(),
};

const mockLbRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
  findActive: vi.fn(),
};

const mockDnsRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
  findActive: vi.fn(),
  findByDomainName: vi.fn(),
};

const mockHealthRepo = {
  findUnhealthy: vi.fn(),
};

const SCHOOL_ID = '550e8400-e29b-41d4-a716-446655440000';
const NETWORK_ID = '660e8400-e29b-41d4-a716-446655440001';
const ROUTE_ID = '770e8400-e29b-41d4-a716-446655440002';

const mockNetwork = {
  id: NETWORK_ID,
  school_id: SCHOOL_ID,
  name: 'production-vpc',
  type: 'VPC',
  cidr: '10.0.0.0/16',
  status: 'HEALTHY',
  routes: [],
  created_at: new Date().toISOString(),
};

const mockRoute = {
  id: ROUTE_ID,
  school_id: SCHOOL_ID,
  network_id: NETWORK_ID,
  networkId: NETWORK_ID,
  destination: '0.0.0.0/0',
  target: 'igw-001',
  metric: 100,
  status: 'HEALTHY',
  created_at: new Date().toISOString(),
};

const mockLoadBalancer = {
  id: 'lb-001',
  school_id: SCHOOL_ID,
  name: 'api-lb',
  algorithm: 'ROUND_ROBIN',
  backends: [{ address: '10.0.1.100', port: 80, weight: 100 }],
  healthCheck: {},
  status: 'HEALTHY',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const mockDnsRecord = {
  id: 'dns-001',
  school_id: SCHOOL_ID,
  name: 'api.school.com',
  type: 'A',
  value: '10.0.1.100',
  ttl: 300,
  status: 'HEALTHY',
  created_at: new Date().toISOString(),
};

let service: NetworkService;

beforeEach(() => {
  vi.clearAllMocks();
  service = new NetworkService(
    mockNetworkRepo as never,
    mockRouteRepo as never,
    mockLbRepo as never,
    mockDnsRepo as never,
    mockHealthRepo as never,
  );
});

describe('NetworkService', () => {
  describe('listNetworks', () => {
    it('should list networks for a school', async () => {
      mockNetworkRepo.findAll.mockResolvedValue({ data: [mockNetwork], total: 1 });

      const result = await service.listNetworks(SCHOOL_ID);

      expect(result.data).toHaveLength(1);
      expect(result.total).toBe(1);
    });

    it('should reject empty school_id', async () => {
      await expect(service.listNetworks('')).rejects.toThrow();
    });
  });

  describe('getNetwork', () => {
    it('should retrieve a network by id', async () => {
      mockNetworkRepo.exists.mockResolvedValue(true);
      mockNetworkRepo.findById.mockResolvedValue(mockNetwork);

      const result = await service.getNetwork(SCHOOL_ID, NETWORK_ID);

      expect(result).toEqual(mockNetwork);
    });

    it('should throw if network not found', async () => {
      mockNetworkRepo.exists.mockResolvedValue(false);

      await expect(service.getNetwork(SCHOOL_ID, 'nonexistent')).rejects.toThrow(GecirapNotFoundError);
    });
  });

  describe('createNetwork', () => {
    it('should create a network successfully', async () => {
      mockNetworkRepo.create.mockResolvedValue(mockNetwork);

      const result = await service.createNetwork(SCHOOL_ID, {
        schoolId: SCHOOL_ID,
        name: 'production-vpc',
        type: 'VPC',
        network_type: 'VPC',
        cidr: '10.0.0.0/16',
        region_code: 'us-east-1',
      });

      expect(result).toEqual(mockNetwork);
    });
  });

  describe('createRoute', () => {
    it('should create a network route', async () => {
      mockNetworkRepo.exists.mockResolvedValue(true);
      mockRouteRepo.create.mockResolvedValue(mockRoute);

      const result = await service.createRoute(SCHOOL_ID, {
        schoolId: SCHOOL_ID,
        network_id: NETWORK_ID,
        networkId: NETWORK_ID,
        destination_cidr: '0.0.0.0/0',
        destination: '0.0.0.0/0',
        target_type: 'IGW',
        target: 'igw-001',
        metric: 100,
      });

      expect(result).toEqual(mockRoute);
    });
  });

  describe('createLoadBalancer', () => {
    it('should create a load balancer', async () => {
      mockLbRepo.create.mockResolvedValue(mockLoadBalancer);

      const result = await service.createLoadBalancer(SCHOOL_ID, {
        schoolId: SCHOOL_ID,
        name: 'api-lb',
        algorithm: 'ROUND_ROBIN',
        backends: [{ address: '10.0.1.100', port: 80, weight: 100 }],
      });

      expect(result).toEqual(mockLoadBalancer);
    });
  });

  describe('createDNSRecord', () => {
    it('should create a DNS record', async () => {
      mockDnsRepo.create.mockResolvedValue(mockDnsRecord);

      const result = await service.createDNSRecord(SCHOOL_ID, {
        schoolId: SCHOOL_ID,
        name: 'api.school.com',
        domain_name: 'school.com',
        record_type: 'A',
        type: 'A',
        record_name: 'api',
        record_value: '10.0.1.100',
        value: '10.0.1.100',
        ttl_seconds: 300,
        ttl: 300,
      });

      expect(result).toEqual(mockDnsRecord);
    });
  });

  describe('deleteNetwork', () => {
    it('should soft delete a network', async () => {
      mockNetworkRepo.exists.mockResolvedValue(true);
      mockNetworkRepo.findById.mockResolvedValue(mockNetwork);
      mockNetworkRepo.softDelete.mockResolvedValue(undefined);

      await service.deleteNetwork(SCHOOL_ID, NETWORK_ID);

      expect(mockNetworkRepo.softDelete).toHaveBeenCalledWith(NETWORK_ID, SCHOOL_ID);
    });
  });

  describe('getNetworkOverview', () => {
    it('should return network overview stats', async () => {
      mockNetworkRepo.findAll.mockResolvedValue({ data: [mockNetwork], total: 1 });
      mockRouteRepo.findActive.mockResolvedValue([mockRoute]);
      mockLbRepo.findActive.mockResolvedValue([mockLoadBalancer]);
      mockDnsRepo.findActive.mockResolvedValue([mockDnsRecord]);
      mockHealthRepo.findUnhealthy.mockResolvedValue([]);

      const result = await service.getNetworkOverview(SCHOOL_ID);

      expect(result.totalNetworks).toBe(1);
      expect(result.activeRoutes).toBe(1);
      expect(result.activeLoadBalancers).toBe(1);
      expect(result.activeDNSRecords).toBe(1);
      expect(result.unhealthyNetworks).toBe(0);
    });
  });
});
