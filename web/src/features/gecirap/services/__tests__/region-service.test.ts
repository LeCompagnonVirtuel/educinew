import { describe, it, expect, vi, beforeEach } from 'vitest';
import { RegionService } from '../region-service';
import { GecirapGeoRegionError, GecirapNotFoundError } from '@educi/errors';

const mockRegionRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
  findByCode: vi.fn(),
  findByContinent: vi.fn(),
};

const mockPolicyRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
};

const mockHealthRepo = {
  findAll: vi.fn(),
  findById: vi.fn(),
  exists: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  softDelete: vi.fn(),
  findUnhealthy: vi.fn(),
};

const SCHOOL_ID = '550e8400-e29b-41d4-a716-446655440000';
const REGION_ID = '660e8400-e29b-41d4-a716-446655440001';
const POLICY_ID = '770e8400-e29b-41d4-a716-446655440002';

const mockGeoRegion = {
  id: REGION_ID,
  school_id: SCHOOL_ID,
  name: 'west-africa',
  display_name: 'West Africa',
  code: 'WA-01',
  continent: 'Africa',
  country: 'Cote d\'Ivoire',
  timezone: 'Africa/Abidjan',
  provider: 'AWS',
  location: 'Abidjan',
  lat: 5.3600,
  lng: -4.0083,
  topology: 'ACTIVE_ACTIVE',
  capacity: 100,
  is_active: true,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const mockPolicy = {
  id: POLICY_ID,
  school_id: SCHOOL_ID,
  region_id: REGION_ID,
  name: 'Data Residency',
  policy_name: 'Data Residency',
  policy_type: 'DATA_RESIDENCY',
  primaryRegionId: REGION_ID,
  secondaryRegionIds: [],
  failoverMode: 'MANUAL',
  replicationMode: 'SYNCHRONOUS',
  rto: 60,
  rpo: 30,
  rules: [{ action: 'REQUIRE', resource: 'database' }],
  is_active: true,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const mockHealth = {
  id: 'health-001',
  school_id: SCHOOL_ID,
  region_id: REGION_ID,
  regionId: REGION_ID,
  status: 'healthy',
  latency: 45,
  latency_ms: 45,
  availability: 99.9,
  availability_percent: 99.9,
  throughput: 1000,
  errors: 0,
  last_checked_at: new Date().toISOString(),
  issues: [],
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

let service: RegionService;

beforeEach(() => {
  vi.clearAllMocks();
  service = new RegionService(
    mockRegionRepo as never,
    mockPolicyRepo as never,
    mockHealthRepo as never,
  );
});

describe('RegionService', () => {
  describe('listRegions', () => {
    it('should list regions for a school', async () => {
      mockRegionRepo.findAll.mockResolvedValue({ data: [mockGeoRegion], total: 1 });

      const result = await service.listRegions(SCHOOL_ID);

      expect(result.data).toHaveLength(1);
      expect(result.total).toBe(1);
    });

    it('should reject empty school_id', async () => {
      await expect(service.listRegions('')).rejects.toThrow();
    });
  });

  describe('getRegion', () => {
    it('should retrieve a region by id', async () => {
      mockRegionRepo.exists.mockResolvedValue(true);
      mockRegionRepo.findById.mockResolvedValue(mockGeoRegion);

      const result = await service.getRegion(SCHOOL_ID, REGION_ID);

      expect(result).toEqual(mockGeoRegion);
    });

    it('should throw if region not found', async () => {
      mockRegionRepo.exists.mockResolvedValue(false);

      await expect(service.getRegion(SCHOOL_ID, 'nonexistent')).rejects.toThrow(GecirapNotFoundError);
    });
  });

  describe('createRegion', () => {
    it('should create a region successfully', async () => {
      mockRegionRepo.findByCode.mockResolvedValue(null);
      mockRegionRepo.create.mockResolvedValue(mockGeoRegion);

      const result = await service.createRegion(SCHOOL_ID, {
        schoolId: SCHOOL_ID,
        name: 'west-africa',
        display_name: 'West Africa',
        code: 'WA-01',
        continent: 'Africa',
        country: 'Cote d\'Ivoire',
        timezone: 'Africa/Abidjan',
        provider: 'AWS',
        location: 'Abidjan',
        lat: 5.36,
        lng: -4.0083,
        topology: 'ACTIVE_ACTIVE',
        capacity: 100,
      });

      expect(result).toEqual(mockGeoRegion);
    });

    it('should reject duplicate region code', async () => {
      mockRegionRepo.findByCode.mockResolvedValue(mockGeoRegion);

      await expect(service.createRegion(SCHOOL_ID, {
        schoolId: SCHOOL_ID,
        name: 'west-africa',
        display_name: 'West Africa',
        code: 'WA-01',
        continent: 'Africa',
        country: 'Cote d\'Ivoire',
        timezone: 'Africa/Abidjan',
        provider: 'AWS',
        location: 'Abidjan',
        lat: 5.36,
        lng: -4.0083,
        topology: 'ACTIVE_ACTIVE',
        capacity: 100,
      })).rejects.toThrow(GecirapGeoRegionError);
    });
  });

  describe('updateRegion', () => {
    it('should update a region', async () => {
      mockRegionRepo.exists.mockResolvedValue(true);
      mockRegionRepo.findById.mockResolvedValue(mockGeoRegion);
      mockRegionRepo.update.mockResolvedValue({ ...mockGeoRegion, display_name: 'Updated' });

      const result = await service.updateRegion(SCHOOL_ID, REGION_ID, { display_name: 'Updated' });

      expect(result.display_name).toBe('Updated');
    });
  });

  describe('deleteRegion', () => {
    it('should soft delete a region', async () => {
      mockRegionRepo.exists.mockResolvedValue(true);
      mockRegionRepo.findById.mockResolvedValue(mockGeoRegion);
      mockRegionRepo.softDelete.mockResolvedValue(undefined);

      await service.deleteRegion(SCHOOL_ID, REGION_ID);

      expect(mockRegionRepo.softDelete).toHaveBeenCalledWith(REGION_ID, SCHOOL_ID);
    });
  });

  describe('createPolicy', () => {
    it('should create a region policy', async () => {
      mockRegionRepo.exists.mockResolvedValue(true);
      mockPolicyRepo.create.mockResolvedValue(mockPolicy);

      const result = await service.createPolicy(SCHOOL_ID, {
        schoolId: SCHOOL_ID,
        region_id: REGION_ID,
        name: 'Data Residency',
        policy_name: 'Data Residency',
        primaryRegionId: REGION_ID,
        secondaryRegionIds: [],
        failoverMode: 'MANUAL',
        replicationMode: 'SYNCHRONOUS',
        rto: 60,
        rpo: 30,
        policy_type: 'DATA_RESIDENCY',
        rules: [{ action: 'REQUIRE', resource: 'database' }],
      });

      expect(result).toEqual(mockPolicy);
    });
  });

  describe('createHealthCheck', () => {
    it('should create a health check', async () => {
      mockRegionRepo.exists.mockResolvedValue(true);
      mockHealthRepo.create.mockResolvedValue(mockHealth);

      const result = await service.createHealthCheck(SCHOOL_ID, {
        schoolId: SCHOOL_ID,
        region_id: REGION_ID,
        regionId: REGION_ID,
        status: 'HEALTHY',
        latency: 45,
        latency_ms: 45,
        availability: 99.9,
        availability_percent: 99.9,
        throughput: 1000,
        errors: 0,
      });

      expect(result).toEqual(mockHealth);
    });
  });

  describe('getRegionOverview', () => {
    it('should return region health overview', async () => {
      mockHealthRepo.findAll.mockResolvedValue({
        data: [mockHealth, { ...mockHealth, id: 'health-002', status: 'degraded', latency: 120, latency_ms: 120 }],
        total: 2,
      });

      const result = await service.getRegionOverview(SCHOOL_ID);

      expect(result.totalRegions).toBe(2);
      expect(result.healthy).toBe(1);
      expect(result.degraded).toBe(1);
      expect(result.avgLatencyMs).toBe(82.5);
    });
  });
});
